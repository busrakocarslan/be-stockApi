"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */
// Purchase Model:

const PurchaseSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    firmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firm',
        required: true
    },

    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    quantity: { // kaç adet satın alındığı 
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    amount: {// totalPrice
        type: Number,
        set: function() { return this.price * this.quantity }, // Data gönderilmediğinde çalışmaz. Bu sebekle defaultu ekle
        default: function() { return this.price * this.quantity }, // Sadece Create'de çalışır.Bu sebeple transform u ekle
        transform: function() { return this.price * this.quantity }, // Update yaparken de hesaplasın.
    },

}, {
    collection: 'purchases',
    timestamps: true
})

/* ------------------------------------------------------- */
module.exports = mongoose.model('Purchase', PurchaseSchema)