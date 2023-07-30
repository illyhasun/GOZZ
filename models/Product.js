const { Schema, model } = require('mongoose')

const schema = Schema({
    cs: {
        title: { type: String, required: true },
        description: { type: String, required: true },
    },
    en: {
        title: { type: String, required: true },
        description: { type: String, required: true },
    },
    uk: {
        title: { type: String, required: true },
        description: { type: String, required: true },
    },
    ru: {
        title: { type: String, required: true },
        description: { type: String, required: true },
    },
    photo: { type: String, required: true },
})

module.exports = model('Product', schema)