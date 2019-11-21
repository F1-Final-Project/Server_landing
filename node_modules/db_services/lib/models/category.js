const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: String,
    description: String
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;