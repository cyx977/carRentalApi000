/** @format */

const mongoose = require('mongoose');
// car schema
const Schema = mongoose.Schema;
const rentsSchema = new Schema(
    {
        carId: {type: mongoose.Schema.Types.ObjectId,ref:'Vehicles'},
        customerId: {type: mongoose.Schema.Types.ObjectId,ref:'Customers'},
        lengthofRental: { type: Number,required: true},
        rate: {type: Number,required: true},
        totalAmount:{type: Number},
        before:{type: [String],required: true,},
        return:{type:String,}
    },
    {
        timestamps: true,
    }

);

// const Cars = (module.exports = mongoose.model('Cars', carsSchema));
const Rents = mongoose.model('Rents', rentsSchema);
module.exports = Rents;
