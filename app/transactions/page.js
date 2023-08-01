'use client'
import Alltransition from '@/components/alltrans'
import Headbar from '@/components/headbar'
import React, { useState } from 'react'


const Transactions = () => {
  const [options,setOptions] = useState('All Transactions')
  const page=()=>{
    switch (options) {
      case 'All Transactions':
        return <Alltransition />
        break;
      case 'Debit':
        return <Alltransition type='debit'/>
        break;
      case 'Credit':
        return <Alltransition type='credit'/>
        break;
    
      default:
        break;
    }
  }
  return (
    <div className='w-full min-h-screen h-auto  dark:bg-slate-900'><Headbar name='Transactions'/>
    <div className='flex text-[#718EBF]  dark:text-white gap-8 py-6 px-10'>
      <p className={`${options==='All Transactions'?'activetag':''} cursor-pointer py-2 px-3`} onClick={()=>setOptions('All Transactions')}>All Transactions</p>
      <p className={`${options==='Debit'?'activetag':''} cursor-pointer py-2 px-3`} onClick={()=>setOptions('Debit')}>Debit</p>
      <p className={`${options==='Credit'?'activetag':''} cursor-pointer py-2 px-3`} onClick={()=>setOptions('Credit')}>Credit</p>
      </div>
      
      {page()}
    </div>
  )
}

export default Transactions