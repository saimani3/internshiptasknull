import jwt from 'jsonwebtoken'
import users from '../models/auth.js' 
import storeotp from '../models/auth1.js' 
import textflow from "textflow.js";
textflow.useKey("f6yslmBqWKWtMdPv5nBC7y3qit93HiOCBgb34zkTSbsKDH53Bxy0EDmACKHl2APt");


export const login = async(req,res)=>{
     const {email}=req.body;
    //  console.log(email)
     try{
        const existingUser = await users.findOne({email});
        if(!existingUser){
            try {
                const newUser=await users.create({email});
                const token = jwt.sign({
                    email:newUser.email,id:newUser._id
                },process.env.JWT_SECRET,{
                    expiresIn:"1h"
                })
                res.status(200).json({result:newUser,token})
            } catch (error) {
                res.status(500).json({mess:"Something wents wrong..."});
            }
        }
        else{
            const token=jwt.sign({
                email:existingUser.email,id:existingUser._id
            },process.env.JWT_SECRET,{
                expiresIn:"1h"
            })
            res.status(200).json({result:existingUser,token})
        }
     } catch(error){
         res.status(500).json({mess:"Something wents wrong..."})
     }
}
export const signup = async(req,res)=>{
     const {email,password,cpassword}=req.body;
    //  console.log(req.body)
     try{
         const filter = {email:email}
         const update = {
             $set: {password:password,cpassword:cpassword},
           };
        const existingUser = await users.findOneAndUpdate(filter,update);
        if(!existingUser){
            try {
                const newUser=await users.create(email,password,cpassword);
                    const token = jwt.sign({
                        email:newUser.email,id:newUser._id,password:newUser.password,cpassword:newUser.cpassword
                    },process.env.JWT_SECRET,{
                        expiresIn:"1h"
                    })
                    res.status(200).json({result:newUser,token})
            } catch (error) {
                res.status(500).json({mess:"Something wents wrong..."});
            }
        }
        else{
            const token=jwt.sign({
                email:existingUser.email,id:existingUser._id
            },process.env.JWT_SECRET,{
                expiresIn:"1h"
            })
            res.status(200).json({result:existingUser,token})
        }
     } catch(error){
         res.status(500).json({mess:"Something wents wrong..."})
     }
}

export const sendOTP = async(req,res)=>{
    const { phonenumber,email,password } = req.body;
    console.log(req.body)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otp)
  try {
    const filter = {email:email,password:password}
         const update = {
             $set: {phonenumber:phonenumber},
           };
    const existingUser = await users.findOneAndUpdate(filter,update);
    if(existingUser){
    const message = `otp is ${otp}  expries in 5 mins`;
    // const newUser=await users.findOneAndUpdate(filter,phonenumber);
    const newotp=await storeotp.create({otp,phonenumber});
    var result = await textflow.sendSMS(phonenumber, message);
    console.log(result)
    res.status(200).json({ message: 'OTP sent successfully'});
}
// else{
    // }
else{
    res.status(400).json({message:"email and password is incorrent"})
    console.log("email and password is incorrent")
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const verifyOTP = async(req,res)=>{
    try {
        const {otp,phonenumber,email} = req.body;
        console.log(req.body)
        const filter = {
            phoneNumber: phonenumber,
            otp: otp,            
          };
          const finddata=await storeotp.findOne(filter)
          if(finddata){
            const existingUser = await users.find({email});
            if(existingUser){
                const token=jwt.sign({
                    email:existingUser.email,id:existingUser._id
                },process.env.JWT_SECRET,{
                    expiresIn:"1h"
                })
                res.status(200).json({ message: 'User is logged in successfully',result:existingUser,token});
                console.log("user is login successfully")
            }else{
                console.log("user not found")

            }
        }
        else{
            res.status(400).json({ error: 'invalid otp' });
            console.log('invalid otp')
        }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }