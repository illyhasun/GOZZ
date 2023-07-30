const { Router } = require('express')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const config = require('config')

const router = Router()

// router.post(
//     '/register',

//     async (req, res) => {
//         try {

//             const { username, password } = req.body

//             const candidate = await User.findOne({ username })
//             if (candidate) {
//                 return res.status(400).json({ message: 'User with this username already exists' })
//             }
//             const hashedPassword = await bcrypt.hash(password, 12)
//             const user = new User({ username, password: hashedPassword})
//             await user.save()
//             const token = jwt.sign(
//                 { userId: user.id },
//                 config.get('jwtSecret'),
//                 { expiresIn: '1h' }
//             )
//             return res.status(200).json({message: 'User was created', token, userId: user.id})
//         } catch (e) {
//             console.log(e)
//             return res.status(500).json({message: 'Something gone wrong...'})
//         }
//     }
// )
router.post('/login', async (req, res) => {
    try {

        const { username, password } = req.body
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(404).json({ message: req.t('smthWrong') })
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if (!isMatched) {
            return res.status(400).json({ message: req.t('smthWrong') })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        res.status(200).json({ message: 'You have loged in', token, userId: user.id })

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: req.t('smthWrong') })

    }
})
module.exports = router