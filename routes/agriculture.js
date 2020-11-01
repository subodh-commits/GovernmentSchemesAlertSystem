const express = require('express');
const router = express.Router();
//const passport=require("passport");

const Agriculturescheme=require('../models/agriculture_schemes');
const Register=require('../models/register');

router.post("/add",function(req,res){
    const user= new Agriculturescheme({schemeName:req.body.schemeName,  schemeInfo:req.body.schemeInfo,
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
    router.get("/agrischemes",function(req,res){
      Agriculturescheme.find(function(err,foundItems){
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
            from: "agricultureschemes",
            let: { user:"$username",age_req: "$age", gend: "$gender",income:"$annualIncome",cast:"$caste",occupation:"$occupation"},
            pipeline: [
               { $match:
                  { $expr: { $or:
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
      Agriculturescheme.deleteOne({schemeName:{$eq:decodeURIComponent(req.params.text)}},function(err,foundItems){
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