const express = require('express');
const router = express.Router();
//const passport=require("passport");

const Socialwelfarescheme=require('../models/socialwelfare_schemes');
const Register=require('../models/register');

router.post("/add",function(req,res){
    const user= new Socialwelfarescheme({schemeName:req.body.schemeName,  schemeInfo:req.body.schemeInfo,
        age_required:req.body.age,
        gender:req.body.gender,
        education:req.body.education,
        occupation:req.body.occupation,
        caste:req.body.caste,
        annualIncome:req.body.annual,
        nationality:req.body.national
        
         });
       user.save();  
    });

    router.get("/socialschemes",function(req,res){
      Socialwelfarescheme.find(function(err,foundItems){
        if(err){
          console.log(err);
        }
        else{
          res.send({
            success:true,
            data:foundItems
          })
        }
      });
    })  


    router.get("/users",function(req,res){
      Register.aggregate([
        {$lookup:
          {
            from: "socialwelfareschemes",
            let: { user:"$username",age_req: "$age", gend: "$gender",income:"$annualIncome",cast:"$caste",occupation:"$occupation"},
            pipeline: [
               { $match:
                  { $expr:
                              
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
                  
                          res.send({
                              success:true,
                              data:foundItems
                          })
                      }
                  
          
                    })
      })


    router.get("/:text",function(req,res){
      Socialwelfarescheme.deleteOne({schemeName:{$eq:decodeURIComponent(req.params.text)}},function(err,foundItems){
        if(err){
          console.log(err);
        }
        else{
          res.send({
            success:true,
            data:foundItems
        })
        }
          
        }
    )
    })
  


    


    


      module.exports = router;