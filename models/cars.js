/** @format */

const mongoose = require('mongoose');
// car schema
const Schema = mongoose.Schema;
const SchemaCars = new Schema(
    {
        carColor: { type: String, required: true },
        carNumber: { type: String, required: true,unique:true},
        category: { type: String, required: true },
        avaibility: { type: Boolean, required: true, default: true },
        carModelOrName: { type: String, required: true},
    },
    {
        timestamps: true,
    }
);
const Vehicles = mongoose.model('Vehicles', SchemaCars);
module.exports = Vehicles;
