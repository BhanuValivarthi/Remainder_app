import axios from "axios";

const API = axios.create({
  baseURL : "http://localhost:8000",
  withCredentials: true,
});

//user API

export const registeruser = (userData) => API.post("/user/register",userData);

export const loginuser = (userData) =>API.post("/user/login",userData);

export const logoutuser = ()=>API.get("/user/logout");


//remainder API

export const createRemainder = (remainderData,userId) => API.post(`/${userId}/createRemainder`,remainderData);

export const deleteRemainder = (userId,taskId)=> API.get(`/${userId}/deleteRemainder/${taskId}`);

export const getallRemainders = (userId)=>API.get(`/${userId}/getallRemainders`);
