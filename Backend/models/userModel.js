const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
          validator: function (email) {
            return validator.isEmail(email);
          },
          message: props => `${props.value} is not a valid email address!`
        }
      },

      password: {
        type: 'String',
        select: false,
        required: true
      },

      role: {
        type: String,
        enum: ['admin', 'bidder', 'property owner'],
        default: 'bidder',
      },


      location: {
        type: String,
        trim: true,
      }

    },
     { timestamps: true }
    );


    //Encrypting password before saving 
    userSchema.pre('save', async function(next) {
      if (!this.isModified('password')) return next();
      this.password = await bcrypt.hash(this.password, 10);
      next();
    });
    
    userSchema.methods.comparePassword = function(enteredPassword) {
      return bcrypt.compare(enteredPassword, this.password);
    };


module.exports = mongoose.model('User', userSchema);