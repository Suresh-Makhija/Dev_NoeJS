const mongoose = require('mongoose');

const Counter_TblSchema = new mongoose.Schema({
  counter_id:{
    type:String,
    require:true
  },
  sequence_value:{
    type:String,
    require:true
  }
});

const Counter_Tbl = mongoose.model('Counter_Tbl', Counter_TblSchema);

module.exports = Counter_Tbl;
