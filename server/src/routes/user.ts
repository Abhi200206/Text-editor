import express from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import { validation } from "../zod/schema";
import jwt from 'jsonwebtoken';
export const Jwtpass="10992777"
const router=express.Router();
import middleauth from "../middleware";
router.get('/health',middleauth,(req:any,res:any)=>{
    res.json({bool:true,id:req.id});
})
router.post('/signup',async(req:any,res:any)=>{
    let obj=req.body.value;
    let value=validation(obj);
    console.log("obj: ",obj);
    console.log(value," value")
    if(value)
    {
        try{
           let result=await prisma.user.create({
                data:{
                    email:obj.email,
                    password:obj.password
                },
                select:{
                    id:true,
                    email:true
                }   
            });
            let token=jwt.sign({username:obj.email,id:result.id},Jwtpass);
            res.json({msg:"all ok",result:result,bool:true,token:token});
        }
        catch(err)
        {
            console.log("error: ",err);
            res.json({msg:"error at server"});
        }
    }
    else{
        res.json({msg:"error at server"});
    }
    
});
router.post('/signin',async(req:any,res:any)=>{
    let obj=req.body.value;
    console.log(obj);
    let value=validation(obj);
    if(value)
    {
        try{
            let result=await prisma.user.findFirst({
                where:{
                    email:obj.email,
                    password:obj.password
                }
            });
            if(result)
            {
                let token=jwt.sign({username:obj.email,id:result.id},Jwtpass);
                res.json({msg:"all ok",result:result,bool:true,token:token});
            }
            else{
                res.json({msg:"no user found",result:result,bool:false});
            }
        }
        catch(err)
        {
            console.log("error: ",err);
            res.json({msg:"error at server",bool:false});
        }
    }
    else{
        res.json({msg:"error at server",bool:false});
    }
});
export default router;