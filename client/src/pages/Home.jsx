  
import dashboarImg from "../assets/Home3.png"
import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import "./Home.css"

const Home = ()=>{
   const navigate = useNavigate();
  return(
    <>
      <div
      style={{
        backgroundImage: `url(${dashboarImg})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "99.5vh",
        minWidth:"99.5vw" 
      }}
      className="dashboard"
    >  
      <Button variant="contained" id="button" onClick={()=>navigate("/login")}>Login</Button>
      <Button variant="contained" id="button" onClick={()=>navigate("/register")}>SignUp</Button>
  </div>
    </>
  )
}

export default Home;