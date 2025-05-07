const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.createUser = async(req,res)=>{

  const {userName,email,phoneNum,password,remainder} = req.body;

  console.log(email);
  let user1 = await User.findOne({email});
  let user2 = await User.findOne({phoneNum});

  if(user1 || user2){
    return res.status(400).json({message:"Please enter New PhoneNumber and Email"});
  }

  let salt = await bcrypt.genSalt(10);
  let hashPassword = await bcrypt.hash(password,salt);
  
  const user = await User.create({
    userName,
    email,
    phoneNum,
    password:hashPassword,
    remainder
  })

  const options = {
    expires: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  const token = jwt.sign({id:user._id},'mysecret',{expiresIn:5 * 24 * 60 * 60 * 1000});
  return res.status(200).cookie("token",token,options).json({user:user,token});

}

exports.loginUser = async (req,res)=>{
   
   const {email,password} = req.body;

  //  if(!email || !password){
  //    return res.status(400).json({message : "Please Enter email and password"});
  //  }
   let user = await User.findOne({email});
  
   if(!user){
    return res.status(400).json({message : "Enter correct password and mail"});
   }
   const isMatch = await bcrypt.compare(password,user.password);
   if(! isMatch){
     return res.status(400).json({message:"Please check password again"});
   }
   const options = {
    expires: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

   const token = jwt.sign({id:user._id},'mysecret',{expiresIn:5 * 24 * 60 * 60 * 1000});
   return res.status(200).cookie("token",token,options).json({user:user,token});
  
}

exports.getUser = async (req,res)=>{
  res.send("user is fetched");
}



exports.logoutUser = async(req,res)=>{
   return res.status(200).cookie("token",null, {expires: new Date(Date.now()),httpOnly: true,}).json({message:"user is Logout"});
}

