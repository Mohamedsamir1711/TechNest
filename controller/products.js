const Product = require('../model/products');
const catchAsync = require('../utils/catchAsync');
const ApiFeature = require('../utils/ApiFeatures');
const mongoose = require('mongoose');


exports.getAllProducts = catchAsync(async (req, res) => {
  const Feature = new ApiFeature(Product.find({isdeleted: false}), req.query).filter().fields().sort().search().paginate();
  const products = await Feature.query;
  const productCount = await Product.countDocuments({isdeleted: false})
  res.status(200).json({
    success: true,
    results: products.length, productCount,
    limit: Feature.limit,
    page: Math.ceil(productCount / Feature.limit),
    productCount,
    data: products,
  });
});

exports.getStatus = catchAsync(async (req, res) => {
  const total = await Product.countDocuments();
  const active = await Product.countDocuments({ isdeleted: false });
  const deleted = await Product.countDocuments({ isdeleted: true });
  res.json({ total, active, deleted });
});


exports.getDeletedProducts = catchAsync(async (req, res) => {
  const products = await Product.find({ isdeleted: true });
  res.json(products);
});
    // const products = await Product.find({ isDeleted: true });
    // res.json(products);

exports.getOneProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id });

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

exports.updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  

  const updated = await Product.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true, runValidators: true }
  );

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: updated
  });
});

exports.addProduct = catchAsync(async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json({
    success: true,
    message: 'Product added successfully',
    data: newProduct
});
});


exports.editProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  const updated = await Product.findOneAndUpdate(
    { _id: id, isdeleted: false },
    { ...req.body, updatedAt: Date.now() },
    { new: true, runValidators: true }
  );

  if (!updated) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(updated);
});


exports.deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  const deleted = await Product.findOneAndDelete({ _id: id });

  if (!deleted) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json({ message: 'this product is deleted' });
});


exports.softDeleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOneAndUpdate(
    { _id: id, isdeleted: false },
    { isdeleted: true },
    { new: true }
  );

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json({ message: 'Product soft deleted', product });
});
