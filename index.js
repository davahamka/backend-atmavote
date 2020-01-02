const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const UserModel = require('./models/user.model');
const app = express();
require('dotenv').config();

require('./config/passport');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())

// Routes
const auth = require('./routes/auth')
const category = require('./routes/category')
const nominee = require('./routes/nominee')

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}, () => console.log('MongoDB Connected!'))

app.get('/',(req,res,next)=>{
    res.json({
        message:"Hello World"
    })
})

app.use('/auth', auth)
app.use('/category', category)
app.use('/nominee', passport.authenticate('jwt', { session: false }), nominee)

app.listen(5000,()=>{
    console.log('App is running port 5000');
})
