import express from "express";
import jwt from 'jsonwebtoken';
import router from "./routes/user";
import cors from 'cors';
import frouter from "./routes/forms";
const port:number=3000;
const app=express();
app.use(express.json());
app.use(cors());
app.use('/forms/api',frouter);
app.use('/user/api/',router);
app.listen(port,()=>{
    console.log("server running on port:"+port);
});