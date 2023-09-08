const { Schema, model } = require('mongoose');


const SaleSchema = new Schema({
    product: String,
    quantity: Number,
    price: Number,
    date: Date,
}, { timestamps: true, versionKey: false })

const SaleModel = model('sales', SaleSchema);

module.exports = SaleModel;