import React from 'react'

const Page = (props) => {

  const { iframeSrc } = props;

  return (
    <div className='h-full w-[45%] bg-gray-dark border border-black'>
      {/* <iframe src={iframeSrc} className='h-full w-full'></iframe> */}
    </div>
  )
}

export default Page