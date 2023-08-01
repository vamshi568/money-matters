'use client'
import React from 'react'
import { MaterialUISwitch } from '@/components/loaders'
import Navbar from '@/components/navbar'
import { usePathname } from 'next/navigation'
import { useState } from 'react'



const Main = ({children}) => {
    const [mode,setMode]=useState(false)
    const params=usePathname()
  
  return (
    <div className={`${mode?'dark':null} flex`}>
    
          {params!=='/login'?<Navbar/>:null}
        {children}
          
        <button onClick={()=>setMode(!mode)} className=' fixed left-5 bottom-28'>
          <MaterialUISwitch/>
        </button>
        </div>
  )
}

export default Main