import React from 'react'
import Navbar from './Navbar.jsx'

const Background = (props) => {
  
  const { children } = props;

  return (
    <>
      {/* Background */}
      <div className='bg-background absolute min-h-screen h-screen w-screen flex flex-col overflow-hidden'>

        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <div className='h-screen w-screen px-6 py-6'>
          {children}
        </div>
      </div>
    </>
  )
}

export default Background