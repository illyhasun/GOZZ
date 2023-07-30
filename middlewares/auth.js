const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if(req.method = 'OPTIONS'){
        return next()
    }
    try{
        token = req.headers.authorization.split(' ')[1]
        
        if(!token){
            return res.status(400).json({message: req.t('access')})
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'))

        req.user = decoded

        next()



    }catch(e){
        console.log(e)
        return res.status(400).json({message: req.t('smthWrong')})
    }
}