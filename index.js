const mongo = require('mongodb');
const express = require('express');
const app = express();
const db = require('./db/connection');

app.get('/',(req,res,next)=>{
    res.json({
        message:"Helll  o World"
    })
})

db.then(()=>{
    console.log('Connected to server')
})

app.listen(5000,()=>{
    console.log('App is running port 5000');
})