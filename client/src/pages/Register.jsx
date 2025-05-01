import {  useState } from "react";
import { registeruser } from "../services/api";
import { useNavigate,Link } from "react-router-dom";
import "./register.css"


const Register = ()=>{
   let [form,setForm] = useState({userName:"",email:"",password:"",phoneNum:""});
    const navigate = useNavigate();
   const handleSignup = async (e)=>{
      e.preventDefault();
      try{
         const res = await registeruser(form);
         console.log("User created sucessfully",res);
         localStorage.setItem("userId",res.data.user._id);
         navigate("/dashboard");
      }
      catch(e){
        console.log("Error in sign up is",e.message);
      }
   } 
  return(
    <>
      <div className="wrapper signUp">
      <div className="form">
        <div className="heading">CREATE AN ACCOUNT</div>
        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor="name">UserName</label>
            <input type="text" id="name" placeholder="Enter your name" value={form.userName} onChange={(e)    =>setForm({...form,userName:e.target.value})}/>
          </div>
          <div>
            <label htmlFor="email">E-Mail</label>
            <input type="text" id="email" placeholder="Enter your mail" value={form.email} onChange={(e) =>setForm({...form,email:e.target.value})} />
          </div>
          <div>
            <label htmlFor="phoneNum">Phone-Number</label>
            <input type="text" id="phoneNum" placeholder="Enter your PhoneNumber" value={form.phoneNum} onChange={(e) =>setForm({...form,phoneNum:e.target.value})}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter you password"
              value={form.password} onChange={(e) =>setForm({...form,password:e.target.value})}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Register;