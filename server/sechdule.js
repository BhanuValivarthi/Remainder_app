const cron = require('node-cron');
const Remainder = require("./models/remainder");
const User = require("./models/user");
const sendWhatsAppTemplate = require("./config/sendToWsp");
const sendEmail = require("./config/sendEmail");

const task = async ()=>{

  const remainders = await Remainder.find({});
  const now = new Date();
  const istNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const hours = istNow.getHours().toString().padStart(2, '0');
  const minutes = istNow.getMinutes().toString().padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;
  
  const neededRemainders = remainders.filter((remainder)=>{

    return currentTime === remainder.time.trim();

  })
  
  for(const remainder of neededRemainders){
    await remainder.populate("user");
    let email = remainder.user.email;
    let phoneNum = remainder.user.phoneNum;

    
     
      if(remainder.sendType === "Both" || remainder.sendType === "Email"){
      await sendEmail(email,"Alert!",remainder.message);
    }
    
    if(remainder.sendType === "Both" || remainder.sendType === "Whatsapp"){
     await sendWhatsAppTemplate(phoneNum,currentTime,remainder.message);
    }
  
  
  }
}

cron.schedule('* * * * *',task);