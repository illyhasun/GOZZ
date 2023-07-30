const { Schema, model } = require('mongoose')

const schema = Schema({
    name: { type: String, required: true },
    mail: { type: String, required: true },
    phone: { type: String, required: true },
    text: { type: String }

})

module.exports = model('Customer', schema)