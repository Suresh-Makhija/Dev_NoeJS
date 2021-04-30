const mongoose = require('mongoose');

var minuteFromNow = function(){
  var date = new Date();
//  timeObject.setTime(timeObject.getTime() + 1000 * 60);
//  return timeObject;
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
};

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
    type: Date,
    require:true
  },
  insert_date_time: {
    type: Date,
    default: minuteFromNow
  }
});

const Patient_Appointment_Tbl = mongoose.model('Patient_Appointment_Tbl', Patient_Appointment_TblSchema);

module.exports = Patient_Appointment_Tbl;
