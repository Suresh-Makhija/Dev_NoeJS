const mongoose = require('mongoose');

const Patient_Medicine_History_TblSchema = new mongoose.Schema({
  patient_medicine_history_id:{
    type:String,
    require:true
  },
  master_medicine_id:{
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
    type: Date,
    default: Date.now
  },
  
  medicine_Qty:{
    type:Number,
    require:true
  },
  total_price_per_medicine:{
    type:Number,
    require:true
  },
  description:{
    type:String,
    require:true
  }
});
const Patient_Medicine_History_Tbl = mongoose.model('Patient_Medicine_History_Tbl', Patient_Medicine_History_TblSchema);

module.exports = Patient_Medicine_History_Tbl;
