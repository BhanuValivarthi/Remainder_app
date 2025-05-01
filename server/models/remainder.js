const mongoose = require("mongoose");


const remainderSchema = new mongoose.Schema({
      message:{
        type:String,
        required:true
      },
      time:{
          type:String,
          required:true,
      },
      sendType:
      {
        type:String,
        enum : ["Whatsapp","Email","Both"],
        default:"Email",
       
      },
      user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
      },
})

module.exports = mongoose.model("Remainder",remainderSchema);