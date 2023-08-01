import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { fetchDataFromApi } from "./apis";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import Backdrop from "@mui/material/Backdrop";
import LogoutIcon from "@mui/icons-material/Logout";
import Dropdown from "./dropdown";
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import Cookies from "js-cookie";
import { Circleloading } from "./loaders";

const Lasttransaction = () => {
  const [transaction, setTransaction] = useState([]);
  const [open,setOpen] = useState(false);
  const [userid,setuserid]=useState(null)
  const [totaldata,settotaldata]=useState(null)
  const [drop,setdrop]=useState(false)
  const [admin,setAdmin] = useState(false)
  const [profile,setprofile]=useState(null)
  const [isLoading,setIsloading] = useState(false)

  const getdata = async () => {
    setIsloading(true)

    if (Cookies.get('user-id')==='3'){
      setAdmin(true)
      const res1 = await fetchDataFromApi('profile','GET')
  setprofile(res1.users)
    }
    const res = await fetchDataFromApi(
      "all-transactions?limit=3&offset=0",
      "GET"
    );

    setTransaction(res.transactions);
    setIsloading(false)

  };
  const logout = async() => {
    const body={'id': userid}
    const res=await fetchDataFromApi('delete-transaction','DELETE',body);
    setOpen(false);
    window.location.reload();
  };
  const deleteid=(id)=>{
    setOpen(true)
    setuserid(id)
  }
  const editid=(transaction)=>{
    setdrop(true)
    settotaldata(transaction)
  }
  const getName=(id)=>{
    const res=profile.filter(profile => profile.id === id )
    return res[0].name
  }
  useEffect(() => {
    getdata();
  }, []);
  
  return (
    <div className="w-full px-10 mt-6 ">
                  <Circleloading open={isLoading}/>

      <h2 className="text-[#333B69] text-2xl font-semibold dark:text-white ">Last Transaction</h2>
      <div className=" bg-white mt-5 dark:bg-slate-800">

      {transaction.map((transaction) => (
        <div key={transaction.id} className={`px-6 text-[#505887] grid ${admin?'grid-cols-[auto,1fr,1fr,1fr,1fr,1fr]': 'grid-cols-[auto,1fr,1fr,1fr,1fr,auto]'} dark:text-white py-3 border-[#E2E2E2] border-b-[1px] gap-4 `}>
          <img
            src={
              transaction.type === "debit" ?  "debitlogo.svg":"cridite.svg"
            }
          />
         {admin&& <div className="flex gap-2 w-24">
         <AccountCircleIcon/>
         <p>{getName(transaction.user_id)}</p>
         </div>}
          <p className=" text-base font-medium">{transaction.transaction_name}</p>
          <p className="text-base font-normal">{transaction.category}</p>
          <p className="text-base font-normal">{format(new Date(transaction.date), "dd MMM yyyy, hh.mm a")}</p>
          <p
            className={
              `${transaction.type === "debit" ? "text-[#FE5C73]" : "text-[#16DBAA]"} font-medium ${admin?'text-right':'text-left'}`
            }
          >
            {transaction.type === "debit" ? "-" : "+"}$
            {transaction.amount.toLocaleString()}
          </p>
          {!admin&&<div>
          <button onClick={()=>editid(transaction)} className="text-[#2D60FF]"><ModeEditOutlineOutlinedIcon/></button>
          <button onClick={()=>deleteid(transaction.id)} className="text-[#FE5C73]"><DeleteOutlineRoundedIcon/></button>
            </div>}
        </div>
      ))}
      <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={() => setOpen(false)}
        >
          <div className="flex gap-8 dark:bg-slate-800 bg-white h-[188px] w-[591px] rounded-2xl px-6 py-8">
            <div className="w-[64px] flex justify-center items-center h-[64px] rounded-full bg-[#FEF3C7] dark:bg-[#668e91]">
              <WarningAmberRoundedIcon className=" text-xl p-2 dark:bg-[#02969C] text-[#D97706] w-[48px] h-[48px] rounded-full bg-[#FDE68A]" />
            </div>
            <div>
              <h2 className="text-[#333B69] text-xl font-bold dark:text-slate-50">
                Are you sure you want to Delete?
              </h2>
              <p className="text-[#505887] text-sm">
                This transaction will be deleted immediately. You can't undo this action.
              </p>

              <button
                className="bg-[#DC2626] mr-4 mt-4 rounded-lg dark:text-slate-200 px-4 py-2 text-white"
                onClick={logout}
              >
                Yes, Delete
              </button>
              <button
                className="border-[#CBD5E1] border-[2px] rounded-lg px-4 py-2 text-[#333B69] dark:text-slate-50"
                onClick={() => setOpen(true)}
              >
                No, Leave it
              </button>
            </div>
          </div>
        </Backdrop>
            </div>
        {drop?<Dropdown id={totaldata.id} body={totaldata} handelchange={()=>setdrop(false)} open={drop}/>:null}

    </div>
  );
};

export default Lasttransaction;
