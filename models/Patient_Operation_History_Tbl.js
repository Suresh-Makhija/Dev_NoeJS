const mongoose = require('mongoose');

const Patient_Operation_History_TblSchema = new mongoose.Schema({
  Patient_operation_history_id:{
    type:String,
    require:true
  },
  master_operation_id:{
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

const Patient_Operation_History_Tbl = mongoose.model('Patient_Operation_History_Tbl', Patient_Operation_History_TblSchema);

module.exports = Patient_Operation_History_Tbl;
