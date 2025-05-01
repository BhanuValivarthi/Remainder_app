if(process.env.NODE_ENV != "production"){
  require('dotenv').config({path:"../.env"});
}

const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const path = require("path");
const user = require("./routes/userRouter.js");
const remainder = require("./routes/remainderRouter.js")
const mongoose = require("mongoose");
const cors = require("cors");
const ExpressError = require("./utils/expressError.js");

const dbUrl = process.env.MONGODB_URL;

require("./sechdule.js");



const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};


app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended:true}));


main()
.then(() => console.log("connected to DB"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}


app.use("/user",user);
app.use("/:userId",remainder);


// app.all("*",(req,res,next)=>{
//      next(new ExpressError(404,"Page Not Found"));
// })

app.use((err,req,res,next)=>{
   let {statusCode=500,message="some thing went wrong"} = err;
   console.log(err);
   res.status(statusCode).json({success: false, message});
})


app.listen(port,()=>{
  console.log(`app is listening ${port}`);
})