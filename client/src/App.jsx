import {BrowserRouter as Router,Routes,Route, BrowserRouter} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashBoard from "./pages/DashBoard";
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";

function App() {
  

  return (
    <>
      
       <Router>
          <Routes>
             <Route path="/" element={<Home/>}/>
             <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
             <Route path="/dashboard" element={<DashBoard/>}/>
              <Route path="/createtask" element={<CreateTask/>}/>
          </Routes>
        </Router> 
     
    </>
  )
}

export default App
