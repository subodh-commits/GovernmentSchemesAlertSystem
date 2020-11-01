var mongoose=require("mongoose");
const validators=require("mongoose-validators");
const passportLocalMongoose=require("passport-local-mongoose");
const adminSchema=new mongoose.Schema({
    username: {
        type:String,
        validate: [validators.isEmail(), validators.isLength(1, 100)]
    },
    password:
    { type:String, 
      minlength:"8",
      maxlength:"16"
    },
    
});
adminSchema.plugin(passportLocalMongoose);
const Admin=mongoose.model("Admin",adminSchema);
module.exports = Admin;