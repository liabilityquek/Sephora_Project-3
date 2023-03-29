const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new mongoose.Schema({
    product: [{
        product_name: { type: Schema.Types.ObjectId, ref: 'products' },
        product_qty: { type: Int, required: true }
    }],
    store_outlet: { type: String, required: true },

});

module.exports = mongoose.model("Location", locationSchema);
