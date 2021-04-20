const mongoose = require('mongoose');

const Master_Operation_TblSchema = new mongoose.Schema({
  master_operation_id:{
    type:String,
    require:true
  },
  operation_description:{
    type:String,
    require:true
  },
  operation_price:{
    type:Number,
    require:true
  }
});

const Master_Operation_Tbl = mongoose.model('Master_Operation_Tbl', Master_Operation_TblSchema);

module.exports = Master_Operation_Tbl;
