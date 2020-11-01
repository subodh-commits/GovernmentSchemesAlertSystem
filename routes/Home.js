const express = require('express');
const router = express.Router();

const passport=require("passport");

const Register=require('../models/register');
const Admin=require('../models/admin');

router.use(passport.initialize());
router.use(passport.session());


router.get('/', function (req, res) {
    res.render("home.ejs");
});
router.get("/About_Us", function (req, res) {
    res.render("About_Us.ejs");
});
router.get("/Agriculture", function (req, res) {
    res.render("Agriculture.ejs");
});
router.get("/Health", function (req, res) {
    res.render("Health.ejs");
});
router.get("/Education", function (req, res) {
    res.render("Education.ejs");
});
router.get("/Energy", function (req, res) {
    res.render("Energy.ejs");
});
router.get("/Social_welfare", function (req, res) {
    res.render("Social_welfare.ejs");
});
router.get("/signup", function (req, res) {
    res.render("signup.ejs");
});
router.get("/add", function (req, res) {
    res.render("admin.ejs");
});
router.get("/Educationadd_schemes", function (req, res) {
    res.render("Educationadd_schemes.ejs");
});
router.get("/Healthadd_schemes", function (req, res) {
    res.render("Healthadd_schemes.ejs");
});
router.get("/Agricultureadd_schemes", function (req, res) {
    res.render("Agricultureadd_schemes.ejs");
});
router.get("/socialwelfareadd_schemes", function (req, res) {
    res.render("socialwelfareadd_schemes.ejs");
});
router.get("/Energyadd_schemes", function (req, res) {
    res.render("Energyadd_schemes.ejs");
});
router.get("/admin", function (req, res) {
   
    res.render("admin.ejs");

 
});
router.get("/Beti%20Bachao,%20Beti%20Padhao", function (req, res) {
    res.render("beti_bachao.ejs");
});
router.get("/The%20Right%20of%20Children%20to%20Free%20and%20Compulsory%20Education", function (req, res) {
    res.render("RTE.ejs");
});
router.get("/Post%20Matric%20Scholarships%20to%20the%20Students%20Belonging%20to%20Scheduled%20Tribe", function (req, res) {
    res.render("PMS_ST.ejs");
});
router.get("/Free%20Hostel%20Scheme", function (req, res) {
    res.render("Freehostel.ejs");
});
router.get("/National%20Scheme%20of%20Incentives%20to%20Girls%20for%20Secondary%20Education", function (req, res) {
    res.render("vidyalaksmiPortal.ejs");
});
router.get("/Pradhan%20mantri%20Swasthya%20Suraksha%20Yojana", function (req, res) {
    res.render("PMSSY.ejs");
});
router.get("/Karunya%20Health%20Scheme", function (req, res) {
    res.render("KHS.ejs");
});
router.get("/Ayushman%20Bharat%20yojana", function (req, res) {
    res.render("ABY.ejs");
});
router.get("/Janani%20Suraksha%20Yojana", function (req, res) {
    res.render("JSY.ejs");
});
router.get("/National%20Agriculture%20Market", function (req, res) {
    res.render("e_NAM.ejs");
});
router.get("/Paramparagat%20Krishi%20Vikas%20Yojana", function (req, res) {
    res.render("PKVY.ejs");
});
router.get("/Soil%20Health%20Card%20Scheme", function (req, res) {
    res.render("SHC.ejs");
});
router.get("/Pradhan%20Mantri%20Krishi%20Sinchayee%20Yojana", function (req, res) {
    res.render("PMKSY.ejs");
});
router.get("/Pradhan%20Mantri%20Fasal%20Bima%20Yojana", function (req, res) {
    res.render("PMFBY.ejs");
});
router.get("/Pradhan%20Mantri%20Mudra%20Yojana", function (req, res) {
    res.render("PMMY.ejs");
});
router.get("/Pradhan%20Mantri%20Jan%20Dhan%20Yojana", function (req, res) {
    res.render("PMJDY.ejs");
});
router.get("/Pradhan%20Mantri%20Awas%20Yojana", function (req, res) {
    res.render("PMAY.ejs");
});
router.get("/Pradhan%20Mantri%20Jeevan%20Jyoti%20Bima%20Yojana", function (req, res) {
    res.render("PMJJY.ejs");
});
router.get("/Solar%20Energy%20Subsidy%20Scheme", function (req, res) {
    res.render("SES.ejs");
});
router.get("/Pradhan%20Mantri%20Ujjwala%20Yojana", function (req, res) {
    res.render("PMUY.ejs");
});
router.get("/Rooftop%20Scheme", function (req, res) {
    res.render("RooftopScheme.ejs");
});
router.get("/Pradhan%20Mantri%20Jl-VAN%20yojana", function (req, res) {
    res.render("PMJY.ejs");
});

router.get("/Login", function (req, res) {
    if (req.isAuthenticated()){
       req.session.passport.user
        res.render("Login",{user: req.session.passport.user});
        
    }
    else{
       res.redirect("/loginPage");
    }
    
});
router.get("/schemes", function (req, res) {
    res.render("schemes.ejs");
});
router.get("/loginPage", function (req, res) {
   
       res.render("loginPage");
   
    
});
router.get("/signup", function (req, res) {
    res.render("signup.ejs");
});

router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
    
})


router.post("/loginPage",function(req,res){
    
    const user=new Register({
       username:req.body.username,
       password:req.body.password
    });

    req.login(user,function(err){
        if(err){
            console.log(err)
        }
        else{
            passport.authenticate("local")(req,res,function(){
                //console.log(req.body.username);
                res.redirect("/Login");
                

        });
    }
    });
   
});









module.exports = router;