const mongoose = require('mongoose');

const Master_Medicine_tblSchema = new mongoose.Schema({
  master_medicine_id:{
    type:String,
    require:true
  },
  medicine_description:{
    type:String,
    require:true
  },
  insert_date_time:{
    type: Date,
    default: Date.now
  },
  master_diagno_id:{
    type:String,
    require:true
  },
  medicine_price:{
    type:Number,
    require:true
  }

  });
const Master_Medicine_tbl = mongoose.model('Master_Medicine_tbl', Master_Medicine_tblSchema);

module.exports = Master_Medicine_tbl;
