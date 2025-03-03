import React from 'react'
import { useState } from 'react'
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'

const Background = (props) => {

  const { children } = props;

  const [sidebar, setSidebar] = useState(false)
  console.log(sidebar)

  return (
    <>
      {/* Background */}
      <div className='bg-background absolute min-h-screen h-screen w-screen flex flex-col overflow-hidden'>

        {/* Navbar */}
        <Navbar setSidebar={setSidebar}/>

        {/* Content */}
        <div className='h-screen w-screen px-6 py-6'>
          {children}
        </div>
      </div>

      {sidebar && <div onClick={() => setSidebar(false)} className='bg-black absolute min-h-screen w-screen opacity-50'></div>}

      {/* Sidebar */}
      {sidebar && <Sidebar setSidebar={setSidebar}/>}
    </>
  )
}

export default Background