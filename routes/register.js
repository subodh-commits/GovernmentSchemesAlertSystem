const express = require('express');
const router = express.Router();
const passport=require("passport");
const request=require("request");
const https=require("https");
const accountSid = 'AC948d8395d338a49772c036b93f9463dd';
const authToken = '0fb28b217ec9cccaadc098ae7fd3c3c7';
const client = require('twilio')(accountSid, authToken);


const Register=require('../models/register');
const Admin=require('../models/admin');
//const Educationscheme=require('../models/education_schemes');

router.post("/signup",function(req,res){
    const firstname=req.body.firstname;
    const lastname= req.body.lastname;
    const phone=req.body.phonenumber;
    const email=req.body.email;
    const data={
        members:[
            {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstname,
                LNAME:lastname
            }
            }
        ]
    };


    const url="https://us4.api.mailchimp.com/3.0/lists/725c54761a";
    const jsonData=JSON.stringify(data);
    const options={
        method:"POST",
        auth:"subodh:d4042dbb3b31a1ae63e4100db648b7c7-us4"
    };

   const request= https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
    
    client.messages
    .create({
     body: 'Welcome to Govtschemes.in '+firstname+' Get regular updates of government schemes and apply for them to get deserving benifits from government.',
     from: '+12058989536',
     to: '+91'+phone
   })
   
    

  Register.register({firstName:req.body.firstname, lastName:req.body.lastname,
        phoneNumber:req.body.phonenumber,
        birth_date:req.body.birthdate,
        age:req.body.age,
        gender:req.body.gender,
        email:req.body.email,
        address:req.body.address,
        education:req.body.education,
        occupation:req.body.occupation,
        caste:req.body.caste,
        annualIncome:req.body.annual,
        username:req.body.username, active: false}, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            res.redirect("/signup");
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/loginPage");
            })
        }
         });
      
    });

    router.post("/sms",function(req,res){
       const Number=req.body.phonenumber;
       const msgBody=req.body.SMS;
        client.messages
    .create({
     body: msgBody,
     from: '+12058989536',
     to: '+91'+Number
   }).then(message => res.send({
    success:true,
    data:user
   })
)
    })


    router.post("/admin",function(req,res){
       var username=req.body.email;
       var password=req.body.psw;
       if(username==="subodhbadavate"&& password==="987654321"){
        res.redirect('/admin');
    }
    })
  

    router.get("/education/:username",function(req,res){
        Register.aggregate([
            {$lookup:
            {
              from: "educationschemes",
              let: { user:"$username",age_req: "$age", gend: "$gender",income:"$annualIncome",cast:"$caste" },
              pipeline: [
                 { $match:
                    { $expr:{ $and:
                        [
                            {$and: [{$eq:[req.params.username,"$$user"]}]
                            },
                                
                       { $or:
                          [ {$and: [
                            { $eq: [ "$gender",  "$$gend" ] },
                            { $gte: [ "$age_required", "$$age_req" ] },
                            {$or:[
                                { $eq: [ "SC",  "$$cast" ] },
                                { $eq: [ "ST",  "$$cast" ] }, 
                            ]}
                            ]
                           },
                           {$and: [
                            { $eq: [ "$gender",  "$$gend" ] },
                            { $gte: [ "$age_required", "$$age_req" ] },
                            {$or:[
                                { $eq: [ "SC",  "$$cast" ] },
                                { $eq: [ "ST",  "$$cast" ] }, 
                                { $eq: [ "OBC",  "$$cast" ] },
                                { $eq: [ "GENERAL",  "$$cast" ] },
                            ]}
                            ]
                           },

                           {$and: [
                            { $eq: [ "$caste",  "$$cast" ] }
                            
                            ]
                           },
                        {$and: [
                             {$lte:[6,"$$age_req"]},
                             {$gte:[14,"$$age_req"]},
                            { $gte: [ "$annualIncome", "$$income" ] }
                            ]
                           },
                           
                           {$and: [
                            {$lte:[8,"$$age_req"]},
                            {$gte:[14,"$$age_req"]},
                           { $gte: [ "$annualIncome", "$$income" ] }
                            ]
                           }
                           
                     ]
                       }
                    ]
                    }
                    }
                 },
                { $project: { age_required: 0, _id: 0,gender:0,caste:0,education:0,occupation:0,nationality:0,annualIncome:0} }
              ],
              as: "schemeDetails"
            }
       }
 ],function(err,foundItems){
                if(err){
            console.log(err);
                }
                else{
                    foundItems.forEach(user => {
                        if(user.username===req.params.username){
                            res.send({
                                success:true,
                                data:user
                            })
                        }
                    });
            
          }
        })

    })

    router.get("/health/:username",function(req,res){
        Register.aggregate([
            {$lookup:
            {
              from: "healthschemes",
              let: { user:"$username",age_req: "$age", gend: "$gender",income:"$annualIncome",cast:"$caste" },
              pipeline: [
                 { $match:
                    { $expr:{ $and:
                        [
                            {$and: [{$eq:[req.params.username,"$$user"]}]
                            },
                                
                       { $or:
                          [ {$and: [
                            { $eq: [ "$gender",  "$$gend" ] },
                            { $gte: [ "$annualIncome", "$$income" ] },
                            {$or:[
                                { $eq: [ "SC",  "$$cast" ] },
                                { $eq: [ "ST",  "$$cast" ] }, 
                                
                            ]}
                        ]
                        },
                           {$and: [
                            { $eq: [ "$gender",  "No Need" ] },
                            { $gte: [ "$annualIncome", "$$income" ] },
                            {$or:[
                                { $eq: [ "SC",  "$$cast" ] },
                                { $eq: [ "ST",  "$$cast" ] }, 
                                { $eq: [ "OBC",  "$$cast" ] },
                                { $eq: [ "GENERAL",  "$$cast" ] },
                            ]}
                            ]
                           },

                           {$and: [
                            { $eq: [ "$gender",  "No Need" ] },
                            { $gte: [ "$annualIncome", "$$income" ] },
                            {$or:[
                                { $eq: [ "SC",  "$$cast" ] },
                                { $eq: [ "ST",  "$$cast" ] }, 
                                { $eq: [ "OBC",  "$$cast" ] },
                                { $eq: [ "GENERAL",  "$$cast" ] },
                            ]}
                            
                            ]
                           },
                           {$and: [
                            { $eq: [ "$gender",  "No Need" ] },
                            { $gte: [ "$annualIncome", "$$income" ] },
                            {$or:[
                                { $eq: [ "SC",  "$$cast" ] },
                                { $eq: [ "ST",  "$$cast" ] }, 
                                { $eq: [ "OBC",  "$$cast" ] },
                                { $eq: [ "GENERAL",  "$$cast" ] },
                            ]}
                            
                            ]
                           }
                           
                          
                     ]
                       }
                    ]
                    }
                    }
                 },
                { $project: { age_required: 0, _id: 0,gender:0,caste:0,education:0,occupation:0,nationality:0,annualIncome:0} }
              ],
              as: "schemeDetails"
            }
       }
 ],function(err,foundItems){
                if(err){
            console.log(err);
                }
                else{
                    foundItems.forEach(user => {
                        if(user.username===req.params.username){
                            res.send({
                                success:true,
                                data:user
                            })
                        }
                    });
            
          }
        })
    })


    
    router.get("/agriculture/:username",function(req,res){
        Register.aggregate([
            {$lookup:
            {
              from: "agricultureschemes",
              let: { user:"$username",age_req: "$age", gend: "$gender",income:"$annualIncome",cast:"$caste",occupation:"$occupation"},
              pipeline: [
                 { $match:
                    { $expr:{ $and:
                        [
                            {$and: [{$eq:[req.params.username,"$$user"]}]
                            },
                                
                       { $or:
                          [  {$and: [
                            {$eq:["$occupation","$$occupation"]}
                            ]
                           },
                            {$and: [
                              {$eq:["$occupation","$$occupation"]}
                            ]
                           },
                           {$and: [
                            {$eq:["$occupation","$$occupation"]}
                            ]
                           },

                           {$and:[
                            {$eq:["$occupation","$$occupation"]}
                            ]
                           }
                        
                           ]
                       }
                    ]
                    }
                    }
                 },
                { $project: { age_required: 0, _id: 0,gender:0,caste:0,education:0,occupation:0,nationality:0,annualIncome:0} }
              ],
              as: "schemeDetails"
            }
       }
 ],function(err,foundItems){
                if(err){
            console.log(err);
                }
                else{
                    foundItems.forEach(user => {
                        if(user.username===req.params.username){
                            res.send({
                                success:true,
                                data:user
                            })
                        }
                    });
            
          }
        })

    })


    router.get("/socialwelfare/:username",function(req,res){
        Register.aggregate([
            {$lookup:
            {
              from: "socialwelfareschemes",
              let: { user:"$username",age_req: "$age", gend: "$gender",income:"$annualIncome",cast:"$caste",occupation:"$occupation"},
              pipeline: [
                 { $match:
                    { $expr:{ $and:
                        [
                            {$and: [{$eq:[req.params.username,"$$user"]}]
                            },
                                
                       { $or:
                          [  {$and: [
                            {$lte:["$age_required","$$age_req"]}
                            ]
                           },
                            {$and: [
                            {$lt:["$age_required","$$age_req"]}
                            
                            ]},
                           {$and: [
                            {$lte:["$age_required","$$age_req"]},
                            {$gte:["$annualIncome","$$income"]}
                            ]
                           },

                           {$and:[
                            {$lte:[18,"$$age_req"]},
                             {$gte:[50,"$$age_req"]},
                            ]
                           }
                        
                           ]
                       }
                    ]
                    }
                    }
                 },
                { $project: { age_required: 0, _id: 0,gender:0,caste:0,education:0,occupation:0,nationality:0,annualIncome:0} }
              ],
              as: "schemeDetails"
            }
       }
 ],function(err,foundItems){
                if(err){
            console.log(err);
                }
                else{
                    foundItems.forEach(user => {
                        if(user.username===req.params.username){
                            res.send({
                                success:true,
                                data:user
                            })
                        }
                    });
            
          }
        })

    })


    
    router.get("/energy/:username",function(req,res){
        Register.aggregate([
            {$lookup:
            {
              from: "energyschemes",
              let: { user:"$username",age_req: "$age", gend: "$gender",income:"$annualIncome",cast:"$caste",occupation:"$occupation"},
              pipeline: [
                 { $match:
                    { $expr:{ $and:
                        [
                            {$and: [{$eq:[req.params.username,"$$user"]}]
                            },
                                
                       { $or:
                          [  {$and: [
                            {$lte:["$age_required","$$age_req"]},
                            {$lte:["$gender","$$gend"]},
                            {$gte:["$annualIncome","$$income"]}
                           ]
                           },
                           
                        {$and:[
                            {$eq:["$gender","No Need"]}
                            ]
                           }
                        
                           ]
                       }
                    ]
                    }
                    }
                 },
                { $project: { age_required: 0, _id: 0,gender:0,caste:0,education:0,occupation:0,nationality:0,annualIncome:0} }
              ],
              as: "schemeDetails"
            }
       }
 ],function(err,foundItems){
                if(err){
            console.log(err);
                }
                else{
                    foundItems.forEach(user => {
                        if(user.username===req.params.username){
                            res.send({
                                success:true,
                                data:user
                            })
                        }
                    });
            
          }
        })

    })


    



      module.exports = router;