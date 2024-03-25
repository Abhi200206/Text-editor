import jwt from "jsonwebtoken";
import { Jwtpass } from "./routes/user";
const middleauth=async(req:any,res:any,next:any)=>{
    let token =req.headers.token;
    console.log("token: ",token);
    try{
        let value:any=jwt.verify(token,Jwtpass);
        console.log(value);
        req.id=value.id;
        next()
    }
    catch(err)
    {
        console.log(err);
        res.json({msg:"error at server",bool:false});
    }

}
export default middleauth;