"use client"
import React, { useState } from "react";
import "./page.css";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { fetchDataFromApi, loginData } from "@/components/apis";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Login = () => {
  const [showPassword,setShowPassword] =useState(false)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)
  const route=useRouter()
  const fetchdata=async(e)=>{
    e.preventDefault();
    setLoading(true)
    setError("")
    var body=JSON.stringify({email: email, password: password})
    const res=await loginData('get-user-id',body,email.includes('admin')?'admin':null)
    if (res !==null){
      if (res.get_user_id.length>0){

        Cookies.set("user-id",res.get_user_id[0].id)
        route.replace('/')

      }else{
        setError('Invalid')}
      
    }else{
      setError('Server error')
    }
    setLoading(false)
    
  }
if (Cookies.get("user-id")!==undefined){
  route.push('/')
}
  return (
    <div className="h-screen dark:bg-[#23242a] w-screen flex justify-center items-center">
      <div className="card overflow-hidden relative flex flex-col w-[380px] h-[440px] bg-slate-200 dark:bg-[#1c1c1c] rounded-[8px]">
        <span className="different"></span>
        <form onSubmit={fetchdata} className="absolute inset-1 bg-slate-100 dark:bg-[#222] px-12 py-10 flex z-10 flex-col">
          <div className="flex gap-4 self-center mb-3">
            <img src="logo.svg" className="h-[38px] w-[44px]" />
            <h1 className="text-3xl text-[#02969C] font-extrabold font-[Poppins]">
              <span className=" text-[#F89A23] ">Money</span> Matters
            </h1>
          </div>
          <div className="relative w-full mt-8 mb-8">
            <input
              className="username relative w-full px-2 py-2 bg-transparent outline-none shadow-none text-white dark:text-[#23242a] transition-[0.5s] text-base z-10 border-none"
              type="email"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <span className="absolute left-0 p-[20px 0px 10px] pointer-events-none text-[#8f8f8f] transition-[0.5s] text-base">
              Username
            </span>
            <i className="absolute left-0 bottom-0 w-full h-1 bg-[#23242a] dark:bg-white rounded-md overflow-hidden pointer-events-none "></i>
          </div>
          <div className="relative w-full mt-8 mb-4">
           

            <input
              className="username relative w-full px-2 py-2 bg-transparent outline-none shadow-none text-white dark:text-[#23242a] transition-[0.5s] text-base z-10 border-none"
              type={`${showPassword?'text':'password'}`}
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              />
              
              
            <span className="absolute w-full left-0 p-[20px 0px 10px] text-[#8f8f8f] transition-[0.5s] text-base">
              Password <span onClick={()=>setShowPassword(!showPassword)} className="hidden showed w-5 z-20 absolute cursor-pointer pointer-events-auto right-0">{!showPassword?<VisibilityOffOutlinedIcon/>:<VisibilityOutlinedIcon/>}</span>
            </span>
            <i className="absolute left-0 bottom-0 w-full h-1 bg-[#23242a] dark:bg-white rounded-md overflow-hidden pointer-events-none "></i>
          </div>
          
          {error==='Invalid'?<p className="text-red-400 mt-3 text-center">*Username or Password is incorrect</p>:error==='Server error'?<p className="text-red-400 mt-3 text-center">Something went wrong</p>:null}
          {loading?<div className='self-center'>

          </div>:
          <button type="submit" className="mt-8 self-center rounded-lg w-32 h-10 bg-[#23242a] text-white dark:text-black  dark:bg-white">
            Login
          </button>
          }

        </form>
      </div>
    </div>
  );
};

export default Login;
