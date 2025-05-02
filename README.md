This is a full-stack MERN reminder application built using React, Node.js, Express, and MongoDB.

Users can create tasks and set a specific time for reminders. At the scheduled time, the app sends reminder messages through Email (using Nodemailer) and WhatsApp (using Twilio). We used node-cron to check tasks every minute.

Technologies used:
     Frontend: React
     Backend: Node.js, Express
     Database: MongoDB
     Email: Nodemailer (npm i nodemailer)
     WhatsApp: Twilio (npm i twilio)
     Scheduler: Node-cron (npm i node-cron)

Environment Variables:
     MONGODB_URL
     TWILIO_SSID
     TWILIO_AUTH

👉 Live Demo: https://ornate-stardust-ea347c.netlify.app

