const cron = require('node-cron');
const Remainder = require("./models/remainder");
const User = require("./models/user");
const sendWhatsAppTemplate = require("./config/sendToWsp");
const sendEmail = require("./config/sendEmail");

const task = async ()=>{
  console.log("welcome");
  const remainders = await Remainder.find({});
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;
  
  const neededRemainders = remainders.filter((remainder)=>{
    return currentTime === remainder.time;
  })
  console.log(neededRemainders);
  for(const remainder of neededRemainders){
    await remainder.populate("user");
    let email = remainder.user.email;
    let phoneNum = remainder.user.phoneNum;

    try{
     
      if(remainder.sendType === "Both" || remainder.sendType === "Email"){
      await sendEmail(email,"Alert!",remainder.message);
    }
    
    if(remainder.sendType === "Both" || remainder.sendType === "Whatsapp"){
     await sendWhatsAppTemplate(phoneNum,currentTime,remainder.message);
    }
  }
  catch(err){
    console.log("Error is ,",err);
  }
  }
}

cron.schedule('* * * * *',task);