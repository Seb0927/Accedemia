import React from 'react'
import Background from './components/background'
import Lesson from './components/lesson'
import Webcontainer from './components/webcontainer'

const App = () => {
  return (
    <Background>
      <div className='h-full flex flex-row space-x-5'>
        <Lesson />
        <Webcontainer />
      </div>
    </Background>
  )
}

export default App