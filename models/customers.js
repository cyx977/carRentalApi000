/** @format */

const mongoose = require('mongoose');
// car schema
const Schema = mongoose.Schema;
const customerSchema = new Schema(
    {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        licenseNumber: { type: String, required: true, unique: true },
        phoneNumber: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

// const Cars = (module.exports = mongoose.model('Cars', carsSchema));
const Customers = mongoose.model('Customers', customerSchema);
module.exports = Customers;
