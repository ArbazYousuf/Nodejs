const express = require("express");
const User = require('./models/user');
const Patient = require('./models/patient');
const api = express.Router();


api.post("/login", function (req, res) {
    console.log(req.body)
    const query = User.findOne({ Email: req.body.state.email });
    query.exec(callback);
    console.log('d', req.body.state.email)
    function callback(error, data) {
        if (error) {
            console.log('d', error)
        }
        res.status(200).send({ User: data })
    }
})

api.post("/patient", function (req, res) {
    console.log(req.body)
    const patient = new Patient({Date: req.body.state.date, PatientName: req.body.state.name, Contact: req.body.state.contact, Diease: req.body.state.diease, Gender: req.body.state.gender,DoctorId : req.body.state.doctorId })
    patient.save(
        function (error, data) { //error, success data
            console.log("error", error, data);
            if (error) {
                console.log("error", error);
                res.send({ error: error });
                // return;
            }
            else { res.send({ patient: data }); }
        }
    )
})

api.post("/signup", (req, res) => {
    const query = User.findOne({ Email: req.body.state.email });
    query.exec(callback);
    console.log('d', req.body.state.email)
    function callback(error, data) {
        if (error) {
            console.log('d', error)
        }
        if (data) {
            console.log('data hy')
            res.status(200).send({ User: data });

        }
        else {
            console.log('data nhe hy')
            const user = new User({ Email: req.body.state.email, Password: req.body.state.password, Name: req.body.state.name });
            user.save(
                function (error, data) { //error, success data
                    console.log("error", error, data);
                    if (error) {
                        console.log("error", error);
                        res.send({ error: error });
                        // return;
                    }
                    else { res.send({ user: data }); }
                }
            )

        }
    }
});

api.get("/patient/:_id", (req, res) => {
    // const findById = { _id: req.params.id }
    // const query = User.findOne(findById);
    console.log(req.params._id)
    const query = Patient.find({DoctorId : req.params._id});
    query.exec(callback);
    function callback(error, data) {
        if (error) {
            console.log("error", error);
            res.status(500).send({ error: error });
            return;
        }
        console.log(data)
        res.status(200).send({ Patient : data });
    }
})



module.exports = api;