"use client";
import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import { fetchDataFromApi } from "./apis";
import { Circleloading } from "./loaders";

const Headbar = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [profilename,setName]=useState('')
  const [profiletype,settype]=useState('')
  const [profileamount,setamount]=useState(0)
  const [profileDate,setDate]=useState('')
  const [isLoading,setIsloading] = useState(false)


  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const submitForm = async(e) => {
    e.preventDefault();
    setIsloading(true)

    const body={
      "name": profilename,
      "type": profiletype,
      "category": selectedCategory,
      "amount": profileamount,
      "date": profileDate,
      "user_id": Cookies.get('user-id')
  }
  
  const res=await fetchDataFromApi('add-transaction','POST', body)
    setOpen(false);
    setIsloading(false)

    window.location.reload();
  };
  const categories = [
    "Groceries",
    "Dining",
    "Transportation",
    "Entertainment",
    "Utilities",
  ];
  return (
    <div className="flex justify-between items-center bg-white dark:bg-slate-900 w-full border-b-[1px] border-[#E2E2E2] px-10 py-6">
                  <Circleloading open={isLoading}/>

      <h1 className="text-[#343C6A] text-3xl font-semibold dark:text-slate-100">
        {props.name}
      </h1>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#2D60FF] rounded-xl px-3 py-2 text-white"
      >
        + Add Transaction
      </button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <div className="relative text-black flex gap-8  dark:bg-slate-800 bg-white h-[700px] w-[466px] rounded-2xl px-6 py-8">
          <span
            className="absolute right-6 cursor-pointer dark:text-slate-100 top-6 z-10"
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </span>
          <div>
            <h2 className="text-[#333B69] text-xl font-bold dark:text-slate-50">
              Add Transaction
            </h2>
            <p className="text-[#505887] dark:text-slate-200">
              Lorem amet, consectetur adipiscing elit, sed
            </p>
            <form onSubmit={submitForm} className="mt-6">
              <div className="mb-4 flex flex-col">
                <label className=" font-medium text-[#505887] dark:text-slate-100 mb-[11px]">
                  Transaction Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="text-[#718EBF] bg-white rounded-2xl dark:bg-slate-800 dark:text-white border-[#DFEAF2] border-[1px] px-5 py-4 w-[418px] h-[50px]"
                  value={profilename}
                  onChange={(e)=>setName(e.target.value)}
                 
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label
                  htmlFor="dropdown"
                  className=" font-medium text-[#505887] dark:text-slate-100 mb-[11px]"
                >
                  Transaction Type
                </label>

                <select
                  id="dropdown"
                  className="text-[#718EBF] bg-white rounded-2xl dark:bg-slate-800 dark:text-white border-[#DFEAF2] border-[1px] px-4 py-3 w-[418px] h-[50px]"
                  value={profiletype}
                  onChange={(e)=>settype(e.target.value)}
                >
                  {" "}
                  <option value="" disabled >
                    Select Transaction Type
                  </option>
                  <option value="Credit">Credit</option>
                  <option value="Debit">Debit</option>
                </select>
              </div>
              <div className="mb-4 flex flex-col">
                <label
                  htmlFor="category"
                  className=" font-medium text-[#505887] dark:text-slate-100 mb-[11px]"
                >
                  Category
                </label>{" "}
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="text-[#718EBF] bg-white rounded-2xl dark:bg-slate-800 dark:text-white border-[#DFEAF2] border-[1px] px-4 py-3 w-[418px] h-[50px]"
                >
                  <option value="" disabled >
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4 flex flex-col">
                <label className=" font-medium text-[#505887] dark:text-slate-100 mb-[11px]">
                  Amount
                </label>
                <input
                  type="number"
                  placeholder="Enter Your Amount"
                  className="text-[#718EBF] bg-white rounded-2xl dark:bg-slate-800 dark:text-white border-[#DFEAF2] border-[1px] px-5 py-4 w-[418px] h-[50px]"
                  value={profileamount}
                  onChange={(e)=>setamount(e.target.value)}
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label className=" font-medium text-[#505887] dark:text-slate-100 mb-[11px]">
                  Date
                </label>
                <input
                  type="date"
                  placeholder="Enter Name"
                  className="text-[#718EBF] bg-white rounded-2xl dark:bg-slate-800 dark:text-white border-[#DFEAF2] border-[1px] px-5 py-4 w-[418px] h-[50px]"
                  value={profileDate}
                  onChange={(e)=>setDate(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-[#2D60FF] mr-4 mt-4 rounded-lg px-4 py-2 text-white w-full"
              >
                Add Transaction
              </button>
            </form>
          </div>
        </div>
      </Backdrop>
    </div>
  );
};

export default Headbar;
