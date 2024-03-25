import { useNavigate, useSearchParams } from "react-router-dom";
import gethealth from "../fetch";
import { useEffect, useState } from "react";
import axios from "axios";
const User = () => {
    const navigate=useNavigate();
    const [forms,setforms]=useState([]);
    const [send,setSend]=useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const userid = searchParams.get('id');
    const logout=()=>{
        localStorage.removeItem('token');
        navigate('/signin');
    }
    useEffect(()=>{
        axios.get("http://localhost:3000/forms/api/userform",{
            headers:{
                token:localStorage.getItem("token")
            }
        }).then((result)=>{
            setforms(result.data.result);
        })
    },[])
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
    },[]);
    useEffect(()=>{
       if(send)
       {
        try{
            axios.post("http://localhost:3000/forms/api/form", {
                object: {
                    value: "hello welcome to texteditor",
                    id: userid
                }
            }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            }).then((result)=>{
                console.log(result.data);
                alert(result.data.msg+" enter the id in the editor box to retrive the data");
                setSend(false);
                navigate('/home')
            })
        }
        catch(err)
        {
            console.log(err);
        }
       }
    },[send])
    let arr=forms.map((m:any)=>{
        return (
            <div key={m.id} className=" rounded border-[1px] p-2 ">
               <div> <p>Id:{m.id}</p></div>
            </div>
        )
    })
    return (
        <div className="p-2">
            <div className="flex justify-between">
                <div className="bg-gradient-to-r from-blue-500 to-red-500 px-2 rounded"><p className="text-[20px] font-black ">TextEditor</p></div>
                <div onClick={logout} className="text-center text-white rounded bg-black px-4 cursor-pointer"><p>Logout</p></div>
                
            </div>
            <div className="md:flex md:justify-evenly mt-4">
                <div className="mt-6">
                   <p className="text-[20px] font-black ">Create a new form editor</p> 
                   <div>
                    <div onClick={()=>{setSend(true)}} className="rounded cursor-pointer py-1 bg-black text-center text-white my-2">
                        <p>Create new form</p>
                    </div>
                   </div>
                   
                </div>
                <div>
                   <p className="text-[20px] font-black ">Welcome To Editor!!!</p>
                   <p className="text-[16px] ">if you alreay have your unique id use the below button to navigate to the editor !!!</p>
                    <div onClick={()=>(navigate('/home'))} className="rounded cursor-pointer py-1 bg-black text-center text-white my-4">
                        <p>Use Editor</p>
                    </div>
                </div>

            </div>
            <div>
                   <div className="mt-2">
                    <p className="text-[20px] font-black ">Your Form ids</p>
                   </div>
                   {arr}
                   </div>   
        </div>
    )
};
export default User;