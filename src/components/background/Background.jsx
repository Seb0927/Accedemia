import React from 'react'
import Navbar from './Navbar.jsx'

const Background = (props) => {
  
  const { children } = props;

  return (
    <>
      {/* Background */}
      <div className='bg-background absolute min-h-screen w-full'>
        {/* Navbar */}
        <Navbar />

        {children}
      </div>
    </>
  )
}

export default Background