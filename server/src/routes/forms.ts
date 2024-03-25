import express from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
const frouter=express.Router();
import middleauth from "../middleware";
//create a new form
frouter.post('/form',middleauth,async(req:any,res:any)=>{
    let obj=req.body.object;
    try{
        let result = await prisma.forms.create({
            data:{
               value:obj.value,
                userid:parseInt(obj.id)
            }
        });
        res.json({msg:`form created successfully with id: ${result.id} `,result:result});
    }
    catch(err)
    {
        console.log(err);
        res.json({msg:"error at server"});
    }
});
//update a particular form
frouter.put('/form',async(req:any,res:any)=>{
    let obj=req.body.object;
    try {
        let result=await prisma.forms.update({
            data:{
                value:obj.value
            },
            where:{
              id:obj.id
            }
        });
        res.json({msg:"updated successfully",result:result});
      }
      catch(err)
      {
        console.log(err);
        res.json({msg:"error at server"})

      }
});
//get the particular form data
frouter.post('/formdata',async(req:any,res:any)=>{
    let id=parseInt(req.body.id); 
    try{
        let result=await prisma.forms.findFirst({
            where:{
                id:id
            }
        });
        res.json({msg:"fetched sucessfully",result:result});
    }
    catch(err)
    {
        console.log(err);
        res.json({msg:"error at server"});
        }
});
// gets all forms of user
frouter.get('/userform',middleauth,async(req:any,res:any)=>{

    try{
        let result=await prisma.forms.findMany({
            where:{
                userid:req.id
            }
        });
        res.json({msg:"fetched successfully",result:result});
    }
    catch(err)
    {
        console.log(err);
        res.json({msg:"error at server"});
        }
})
export default frouter;