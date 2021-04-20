const mongoose = require('mongoose');

const User_TblSchema = new mongoose.Schema({
  user_id:{
    type:String,
    require:true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    required: true
  }
});

const User_Tbl = mongoose.model('User_Tbl', User_TblSchema);

module.exports = User_Tbl;
