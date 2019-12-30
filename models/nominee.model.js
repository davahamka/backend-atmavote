const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NomineeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  vote: {
    type: Number,
    required: true
  },
  
});



const NomineeModel = mongoose.model('nominee', NomineeSchema);

module.exports=NomineeModel