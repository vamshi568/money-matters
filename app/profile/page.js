"use client";
import { fetchDataFromApi } from "@/components/apis";
import Headbar from "@/components/headbar";
import { Circleloading } from "@/components/loaders";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userProfile, setUserprofile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30,
    occupation: "Software Engineer",
  });
  const [isLoading,setIsloading] = useState(false)

  const getDate = async () => {
    setIsloading(true)

    const data = await fetchDataFromApi("profile", "GET");
    setUserprofile({ ...data.users[0] });
    setIsloading(false)

  };
  useEffect(() => {
    getDate();
  }, []);
  return (
    <div className="w-full h-screen overflow-hidden">
            <Circleloading open={isLoading}/>

      <Headbar name="Profile" />
      <div className="bg-[#F5F7FA] px-10 py-8 h-full dark:bg-slate-900">
        <div className="bg-white flex justify-around rounded-[25px] py-12 mt-8 dark:bg-slate-800">
          <AccountCircleIcon className="text-9xl dark:text-slate-100" />

          <form>
            <div className="mb-4 flex flex-col">
              <label className=" font-medium text-[#505887] dark:text-white mb-[11px]">
                Your Name
              </label>
              <div
               
                className="text-[#718EBF] bg-white dark:bg-slate-800 dark:text-slate-200 rounded-2xl border-[#DFEAF2] border-[1px] px-5 py-4 w-[418px] h-[50px] cursor-not-allowed"
              >{userProfile.name}</div>
            </div>
            <div className="mb-4 flex flex-col">
              <label className=" font-medium text-[#505887] dark:text-white mb-[11px]">
                Email
              </label>
              <div
             
                className="text-[#718EBF] bg-white dark:bg-slate-800 dark:text-slate-200 rounded-2xl border-[#DFEAF2] border-[1px] px-5 py-4 w-[418px] h-[50px] cursor-not-allowed"
              >{userProfile.email}</div>
            </div>
            <div className="mb-4 flex flex-col">
              <label className=" font-medium text-[#505887] dark:text-white mb-[11px]">
                Date of Birth
              </label>
              <div
                className="text-[#718EBF] bg-white dark:bg-slate-800 dark:text-slate-200 rounded-2xl border-[#DFEAF2] border-[1px] px-5 py-4 w-[418px] h-[50px] cursor-not-allowed"
              >                {userProfile.date_of_birth!==null?userProfile.date_of_birth:""}
              </div>
            </div>
            <div className="mb-4 flex flex-col">
              <label className=" font-medium text-[#505887] dark:text-white mb-[11px]">
                Permanent Address
              </label>
              <div
         
                className="text-[#718EBF] bg-white dark:bg-slate-800 dark:text-slate-200 rounded-2xl border-[#DFEAF2] border-[1px] px-5 py-4 w-[418px] h-[50px] cursor-not-allowed"
              >{userProfile.permanent_address!==null ? userProfile.permanent_address:''}</div>
            </div>
            <div className="mb-4 flex flex-col">
              <label className=" font-medium text-[#505887] dark:text-white mb-[11px]">
                Postal Code
              </label>
              <div
             
                className="text-[#718EBF] bg-white dark:bg-slate-800 dark:text-slate-200 rounded-2xl  border-[#DFEAF2] border-[1px] px-5 py-4 w-[418px] h-[50px] cursor-not-allowed"
              >{userProfile.postal_code!==null?userProfile.postal_code:''}</div>
            </div>
          </form>
          <form>
            <div className="mb-4 flex flex-col">
              <label className=" font-medium text-[#505887]  dark:text-white mb-[11px]">
                User Name
              </label>
              <div
             
                className="text-[#718EBF] bg-white dark:bg-slate-800 dark:text-slate-200 rounded-2xl border-[#DFEAF2] border-[1px] px-5 py-4 w-[418px] h-[50px] cursor-not-allowed"
              >{userProfile.email!==null?userProfile.email:''}</div>
            </div>
            <div className="mb-4 flex flex-col">
              <label className=" font-medium text-[#505887] dark:text-white mb-[11px]">
                Password
              </label>
              <div

               
                className="text-[#718EBF] bg-white dark:bg-slate-800 dark:text-slate-200 rounded-2xl border-[#DFEAF2] border-[1px] px-5 py-4 w-[418px] h-[50px] cursor-not-allowed"
              >*********</div>
            </div>
            <div className="mb-4 flex flex-col">
              <label className=" font-medium text-[#505887] dark:text-white mb-[11px]">
                Present Address
              </label>
              <div
             
                className="text-[#718EBF] bg-white dark:bg-slate-800 dark:text-slate-200 rounded-2xl border-[#DFEAF2] border-[1px] px-5 py-4 w-[418px] h-[50px] cursor-not-allowed"
              >{userProfile.present_address!==null ? userProfile.present_address:''}</div>
            </div>
            <div className="mb-4 flex flex-col">
              <label className=" font-medium text-[#505887] dark:text-white mb-[11px]">
                City
              </label>
              <div
            
                className="text-[#718EBF] bg-white dark:bg-slate-800 dark:text-slate-200 rounded-2xl border-[#DFEAF2] border-[1px] px-5 py-4 w-[418px] h-[50px] cursor-not-allowed"
              >{userProfile.city!==null?userProfile.city:""}</div>
            </div>
            <div className="mb-4 flex flex-col">
              <label className=" font-medium text-[#505887] dark:text-white mb-[11px]">
                Country
              </label>
              <div
             
                className="text-[#718EBF] bg-white dark:bg-slate-800 dark:text-slate-200 rounded-2xl border-[#DFEAF2] border-[1px] px-5 py-4 w-[418px] h-[50px] cursor-not-allowed"
              >{userProfile.country!=null?userProfile.country:''}</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
