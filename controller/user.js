const User = require('../model/user');
const catchAsync = require('../utils/catchAsync');
const ApiFeature = require('../utils/ApiFeatures');

exports.getAllUsers = catchAsync(async (req, res) => {
  const Feature = new ApiFeature(User.find({isDeleted: false}), req.query).filter().fields().sort().search().paginate();
  const User = await Feature.query;
  const userCount = await User.countDocuments({isDeleted: false})
  res.status(200).json({
    success: true,
    results: User.length, userCount,
    limit: Feature.limit,
    page: Math.ceil(userCount / Feature.limit),
    data: User,
  });
});

exports.getStatus = catchAsync(async (req, res) => {
  const total = await User.countDocuments();
  const active = await User.countDocuments({ isDeleted: false });
  const deleted = await User.countDocuments({ isDeleted: true });
  res.json({ total, active, deleted });
});


exports.getDeletedUsers = catchAsync(async (req, res) => {
  const User = await User.find({ isDeleted: true });
  res.json(User);
});

exports.getOneUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
});

exports.editUser = catchAsync(async (req, res) => {
  const updated = await User.findByIdAndUpdate(
      { _id: req.params.id },
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

exports.addUser = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    success: true,
    message: 'User added successfully',
    data: newUser
});
});


exports.editUser = catchAsync(async (req, res) => {
  const updated = await User.findByIdAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
  );

    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updated);
});


exports.deleteUser = catchAsync(async (req, res) => {
  const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'this product is deleted' });
});


exports.softDeleteUser = catchAsync(async (req, res) => {
  const updated = await User.findByIdAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
  );
  if (!updated) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(updated);

    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User soft deleted', User });
  });
