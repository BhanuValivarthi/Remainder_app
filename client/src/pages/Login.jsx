import { loginuser } from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Login = ()=>{ 
     let [form,setForm] = useState({email:"",password:""});
     const [error,setError] = useState(" ");
     const navigate = useNavigate();
     
    const handleLogin = async (e)=>{
       e.preventDefault();
      
       const {email,password} = form;
      
        if(!email.trim() || !password.trim()){
            setError('Plese enter Email and Password');
            return;
        } 
          try{
            setError('');
            const res = await loginuser(form);
            localStorage.setItem("userId",res.data.user._id);
            setForm({email:"",password:""});
             navigate("/dashboard");
           }
        
        catch(err){
           setError(err.response?.data?.message || "Login failed. Please try again.");
        }
       
    }
  return(
    <>
    <div className="wrapper signUp">
    <div className="form">
       <div className="heading">PLEASE LOGIN</div>
     <form onSubmit={handleLogin} >
           <div>
            <label htmlFor="email">E-Mail</label>
            <input type="text" id="email" placeholder="Enter your mail" value={form.email} onChange={(e) =>setForm({...form,email:e.target.value})} />
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
           {error && <p style={{color:"red"}}>{error}</p>}
           <button type="submit">Login</button>
     </form>
        </div>
      </div>
    </>
  )
}

export default Login;

