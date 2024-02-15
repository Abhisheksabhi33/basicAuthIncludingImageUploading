const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
    },
    // add sectiom for list of photos
    photos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo'
    }],
}); 


const user= mongoose.model('User', UserSchema);
module.exports = user;