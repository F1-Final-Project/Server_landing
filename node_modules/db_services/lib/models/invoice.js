const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    invoiceItems:[{
        title: String,
        price: {type: Number, default: 0},
    }],
    invoicePrice: {type: Number, default: 0},
    created_at: Date
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice;