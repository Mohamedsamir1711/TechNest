const mongoose = require('mongoose');
const addProductSchema = require('../validations/addProducts');

const productSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },

    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0],
      max: [1000000],
    },
    

    category : {
      type: String,
      enum: {
        values: [
  "Electronics",
  "Accessories",
  "Computers",
  "Mobile",
  "Audio",
  "Fashion",
  "Furniture",
  "Home",
  "Fitness",
  "Kitchen",
  "Photography",
  "Stationery",
  "Outdoors",
  "Wearables"
],
      },
      required: [true, 'Product category is required'],
    },

    image: {
      type: String,
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },
    

    isdeleted: {
      type: Boolean,
      default: false,
    },

    quantity: {
      type: Number,
      default: 0,
      min: [0],
    },
  },
 
  {
    timestamps: true,
    versionKey: false,
  }
);


const Product = mongoose.model('Product', productSchema);
module.exports = Product;
