const express =require('express');
const bodyParser =require('body-parser');
const passport =require('passport');
const cors =require('cors');
require('dotenv').config();

const connectDB =require('./database/db');

//import Router
const posts=require('./controllers/api/Post');
const users=require('./controllers/api/users');

//initialize express
const app =express();

//Initailize passport
app.use(passport.initialize);

//Init Bodyparser middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors({ origin: true, credentials: true }));


// Connect Database
connectDB();


app.get('/', (req,res)=>{
    res.send('Hello Server');
});


//use Post Router as api/posts
//app.use('/api/posts',posts);
/*app.post('/users',(req,res)=>{
    console.log(req.body);
    res.send(req.body);
    
})*/

app.use('/api/user',users);

//Declare PORT
const PORT = process.env.PORT;
app.listen(PORT,(req,res)=>{
    console.log(`Server started at port:${PORT}`);
})