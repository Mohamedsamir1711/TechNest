const yub = require('yup');

const addProductSchema = yub.object().shape({

  name: yub.string().required('Product name is required').min(3, 'Name must be at least 3 characters long').max(100, 'Name cannot exceed 100 characters'),

  description: yub.string().max(500, 'Description cannot exceed 500 characters').default(''),

  price: yub.number().required('Product price is required').min(0, 'Price cannot be negative').max(1000000, 'Price cannot exceed 1 million'),

  category: yub.string().required('Product category is required'),

  image: yub.string().url('Image must be a valid URL').trim(),

}).required();

module.exports = addProductSchema;