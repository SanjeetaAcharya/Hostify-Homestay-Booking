const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  image: { type: String, required: true },
  images: [{ type: String }],
  shortDescription: { type: String },
  aboutHome: {
    intro: String,
    livingSpace: String,
    bedrooms: String,
    outdoor: String,
    kitchen: String,
    additional: String,
  },
  features: [{ icon: String, title: String, description: String }],
  amenities: [{ type: String }],
  guests: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  beds: { type: Number, required: true },
  baths: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);