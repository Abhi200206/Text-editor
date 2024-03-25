import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import gethealth from "../fetch";
const Signin= ()=>{
    let navigate=useNavigate();
    const [value,setValue]=useState({
        email:"",
        password:""
    });
    const [click,setClick]=useState(false);
    const [data,setData]=useState({
        bool:false,
        click:false
    }); 
    useEffect(()=>{
        gethealth().then((data:any)=>{
            if(data[0])
            {
                navigate(`/user?id=${data[1]}`);
            }
            else{
                navigate('/signin');
            }
        })
    },[])
    useEffect(()=>{
       if(click)
       {
        try{
            axios.post("http://localhost:3000/user/api/signin",{
                value:value
            }).then((result)=>{
                setData((v)=>({...v,bool:result.data.bool,click:true}));
                setTimeout(()=>{
                    setData((v)=>({...v,click:false}));
                    if(result.data.bool)
                    {
                        localStorage.setItem("token",result.data.token);
                        navigate(`/user?id=${result.data.result.id}`);
                    }
                },2000)
                setClick(false);
            })
        }
        catch(err)
        {
            console.log(err);
        }
       }
       },[click])
    const setval=(e:any)=>{
        setValue((v)=>{
            return{
                ...v,
                [e.target.name]:e.target.value
            }
        })
    }
    const send=()=>{
     setClick(true)
    }
    return(
        <div>
            <div className="flex justify-center m-4">
                {data.click && <div className="px-4 text-red-500 py-2 absolute bottom-[10px] bg-slate-200 ">
                        <p>{data.bool? "signin sucessfull Rerouting...":"user not found or incorrect input type provided"}</p>
                </div>}
             <div className="border-[1px] border-black p-2 rounded ">
                <p className=" text-center text-[20px] font-black">Signin</p>
             <input onChange={setval} className="border-[1px] px-2 my-2" type="text" name="email" placeholder="enter email id" />
                <br />
                <input onChange={setval} className="border-[1px] px-2 my-2" type="text" name="password" placeholder="enter password" />
                <br />
                <div onClick={send} className="bg-black px-4 rounded text-white cursor-pointer">
                    <p className="text-center">Signin</p>
                </div>
                <div className="flex gap-2 mt-2">
                    <p>new user </p><div ><p onClick={()=>(navigate('/signup'))} className="underline cursor-pointer">signup</p></div>
                </div>
             </div>

            </div>
        </div>
    )
};
export default Signin;