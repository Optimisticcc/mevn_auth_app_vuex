const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')

const passport = require('passport');
//init app
const app = express();

// middlewares
//formdata middleware
app.use(bodyParser.urlencoded({
    extended: false
}))

// json body middleware
app.use(bodyParser.json());
//cors middleware
app.use(cors());
//setting static directory
app.use(express.static(path.join(__dirname,'public')));
//passport middleware
app.use(passport.initialize());
//bring in the passport strategy
require('./config/passport')(passport);

// bring in database config
const db = require('./config/keys').mongoURI;
mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(()=>{
    console.log(`Database connection successfully ${db}`);
})
.catch((err)=>{
    console.log(`Unable to connect database ${err}`);
})

//bring user api
const userRouter = require('./routes/api/User');

app.use('/api/users',userRouter);

app.get('/',(req,res)=>{
    res.send('Hello world');
})

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'))
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is starting on PORT ${PORT}`);
})

