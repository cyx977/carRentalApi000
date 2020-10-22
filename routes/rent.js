/** @format */

const router = require('express').Router();
var path = require('path');
const Rents = require('./../models/rents');
const multer = require('multer')
const Customers = require('./../models/customers')
const Vehicles = require('./../models/cars')

const fs = require('fs');
var storage = multer.diskStorage({
    destination:function(req,file,callback){
            callback(null,'./uploads/');
    },
    filename: function(req,file,callback){
        const dateString = new Date().toISOString()
        callback(null,"before- "+dateString+file.originalname)
    }
})
const fileFilter = (req,file,callback)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        callback(null,true)
    }else{
        callback(null,true)
    }
}
var uploads = multer({
    storage:storage,
    limits:{
        fileSize:1024 * 1024 * 5
    },
    fileFilter:fileFilter
})


router.post('/',uploads.array('before',10), function(req,res){
    console.log("post of rent:")
    const before = req.files.map(file=> file.path)
    const {carId,customerId,rate,lengthofRental,totalAmount} = req.body
    console.log(carId, customerId, rate, lengthofRental,totalAmount)
    const newRent = new Rents({
        carId,
        customerId,
        rate,
        return:'not',
        lengthofRental,
        totalAmount,
        before
    }) 
    newRent
    .save()
    .then(() => {
        Vehicles.findByIdAndUpdate(carId, { $set: {avaibility:false} }).then(()=>{
            Customers.find().select('_id, fullName').then((customers)=>{
                if(customers.length>0){
                    Vehicles.find().select('_id, carModelOrName').where('avaibility').equals(true).then(cars=>{
                        console.log(cars)
                        if(cars.length>0){
                            res.send({
                                "cars" : cars,
                                "customers" : customers,
                                "type" : 'success',
                                "message" : ' New Rent Added!',
                            });
                        }else{
                        res.send({ "type": 'error', "message": 'There is no Car to rent, First Add Some cars' });
                        }
                    })
                }else{
                    res.send({ "type" : 'error', "message" : 'There is no customer to give car as rent, First Add Some Customers' });
                }
            })
        })
        
    })
    .catch((error) => {
        console.log(error);
        res.send('rent/index.ejs', {
            "type": 'error',
            "message": 'error while saving',
        });
    });
})

router.get('/', function (req, res) {
    // let customers=[]
    // let cars = []
    Customers.find().select('_id, fullName').then((customers)=>{
        if(customers.length>0){
            Vehicles.find().select('_id, carModelOrName').where('avaibility').equals(true).then(cars=>{
                console.log(cars)
                if(cars.length>0){
                    res.send('rent/index', {
                        "cars":cars,
                        "customers":customers,
                        "type" :'',
                        "message":''
                    });
                }else{
                res.send({ "type": 'error', "message": 'There is no Car to rent, First Add Some cars' });
                }
            })
        }else{
            res.send({ "type": 'error', "message": 'There is no customer to give car as rent, First Add Some Customers' });
        }
    })

});

router.get('/list', function (req, res) {

    Rents.find().then((datas)=>{
                res.send({
                    "type":'',
                    "message":'',
                    "data" : datas,
                })
    })

});

router.get('/return/:id', function (req, res) {
    Rents.findById(req.params.id).exec().then((docs)=>{
        Rents.findByIdAndUpdate(req.params.id,{$set:{return:'returned'}}).exec()
        Vehicles.findByIdAndUpdate(docs.carId,{$set: {avaibility:true}}).exec().then(()=>{
        Rents.find().then((datas)=>{
            res.send('rent/list.ejs',{
                "type":'success',
                "message":'return success',
                "data" : datas,
                 })
            })
        })
    })
});

module.exports = router;
