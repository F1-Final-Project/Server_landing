const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    title: String,
    restInStock: Number,
    description: String,
    price: {type: Number, default: 0},
});

const Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = Ingredient;