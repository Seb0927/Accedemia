import React from 'react'

const Background = (props) => {
  
  const { children } = props;

  return (
    <>
      {/* Background */}
      <div className='fixed inset-0 bg-background'>
        {children}
      </div>
    </>
  )
}

export default Background