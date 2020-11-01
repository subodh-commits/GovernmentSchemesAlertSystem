var mongoose=require("mongoose");
const validators=require("mongoose-validators");
//const passportLocalMongoose=require("passport-local-mongoose");
const socialwelfareSchema=new mongoose.Schema({
    schemeName: 
    { type: String
    },
    schemeInfo: 
    { type: String, 
      
    },
    age_required:{ type: Number, 
        validate: [validators.isNumeric(), validators.isLength(1, 4)]
        },
    gender:{
        type:String,
        enum:["Male","Female","No Need"]
    },
    
    education:String,
    occupation:String,
    caste:String,
    annualIncome:
    {type:Number,
    validate: [validators.isNumeric()]
   },
   nationality:String
    
});
//registerSchema.plugin(passportLocalMongoose);
const Socialwelfarescheme=mongoose.model("Socialwelfarescheme",socialwelfareSchema);
module.exports = Socialwelfarescheme;