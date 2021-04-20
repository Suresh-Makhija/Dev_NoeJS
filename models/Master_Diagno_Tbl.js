const mongoose = require('mongoose');

const Master_Diagno_TblSchema = new mongoose.Schema({
  master_diagno_id:{
    type:String,
    require:true
  },
  diagno_description:{
    type:String,
    require:true
  },
  insert_date_time:{
    type:String,
    require:true
  }
});

const Master_Diagno_Tbl = mongoose.model('Master_Diagno_Tbl', Master_Diagno_TblSchema);

module.exports = Master_Diagno_Tbl;
