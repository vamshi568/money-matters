"use client";
import { fetchDataFromApi } from "@/components/apis";
import BarChart from "@/components/barchart";
import Headbar from "@/components/headbar";
import Lasttransaction from "@/components/lasttrans";
import { Circleloading } from "@/components/loaders";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Admin = () => {
  const [credit, setCredit] = useState(0);
  const [debit, setDebit] = useState(0);
  const [isLoading,setIsloading] = useState(false)
  const router = useRouter();
  const fetchData = async () => {
    setIsloading(true)

    const data = await fetchDataFromApi(
      "transaction-totals-admin",
      "GET"
    );
    setCredit(
      data.transaction_totals_admin[data.transaction_totals_admin.length - 1]
        .sum
    );
    setDebit(data.transaction_totals_admin[0].sum);
    setIsloading(false)

  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full min-h-screen h-auto bg-[#F5F7FA] dark:bg-slate-900">
      <Circleloading open={isLoading}/>
        <Headbar name="Account" />

        <div className="dark:text-white flex gap-6 px-10">
          <div className="flex justify-between bg-white w-[50%] dark:bg-slate-800 mt-[24px]">
            <div className="px-[36px] py-[25px]">
              <h1 className="text-[#16DBAA] text-3xl mb-[7px] font-semibold">
                ${credit.toLocaleString()}
              </h1>
              <p className="text-[#718EBF] dark:text-slate-100">Credit</p>
            </div>
            <img src="credit.svg" />
          </div>
          <div className="flex justify-between bg-white w-[50%] dark:bg-slate-800 mt-6">
            <div className="px-[36px] py-[25px]">
              <h1 className="text-[#FE5C73] text-3xl mb-[7px] font-semibold">
                ${debit.toLocaleString()}
              </h1>
              <p className="text-[#718EBF] dark:text-slate-100">Debit</p>
            </div>
            <img src="debit.svg" />
          </div>
        </div>
        <Lasttransaction/>
        <BarChart/>
        
      </div>
  )
}

export default Admin