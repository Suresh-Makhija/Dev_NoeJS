const mongoose = require('mongoose');

const Patient_Diagno_History_TblSchema = new mongoose.Schema({
  Patient_diagno_History_id:{
    type:String,
    require:true
  },
  master_diagno_id:{
    type:String,
    require:true
  },
  appointment_id:{
    type:String,
    require:true
  },
  patient_id:{
    type:String,
    require:true
  },
  insert_date_time:{
    type:String,
    require:true
  }
});

const Patient_Diagno_History_Tbl = mongoose.model('Patient_Diagno_History_Tbl', Patient_Diagno_History_TblSchema);

module.exports = Patient_Diagno_History_Tbl;
