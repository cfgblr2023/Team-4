const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true
    },
    email: {
    type: String,
    required: true
    },
    password: {
    type: String,
    required: true
    },
    phoneno: {
        type: String,
        required: true
        },
    date: {
    type: Date,
    default: Date.now
    },
    role:{
    type: String,
    enum: ['user','admin','org'],
    default: 'user',
    required: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
