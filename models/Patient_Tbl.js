const mongoose = require('mongoose');

const Patient_TblSchema = new mongoose.Schema({
patient_id:{
  type:String,
  required:true
},
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  gender: {
    type: String
  },
  age: {
    type: Number
  },
  full_name: {
    type: String
  },
  mobile_no: {
    type: Number,
    required: true
  },
  email_address: {
    type: String
  },
  insert_date_time: {
    type: String,
    required: true
  },
  photo: {
    contentType: String,
    data: Buffer
  }
});

const Patient_Tbl = mongoose.model('Patient_Tbl', Patient_TblSchema);

module.exports = Patient_Tbl;
