import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{type:String,require:true},
    phonenumber:{type: String},
    name:{type:String},
    password:{type:String},
    cpassword:{type:String},
    desc:{type:String},
    loginAttempts: {
        type: Number,
        default: 0,
      },
      blockedUntil: {
        type: Date,
      },
    joinedOn:{type:Date,default:Date.now}

})

export default mongoose.model("User",userSchema)

