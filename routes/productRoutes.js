const express = require('express')
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator')

const router = express.Router()
const fs = require('fs')
const multer = require('multer')
const path = require('path')

const Product = require('../models/Product')

const auth = require('../middlewares/auth')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const filename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
        cb(null, filename)
    },
})

const upload = multer({ storage })

const title = (value, { req }) => {
    if (!value || value.length < 3) {
        throw new Error(req.t('title', { min: 3 }));
    }
    return true;
}
const description = (value, { req }) => {
    if (!value || value.length < 3) {
        throw new Error(req.t('description', { min: 3 }));
    }
    return true;
}

const ProductValidationRules = [
    check('cs[title]').custom(title),
    check('cs[description]').custom(description),
    check('en[title]').custom(title),
    check('en[description]').custom(description),
    check('uk[title]').custom(title),
    check('uk[description]').custom(description),
    check('ru[title]').custom(title),
    check('ru[description]').custom(description),
    check('photo')
        .custom((value, { req }) => {
            if (!req.file) {
                throw new Error(req.t('photo'))
            }
            return true
        })
        .custom((value, { req }) => {
            const allowedImageTypes = ['image/jpeg', 'image/png'];
            if (req.file && !allowedImageTypes.includes(req.file.mimetype)) {
                throw new Error(req.t('photoType') + allowedImageTypes.join(', '))
            }

            const maxFileSizeInBytes = 5 * 1024 * 1024;
            if (req.file && req.file.size > maxFileSizeInBytes) {
                throw new Error('File size exceeds the maximum limit of 5MB.')
            }

            return true;
        }),
];

router.post('/create', auth, upload.single('photo'), ProductValidationRules, async (req, res) => {
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            if (req.file) {
                fs.unlinkSync(req.file.path)
            }

            return res.status(400).json({ errors: errors })
        }

        const { cs, en, uk, ru } = req.body;
        const { title: csTitle, description: csDescription } = cs;
        const { title: enTitle, description: enDescription } = en;
        const { title: ukTitle, description: ukDescription } = uk;
        const { title: ruTitle, description: ruDescription } = ru;

        const photo = req.file ? '/uploads/' + req.file.filename : null

        const product = new Product({
            cs: { title: csTitle, description: csDescription },
            en: { title: enTitle, description: enDescription },
            uk: { title: ukTitle, description: ukDescription },
            ru: { title: ruTitle, description: ruDescription },
            photo: photo,
        })

        await product.save()

        res.status(201).json({ message: req.t('productCreated'), product: product })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: req.t('SmthWrong'), error: error.message })

    }
})

router.get('/get', async (req, res) => {
    try {
        const supportedLanguages = ['en', 'cs', 'uk', 'ru']
        let lang = req.query.lang || req.language || 'cs'
        lang = lang.split('-')[0] || 'cs';
        if (!supportedLanguages.includes(lang)) {
            lang = 'cs'
        }

        const products = await Product.find({}, { photo: 1, [lang]: 1 }).lean();

        return res.status(200).json({ products });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: req.t('SmthWrong') })
    }
});

router.delete('/delete', auth, async (req, res) => {
    try {
        const productId = req.body.id

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid product ID format' })
        }

        const product = await Product.findByIdAndDelete(productId)

        if (!product) {
            return res.status(404).json({ message: req.t('productNotFound') })
        }

        if (product.photo) {
            const photoPath = path.join(__dirname, '..', product.photo)
            if (fs.existsSync(photoPath)) {
                fs.unlinkSync(photoPath)
            }
        }

        res.status(200).json({ message: req.t('productRemoved') })

    } catch (e) {
        res.status(500).json({ message: req.t('SmthWrong') })

    }
})
// router.put('/update', auth, upload.single('photo'), ProductValidationRules, async (req, res) => {
//     try {

//         const errors = validationResult(req)

//         if (!errors.isEmpty()) {
//             if (req.file) {
//                 fs.unlinkSync(req.file.path)
//             }
//             return res.status(400).json({ errors: errors.array() })
//         }

//         const { productId, cs, en, uk, ru } = req.body;

//         if (!mongoose.Types.ObjectId.isValid(productId)) {
//             if (req.file) {
//                 fs.unlinkSync(req.file.path)
//             }
//             return res.status(400).json({ message: 'Invalid product ID format' })
//         }

//         const product = await Product.findById(productId)

//         if (!product) {
//             if (req.file) {
//                 fs.unlinkSync(req.file.path)
//             }
//             return res.status(404).json({ message: req.t('productNotFound') })
//         }

//         const newPhoto = req.file ? '/uploads/' + req.file.filename : null

//         if (newPhoto && product.photo) {
//             fs.unlinkSync('uploads/' + product.photo.replace('/uploads/', ''));
//         }

//         product.cs.title = cs.title;
//         product.cs.description = cs.description;
//         product.en.title = en.title;
//         product.en.description = en.description;
//         product.uk.title = uk.title;
//         product.uk.description = uk.description;
//         product.ru.title = ru.title;
//         product.ru.description = ru.description;
//         product.photo = newPhoto;


//         await product.save();

//         res.status(201).json({ message: req.t('productUpdated'), product: product })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: req.t('SmthWrong'), error: error.message })

//     }
// })

module.exports = router;