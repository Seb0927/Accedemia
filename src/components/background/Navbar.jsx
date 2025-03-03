import React from 'react'
import menuSvg from '../../assets/vectors/menu.svg'
import accesibilityPng from '../../assets/images/accesibility.png'

const Navbar = (props) => {

  const { setSidebar } = props

  return (
    <nav className='bg-gray-medium h-16 w-full border-b border-black'>
      <div className='flex items-center h-16 px-6 py-3'>
        {/* Menu */}
        <button onClick={() => setSidebar(true)} className='h-3/5'>
          <img src={menuSvg} alt='Menú de lecciones' className='h-full'/>
        </button>

        {/* Title */} 
        <div className='absolute left-1/2 -translate-x-1/2 flex space-x-2'>
          <h1 className='text-2xl font-bold'>ACCEDEMIA</h1>
          <img src={accesibilityPng} alt='Logo de accesibilidad' className='h-8'></img>
        </div>
      </div>
    </nav>
  )
}

export default Navbar