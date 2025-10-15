// server/models/Product.js
const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  // Add more fields as needed
}, { timestamps: true });
module.exports = mongoose.model('Product', productSchema);