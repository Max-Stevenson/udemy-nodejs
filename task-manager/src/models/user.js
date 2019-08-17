const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true, 
        validate(value) {
            if (!validator.isLength(value, {min: 6, max: 15})) {
                throw new Error('Password must be between 6 - 15 characters');
            };
            if (validator.contains(value, 'password')) { 
                throw new Error('Password cannot contain \'password\'');
            };
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    }
});

module.exports = User;