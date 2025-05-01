const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true
    },
    phoneNum:{
      type:Number,
      required:true
    },
    password:{
      type:String,
      required:true
    },
    remainder:[
      {
      type:mongoose.Schema.ObjectId,
      ref:"Remainder",
      default:[]
    }
  ]
})

module.exports = mongoose.model("User",userSchema);

