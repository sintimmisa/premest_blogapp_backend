const express =require('express');
const bodyParser =require('body-parser');
const cors =require('cors');
const e = require('cors');
require('dotenv');

//initialize express
const app =express();

//Declare PORT
const PORT = process.env.PORT ||4000;

app.use('/', (req,res)=>{
    res.send('Hello Server');
})

app.listen(PORT,(req,res)=>{
    console.log(`Server started at port:${PORT}`);
})