import { useEffect, useState } from "react";
import axios from "axios";
import gethealth from "../fetch";
import { useNavigate } from "react-router-dom";
const Home=()=>{
    let navigate=useNavigate();
    const [val,setVal]=useState("");
    const [click,setClick]=useState(false);
    const [data,setData]=useState({
        id:"",
    });
    const [updatedata,setUpdatedata]=useState("");
    useEffect(()=>{
        gethealth().then((data:any)=>{
            if(data[0])
            {
                // navigate(`/user?id=${data[1]}`);
            }
            else{
                navigate('/signin');
            }
        })
    },[])
    const Debounce=async (e:any)=>{
            setUpdatedata(e.target.value);
    }
    const [isclicked,setIsclicked]=useState(false);
    console.log("hh",data);
    useEffect(()=>{
        if(click)
        {
            try{
                axios.post("http://localhost:3000/forms/api/formdata",{
                    id:val
                }).then((result:any)=>{                 
                    try{
                    console.log("gdgd",result);
                    if(result.data.result){
                        setData(result.data.result);
                    setUpdatedata(result.data.result.value);
                    setClick(false);
                    }
                    else{
                        alert("checking");
                        setData({id:""});
                    }
                    }
                    catch(err)
                    {
                        console.error(err);
                        alert("no form with given unique number");
                    }
                })
            }
            catch(err)
            {
                console.log(err);
            }
        }
    },[click])
    useEffect(()=>{
        if(isclicked)
        {
            try{
                axios.put("http://localhost:3000/forms/api/form",{
                    object:{
                        value:updatedata,
                        id:data.id
                    }
                }).then((result:object)=>{
                    console.log("result: ",result);
                    setIsclicked(false);
                })
            }
            catch(err)
            {
                console.log(err);
            }
        }

    },[isclicked])
    return (    
        <div>
            <div onClick={()=>{navigate('/user')}} className="flex justify-left m-2">
                <div className="text-center text-white rounded bg-black px-4 cursor-pointer">
                    <p>back</p>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="border-[1px] p-2 ">
                <input onChange={(e)=>(setVal(e.target.value))} className="border-[1px] my-2 px-2 " type="text" placeholder="enter id" />
                <div onClick={()=>(setClick(true))} className="cursor-pointer rounded text-center bg-black text-white px-2 ">
                    <p>submit</p>
                </div>
                </div>
            </div>
            <div className="flex justify-center mt-4">
               <div>
               <textarea  onChange={(e)=>{
                Debounce(e)
               }} value={updatedata} className="border-[1px] border-black rounded p-2 w-[800px] h-[200px] ">
               </textarea>
              <div className="flex gap-4">
              <div onClick={()=>(setIsclicked(true))} className="cursor-pointer rounded text-center bg-green-400 text-white px-2 ">
                    <p>save</p>
               </div>
               <div onClick={()=>(setClick(true))} className="cursor-pointer rounded text-center bg-blue-400 text-white px-2 ">
                    <p>Refresh</p>
               </div>
              </div>
               </div>
            </div>
        </div>
    )
}
export default Home;