var mongoose=require("mongoose");
const validators=require("mongoose-validators");
const passportLocalMongoose=require("passport-local-mongoose");
const registerSchema=new mongoose.Schema({
    firstName: 
    { type: String, 
      validate: [validators.isAlpha(), validators.isLength(2, 60)]
    },
    lastName: 
    { type: String, 
      validate: [validators.isAlpha(), validators.isLength(2, 60)]
    },
    phoneNumber:
    { type: String, 
      validate: [validators.isAlphanumeric(), validators.isLength(1, 11)]
      },
    birth_date:Date,
    age:{ type: Number, 
        validate: [validators.isNumeric(), validators.isLength(1, 4)]
        },
    gender:{
        type:String,
        enum:["Male","Female"]
    },
    email: {
        type:String,
        validate: [validators.isEmail(), validators.isLength(1, 100)]
    },
    address:String,
    education:String,
    occupation:String,
    caste:String,
    annualIncome:
    {type:Number,
    validate: [validators.isNumeric()]
   },
    username:
    { type: String, 
    validate: [validators.isLength(1, 20)]
    },
    password:
    { type:String, 
      minlength:"8",
      maxlength:"16"
    },
    
});
registerSchema.plugin(passportLocalMongoose);
const Register=mongoose.model("Register",registerSchema);
module.exports = Register;