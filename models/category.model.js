const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  nominees: { type: Array, default: [] }
});

const CategoryModel = mongoose.model('category', CategorySchema);

module.exports = CategoryModel;