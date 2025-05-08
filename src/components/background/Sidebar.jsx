import React from 'react'

const sidebar = (props) => {

  const { setSidebar } = props;
  const lessons = Array.from({ length: 31 }, (_, i) => `LECCIÓN ${i + 1}`);

  return (
    <div className='fixed top-0 left-0 h-full w-1/2 md:w-1/3 lg:w-1/4 bg-gray-dark overflow-auto'>
      <ul className=''>
        <li className='flex items-center h-16 border border-black hover:bg-gray-600 hover:text-slate-100'>
          <button onClick={() => setSidebar(false)} className='h-full w-full text-left text-xl font-semibold font-mono px-4'>
            {"Volver atrás"}
          </button>
        </li>
        {lessons.map((lesson, index) => (
          <li key={index} className='flex items-center h-16 border-x border-b border-black hover:bg-gray-600 hover:text-slate-100'>
            <button className='h-full w-full text-left  text-xl font-semibold font-mono px-4'>
            {lesson}
          </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default sidebar