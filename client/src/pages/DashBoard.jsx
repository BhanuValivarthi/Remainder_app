import { useEffect,useState } from "react";
import React from "react";
import { getallRemainders } from "../services/api";
import { useNavigate } from "react-router-dom";
import handleDelete from "./DeleteTask";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import SnackbarContent from '@mui/material/SnackbarContent';
import dashboardImg from "../assets/dashboard.jpg"

const DashBoard =  ()=>{
  const navigate = useNavigate();
  const [remainders,setRemainders] = useState([]);
  let userId = localStorage.getItem("userId");
    const handleCreate = () =>{
        navigate("/createtask")
    }
    
    const fetchRemainders = async()=>{
      let res = await getallRemainders(userId);
      
      setRemainders(res.data.remainders);
    }

    useEffect(()=>{
      fetchRemainders();
    },[userId]);


    const re = remainders.map((rem) =>
          <li key={rem._id} > 
            {rem.message} 
            <button 
              onClick={()=>handleDelete(userId,rem._id,fetchRemainders)}>
                Delete</button>
          </li>
          
   );

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
    <Stack sx={{ width: '100%' }} spacing={2} style={{ marginTop: "100px" }}>
      {remainders.map((rem) => (
          < SnackbarContent  message={`${rem.message}  @${rem.time}`}
              action={<ClearIcon  onClick={()=>handleDelete(userId,rem._id,fetchRemainders)} 
              style={{cursor:"pointer"}} />} />
    ))}
    </Stack>

      <div style={{margin:"50px 0px 20px 0px", display:"flex",justifyContent:"center"}}>
        <Button variant="contained" color="success" onClick={handleCreate} style={{marginRight:"570px"}}>CREATE</Button>
      </div> 
      </div>
    </>
   
  )
}

export default DashBoard;