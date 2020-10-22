/** @format */

const router = require('express').Router();
const Customers = require('../models/customers');

router.get('/list', function (req, res) {
    Customers.find().then((datas) => {
        res.json({
            "data" : datas,
            "type": '',
            "message" : '',
        });
    });
});

router.post('/', function (req, res) {
    console.log('post customer', req.body);
    const { fullName, address, phoneNumber, licenseNumber } = req.body;

    if (fullName === '' || address === '' || phoneNumber === '' || licenseNumber === '')
        res.send({ "type": 'error', "message": 'Fill All Input Field' });
    else {
        const newCustomer = new Customers({
            fullName,
            address,
            phoneNumber,
            licenseNumber,
        });
        newCustomer
            .save()
            .then(() => {
                res.send({ "type": 'success', "message": 'Customer added' });
            })
            .catch((error) => {
                console.log('Error while Saving', error);
                res.send({ "type": 'error', "message": 'Error While Saving' });
            });
    }
});

router.post('/update/:id', function (req, res) {
    console.log('post customer', req.body);
    const { fullName, address, phoneNumber, licenseNumber } = req.body;

    if (fullName === '' || address === '' || phoneNumber === '' || licenseNumber === '')
        res.send({ "type": 'error', "message": 'Fill All Input Field' });
    else {
        const newData = {
            fullName,
            address,
            phoneNumber,
            licenseNumber,
        };
        Customers.findByIdAndUpdate(req.params.id, { $set: newData })
            .then((data) => {
                console.log('Update Customer', data);
                Customers.find().then((datas) => {
                    res.send({
                        "data" : datas,
                        "type": 'success',
                        "message": 'Customer Update Succes',
                    });
                });
            })
            .catch((error) => {
                console.log(error);
                Customers.find().then((datas) => {
                    res.send({
                        "data" : datas,
                        "type": 'error',
                        "message": 'Error Wihle Updating Customer details',
                    });
                });
            });
    }
});

router.get('/delete/:id', function (req, res) {
    Customers.findByIdAndDelete(req.params.id)
        .then((data) => {
            console.log('Deleting Customer:', data);
            Customers.find().then((datas) => {
                res.send({
                    "data" : datas,
                    "type": 'success',
                    "message": ' Customer remove successfull',
                });
            });
        })
        .catch((error) => {
            console.log('Error While Deleting', error);
            Customers.find().then((datas) => {
                res.send({
                    "data" : datas,
                    "type": 'error',
                    "message": 'Something Went Wrong In Server',
                });
            });
        });
});

module.exports = router;
