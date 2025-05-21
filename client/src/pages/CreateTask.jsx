import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRemainder } from "../services/api";
import dashboardImg  from "../assets/task.png"

const CreateTask = ()=>{
     let navigate = useNavigate();
     let [form,setForm] = useState({time:"",message:"",sendType:"Email"});
     let userId = localStorage.getItem("userId");

     const handleSubmit = async (e)=>{
        e.preventDefault();
        let res = await createRemainder(form,userId);
        localStorage.setItem("taskId",res.data.task._id);
        setForm({time:"",message:"",sendType:""});
        navigate("/dashboard"); 
     }
  return(
    <>
        <div
             style={{
               backgroundImage: `url(${dashboardImg})`, 
               backgroundSize: "cover",
               backgroundPosition: "center",
               minHeight: "99.5vh",
               minWidth:"99.5vw" 
             }}
             className="dashboard"
           > 
       <div className="wrapper signUp">
          <div className="form">
              <div className="heading" style={{color:"#dd3675"}}>CREATE A ALERT MESSAGE</div>
                 <form onSubmit={handleSubmit}>
                   <div>
                      <label htmlFor="message">Message</label>
                      <input type="text" 
                           id="message" 
                           placeholder="Enter the Message" 
                           value={form.message} 
                           onChange={(e) =>setForm({...form,message:e.target.value})}/>
                              
                    </div>
                    <div>
                       <label htmlFor="time">Time</label>
                       <input type="text" 
                              id="time" 
                              placeholder="Enter in this 05:00 Format" 
                              value={form.time} 
                              onChange={(e) =>setForm({...form,time:e.target.value})} />
                    </div>
                     <div 
                        className="options" 
                        style={{height:"40px",width:"100px",margin:"30px 0px 40px 0px"}}>
                      <label htmlFor="sendtype">Send-Type</label>
                      <select id="sendtype" 
                          onChange={(e)=>setForm({...form,sendType:e.target.value})} >
                        <option value="Email">Email</option>
                        <option value="Whatsapp" >Whatsapp</option>
                        <option value="Both">Both</option>
                     </select>
                    </div>
                    <p style={{color:"red"}}>Note: To receive WhatsApp messages, send </p>
                    <p style={{color:"red"}}>"join ago-over" to +1 (415) 523-8886 every 24 hours.</p>
                    <button type="submit" style={{width:"150px"}}>Submit</button>
                  </form>
             </div>
          </div>
          </div>
        </>
  )
}

export default CreateTask;