
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = Schema({
    PatientName: { type: String, required: true },
    Contact: { type: String, required: true },
    Diease: { type: String, required: true },
    Gender: { type: String, required: true },
    DoctorId: { type: String, required: true },
    Date: { type: String, required: true }
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient
