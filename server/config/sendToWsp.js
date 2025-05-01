require('dotenv').config({path:"../.env"})


const twilio = require("twilio"); 

const accountSid = process.env.TWILIO_SSID;
const authToken =process.env.TWILIO_AUTH;
const client = twilio(accountSid, authToken);

async function sendWhatsAppTemplate(phoneNum,time, message) {
  try{
  const response = await client.messages.create({
    from: 'whatsapp:+14155238886',
    to: `whatsapp:+91${phoneNum}`,
    contentSid:'HX9dcf8597af7f8310833881e67d36d68a',
    contentVariables:JSON.stringify({
      "1":time,
      "2":message,
    }),
  });
  console.log('Sent:', response.body);
}
catch(er){
  console.log("Error in",er);
}
  }
module.exports = sendWhatsAppTemplate;