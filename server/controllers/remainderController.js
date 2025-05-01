const User = require("../models/user");
const Remainder = require("../models/remainder");

exports.createAlert = async(req,res)=>{
  

     let {message,time,sendType} = req.body;
     let {userId} = req.params;

     const user = await User.findById(userId);
     const task = new Remainder({
       message,
       time,
       sendType:sendType,
       user:userId
     })

     user.remainder.push(task);
     await task.save();
     await user.save();

    res.status(200).json({sucess:true,task,userId});
}

exports.deleteAlert = async(req,res)=>{
   
       let {userId,taskId} = req.params;
      await User.findByIdAndUpdate(userId,{$pull : {remainder:taskId}});
      await Remainder.findByIdAndDelete(taskId);
       
      res.status(200).json({sucess:true,message:"Alert is deleted"});
      
}

exports.getallRemainders = async(req,res)=>{
       
  let {userId} = req.params;
  const user = await User.findById(userId).populate("remainder");
 
  res.status(200).json({sucess:true,user,remainders:user.remainder});
}