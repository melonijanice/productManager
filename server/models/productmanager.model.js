const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, "First name is required"]
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
      }
      
      
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"]
    }
  }, {timestamps: true});
  
  // add this after UserSchema is defined
UserSchema.virtual('confirmPassword')
.get( () => this._confirmPassword )
.set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
      this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
  });
  
// near the top is a good place to group our imports
const bcrypt = require('bcrypt');
// this should go after 
UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});


const ProductSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "title is required"],
      minlength:[5, "A title must be atleast 5 characters long"]
    },
    price: {
      type: String,
      required: [true, "Price is required"]
    },
    description: {
      type: String
    },
}, { timestamps: true });
module.exports = mongoose.model('ProductManager', ProductSchema);