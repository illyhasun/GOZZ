const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const Customer = require('../models/Customer')
const config = require('config')
const { check, validationResult } = require('express-validator')



const translateError = (errorMessageKey, { req }) => {
    return req.t(errorMessageKey);
  };


router.post('/customer',
[
    check('name').isLength({ min: 3 }).withMessage((value, { req }) => req.t('name', { value })),
    check('mail').isEmail().normalizeEmail().withMessage((value, { req }) => translateError('mail', { req })),
  check('phone').isMobilePhone().withMessage((value, { req }) => translateError('phone', { req })),
  ], async (req, res) => {

    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, mail, phone, text } = req.body

        const customer = new Customer({ name, mail, phone, text })

        await customer.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: config.get('gmail'),
                pass: config.get('password'),
            },
        });

        const mailOptions = {
            from: config.get('gmail'),
            to: config.get('gmail'),
            subject: `Тут ${name} заявку залишив`,
            text: `імя ${name} номер телефону ${phone}, пошта ${mail} `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Помилка при відправці листа: ', error);
            } else {
                console.log('Лист надіслано: ' + info.response);
            }
        });

        res.status(200).json({ message: req.t('form') });
    } catch (error) {
        res.status(500).json({ error: req.t('smthWrong') });
    }
});

module.exports = router;