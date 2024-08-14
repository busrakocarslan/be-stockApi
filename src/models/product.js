"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */
// Product Model:

const ProductSchema = new mongoose.Schema({

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },// bir kategory e birden fazla ürün bağlı olabileceğinden dolayı unique değil

    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true,
    },

    name: {
        type: String,
        trim: true,
        required: true,
    },// aynı isimde farklı markanın ürünü olabileceğinden unique demiyoruz. 

    quantity: {// sistemdeki güncel stock adedi
        type: Number,
        default: 0
    },

}, {
    collection: 'products',
    timestamps: true
})

/* ------------------------------------------------------- */
module.exports = mongoose.model('Product', ProductSchema)