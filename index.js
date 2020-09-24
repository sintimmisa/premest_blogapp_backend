const express =require('express');
const bodyParser =require('body-parser');
const cors =require('cors');
require('dotenv').config();

const connectDB =require('./database/db');

//import postRouter
const posts=require('./controllers/Post');

//initialize express
const app =express();


//Init Bodyparser middle ware
app.use(bodyParser.json());

app.use(cors());


// Connect Database
connectDB();


app.use('/', (req,res)=>{
    res.send('Hello Server');
});


//use Post Router as api/posts
app.use('/api/posts',posts);


//Declare PORT
const PORT = process.env.PORT;
app.listen(PORT,(req,res)=>{
    console.log(`Server started at port:${PORT}`);
})