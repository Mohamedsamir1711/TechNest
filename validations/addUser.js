const yub = require('yup');

const addUserSchema = yub.object().shape({

  name: yub.string().required('User name is required').min(3, 'Name must be at least 3 characters long').max(100, 'Name cannot exceed 100 characters'),

  email: yub.string().required('User email is required').email('Invalid email address').min(6, 'Email must be at least 6 characters long').max(100, 'Email cannot exceed 100 characters'),

  password: yub.string().required('User password is required').min(6, 'Password must be at least 6 characters long').max(100, 'Password cannot exceed 100 characters'),

  role: yub.string().required('User role is required'),

}).required();

module.exports = addUserSchema;