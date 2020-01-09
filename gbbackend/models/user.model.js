const mongoose = require('mongoose');

const Schema = mongoose.Schema; // A new mongoose schema

const userSchema = new Schema({
    username: { // The only field (for now)
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;