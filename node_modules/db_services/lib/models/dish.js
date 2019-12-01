const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DishSchema = new Schema({
    title: String,
    description: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
    additionalIngredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
    price: {type: Number, default: 0},
    weight: Number
});

const Dish = mongoose.model('Dish', DishSchema);

module.exports = Dish;