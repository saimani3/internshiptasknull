import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  phonenumber:{
    type:Number,
  },
    otp: String,
    createdAt: { type: Date, expires: '5m', default: Date.now }, // OTPs expire in 5 minutes
  });
  
export default mongoose.model('OTP', otpSchema);