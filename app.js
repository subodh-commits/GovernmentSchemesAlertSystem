const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport=require("passport");
const session=require("express-session");
const twilio=require("twilio");
const config = require('./config/database')
const Register=require('./models/register');
const Admin=require('./models/admin');
//const Educationscheme=require('./models/education_schemes');
const home = require('./routes/Home');
const register = require('./routes/register');
const educationSchemes=require('./routes/education');
const healthSchemes=require('./routes/health');
const energySchemes=require('./routes/energy');
const agricultureSchemes=require('./routes/agriculture');
const socialwelfareSchemes=require('./routes/socialwelfare');

var app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
    
  }));

app.use('/',home);  
app.use('/api/register',register); 
app.use('/api/education',educationSchemes);
app.use('/api/health',healthSchemes);
app.use('/api/agriculture',agricultureSchemes);
app.use('/api/energy',energySchemes);
app.use('/api/socialwelfare',socialwelfareSchemes);



mongoose.connect(config.database,{ useNewUrlParser: true, useUnifiedTopology: true 
} );
mongoose.set("useCreateIndex",true);

passport.use(Register.createStrategy());
passport.serializeUser(Register.serializeUser());
passport.deserializeUser(Register.deserializeUser());





      

  let port= process.env.PORT;
  if(port==null||port==""){
      port=3000;
  }
   
app.listen(port);


app.listen(3000, function () {
    console.log("server is listening on port 3000");
})


//api key
//d4042dbb3b31a1ae63e4100db648b7c7-us4

//list id
//725c54761a