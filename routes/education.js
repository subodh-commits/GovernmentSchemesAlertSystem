const express = require('express');
const router = express.Router();
//const passport=require("passport");

const Educationscheme=require('../models/education_schemes');
const Register=require('../models/register');

router.post("/add",function(req,res){
    const user= new Educationscheme({schemeName:req.body.schemeName,  schemeInfo:req.body.schemeInfo,
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


  router.get("/eduschemes",function(req,res){
    Educationscheme.find(function(err,foundItems){
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
          from: "educationschemes",
          let: { age_req: "$age", gend: "$gender",income:"$annualIncome",cast:"$caste" },
          pipeline: [
             { $match:
                { $expr:{ $or:
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
    Educationscheme.deleteOne({schemeName:{$eq:decodeURIComponent(req.params.text)}},function(err,foundItems){
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