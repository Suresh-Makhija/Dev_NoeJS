const mongoose = require('mongoose');

const Patient_Appointment_TblSchema = new mongoose.Schema({
  appointment_id: {
    type: String,
    required: true
  },
  patient_id: {
    type: Number,
    required: true
  },
  appointment_date_time: {
    type: String,
    require:true
  },
  insert_date_time: {
    type: String,
    require:true
  }
});

const Patient_Appointment_Tbl = mongoose.model('Patient_Appointment_Tbl', Patient_Appointment_TblSchema);

module.exports = Patient_Appointment_Tbl;
