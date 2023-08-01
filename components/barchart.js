import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { fetchDataFromApi } from './apis';
import { Circleloading } from './loaders';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    fullSize: true,
  },
};

const labels = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];



function App() {
  const [datac,setData]=useState([])
  const [datad,setDatad]=useState([])
  const [isLoading,setIsloading] = useState(false)

  const getdata=async()=>{
    setIsloading(true)

    const res=await fetchDataFromApi('daywise-totals-7-days','GET')
      
      let debit=[]
      let credit=[]
      for (let i of res.last_7_days_transactions_credit_debit_totals){
        if (i.type==='debit'){
            debit.push(i.sum)
          }
          else{
            credit.push(i.sum)
          }
        }
        setData(credit)
        setDatad(debit)
        setIsloading(false)

      
  }
  const data = {
    labels,
    datasets: [
      {
        label: 'Debit',
        data: datad,
        backgroundColor: '#4D78FF',
        borderRadius: 10,
      },
      {
        label: 'Credit',
        data: datac,
        backgroundColor: '#FCAA0B',
        borderRadius: 10,
       
        
      },
    ],
  };
useEffect(()=>{
getdata()
},[])


  return (
    <>  
                <Circleloading open={isLoading}/>

      <h1 className='text-[#333B69] dark:text-slate-100 text-2xl font-bold px-10 py-7'>Debit & Credit Overview</h1>
    <div className='px-10 py-7 h-[364px] flex justify-center'>
    <Bar options={options} data={data} />;
      </div>
    </>

  )
  
}

export default App;
