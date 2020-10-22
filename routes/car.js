/** @format */

const router = require('express').Router();
const Vehicles = require('../models/cars');
router.get('/', function (req, res) {
    res.send({
        "type": '',
        "message": '',
    });
});
router.get('/list', function (req, res) {
    Vehicles.find().then((datas) => {
        res.send({
            "data" : datas,
        });
    });
});
router.post('/', function (req, res) {
    const { carNumber, carColor, category, carModelOrName } = req.body;
    console.log(carNumber, carColor,carModelOrName,category)
    if (carNumber === '' || carColor === '' || category === '' || carModelOrName == '') {
        res.send({ "type": 'error', "message": 'Fill All Input Field' });
    } else {
        const newCar = new Vehicles({
            carColor,
            carNumber,
            category,
            avaibility: true,
            carModelOrName,
        });
        newCar
            .save()
            .then(() => {
                res.send({
                    "type": 'success',
                    "message": ' New Car Added!',
                });
            })
            .catch((error) => {
                console.log(error);
                res.send({
                    "type": 'error',
                    "message": 'error while saving',
                });
            });
    }
});
router.get('/delete/:id', function (req, res) {
    Vehicles.findByIdAndDelete(req.params.id)
        .then((data) => {
            console.log('Deleting Car:', data);
            Vehicles.find().then((datas) => {
                res.send({
                    "data" : datas,
                    "type": 'success',
                    "message": ' Car remove successfull',
                });
            });
        })
        .catch((error) => {
            console.log('Error While Deleting', error);
            Customer.find().then((datas) => {
                res.send({
                    "data" : datas,
                    "type": 'error',
                    "message": 'Something Went Wrong In Server',
                });
            });
        });
});

router.post('/update/:id', function (req, res) {
    console.log('post Vehicles', req.body);
    const { carNumber, carColor, carModelOrName, category } = req.body;

    if (carNumber === '' || carColor === '' || carModelOrName === '' || category === '')
        res.send({ "type": 'error', "message": 'Fill All Input Field' });
    else {
        const newData = {
            category,
            carNumber,
            carColor,
            carModelOrName,
        };
        Vehicles.findByIdAndUpdate(req.params.id, { $set: newData })
            .then((data) => {
                console.log('Update Vehicles', data);
                Vehicles.find().then((datas) => {
                    res.send({
                        "data" : datas,
                        "type" : 'success',
                        "message" : 'Customer Update Succes',
                    });
                });
            })
            .catch((error) => {
                console.log(error);
                Vehicles.find().then((datas) => {
                    res.send({
                        "data" :datas,
                        "type" : 'error',
                        "message" : 'Error Wihle Updating Customer details',
                    });
                });
            });
    }
});

module.exports = router;
