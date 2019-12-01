const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    staff: { type: Schema.Types.ObjectId, ref: 'User' },
    table: Number,
    orderItems:[{
        title: String,
        ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
        price: {type: Number, default: 0},
    }],
    orderPrice: {type: Number, default: 0},
    onKitchen: {type: Boolean, default: false},
    completed: {type: Boolean, default: false},
    created_at: Date,
    updated_at: Date,
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;