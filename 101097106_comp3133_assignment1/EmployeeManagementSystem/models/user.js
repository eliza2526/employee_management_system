const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updatedat: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);