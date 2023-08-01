import React, { useEffect, useState } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonIcon from "@mui/icons-material/Person";
import "../app/globals.css";
import { fetchDataFromApi } from "./apis";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Backdrop from "@mui/material/Backdrop";
import { Circleloading } from "./loaders";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("");
  const [isLoading,setIsloading] = useState(false)

  const path=usePathname()
  
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const getProfile = async () => {
    setIsloading(true)

    const res = await fetchDataFromApi("profile", "GET");
    setProfile({ name: res.users[0].name, email: res.users[0].email });
    setIsloading(false)

  };
  const logout = () => {
    Cookies.remove("user-id");
    router.replace("/login");
  };
  useEffect(()=>{
    if (path==='/'){
      setActiveTab('dashboard')
    }else if(path==='/profile'){
      setActiveTab('profile')
    }else if(path==='/transactions'){
      setActiveTab('transactions')
    }
  },[path])

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div className="w-[298px] bg-white">
            <Circleloading open={isLoading}/>

    <div className="w-[250px] fixed bg-white min-h-screen h-auto flex justify-between flex-col dark:bg-slate-800 border-r-[1px] border-[#E2E2E2] items-center">
      <div className="w-full ">
        <div className="flex items-center justify-center gap-3 mt-[31px] w-[209px] h-[38px] mb-[45px]">
          <img src="logo.svg" className="h-[38px] w-[44px]" />
          <h1 className="text-xl text-[#02969C] font-extrabold">
            <span className=" text-[#F89A23] ">Money</span> Matters
          </h1>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Link
            href={"/"}
            className={`flex text-lg h-[60px] w-full dark:text-white text-[#505887] cursor-pointer font-medium gap-4 items-center ${
              activeTab === "dashboard" ? "active" : ""
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <HomeRoundedIcon className="ml-11" />
            <p>Dashboard</p>
          </Link>
          <Link
            href={"/transactions"}
            className={`flex text-lg h-[60px] w-full dark:text-white text-[#505887] cursor-pointer font-medium gap-4 items-center ${
              activeTab === "transactions" ? "active" : ""
            }`}
            onClick={() => setActiveTab("transactions")}
          >
            <ReceiptLongIcon className="ml-11" />
            <p>Transactions</p>
          </Link>
          <Link
            href={"/profile"}
            className={`flex text-lg h-[60px] w-full dark:text-white text-[#505887] cursor-pointer font-medium gap-4 items-center ${
              activeTab === "profile" ? "active" : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <PersonIcon className="ml-11" />
            <p>Profile</p>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 h-[96px] gap-2 border-t-2 w-full">
        <AccountCircleIcon className="text-5xl dark:text-slate-100" />
        <Link href={'/profile'}>
          <p className="text-[#505887] dark:text-slate-200 text-sm font-semibold">
            {profile.name}
          </p>
          <p className="text-[#718EBF] dark:text-slate-400 text-sm font-normal">
            {profile.email}
          </p>
        </Link>
        <button onClick={() => setOpen(true)} className="self-start">
          <LogoutIcon className="text-2xl dark:text-slate-100" />
        </button>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={() => setOpen(false)}
        >
          <div className="flex gap-8  bg-white dark:bg-slate-800 h-[188px] w-[591px] rounded-2xl px-6 py-8">
            <div className="w-[64px] flex justify-center items-center h-[64px]  rounded-full bg-[#FEF3C7] dark:bg-[#668e91]">
              <LogoutIcon className=" text-xl p-2 text-[#D97706] dark:text-slate-300 w-[48px] h-[48px] rounded-full dark:bg-[#02969C] bg-[#FDE68A]" />
            </div>
            <div>
              <h2 className="text-[#333B69] text-xl font-bold dark:text-slate-50">
                Are you sure you want to Logout?
              </h2>
              <p className="text-[#505887] dark:text-slate-200">
                Lorem amet, consectetur adipiscing elit, sed
              </p>

              <button
                className="bg-[#DC2626] mr-4 mt-8 rounded-lg px-4 py-2 text-white"
                onClick={logout}
              >
                Yes, Logout
              </button>
              <button
                className="border-[#CBD5E1] border-[2px] rounded-lg px-4 py-2 text-[#333B69] dark:text-slate-50"
                onClick={() => setOpen(true)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Backdrop>
      </div>
    </div>
    </div>

  );
};

export default Navbar;
