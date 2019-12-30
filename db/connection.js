const monk = require('monk');

const url = "mongodb+srv://root:root123@cluster0-7ydg2.mongodb.net/test?retryWrites=true&w=majority";
const db = monk(url);

module.exports=db;