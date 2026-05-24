const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type:String,
    required: true,
    unique: true,
    minlength: [3, 'min name is 3'],
    maxlength: [30, 'max length is 30']
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
    minlength: [6,'min length is 6']
  },
  
  confirmPassword: {
    type: String,
    required: true,
    minlength: [6,'min length is 6']
  },


  confirmOTP: {
    type: String,

  },
  otpDate: { type: Date},
  isConfirmed: {
    type: Boolean,
    default: false,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",

  },
  
  resetToken: String,
  resetDate: Date,

},{ timestamps: true,
  versionKey: false
})

const User = mongoose.model("user", userSchema);

module.exports = User