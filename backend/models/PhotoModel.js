const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        url: String,
        public_id: String,
        type: Object,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

const photo = mongoose.model('Photo', PhotoSchema);

module.exports = photo;
