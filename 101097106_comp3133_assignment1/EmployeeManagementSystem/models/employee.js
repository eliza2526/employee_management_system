const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/, index: true },
    gender: { type: String },
    city: { type: String },
    designation: { type: String },
    department: { type: String },
    salary: { type: Number, min: 0 },
    created: { type: Date, defaul: Date.now },
    updatedAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Employee', EmployeeSchema);