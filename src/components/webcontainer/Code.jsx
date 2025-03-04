import { React, useState, useEffect} from 'react'
import Directory from './Directory'
import { writeIndexJS } from '../../../utils/webcontainer';

const Code = () => {
  const [code, setCode] = useState("import Blob from './Blob.jsx'\r\nimport Navbar from './Navbar.jsx'\r\n\r\nconst Background = (props) => {\r\n\r\n  const { children, sections, currentSection, setCurrentSection } = props;\r\n  \r\n  const handleSection = (section) => {\r\n    if (section !== undefined) {\r\n      let indexSection = sections.indexOf(section)\r\n      setCurrentSection(sections[indexSection])\r\n    }\r\n  }\r\n\r\n  return (\r\n    <>\r\n      {/* Background */}\r\n      <div className='bg-blue-lightest absolute min-h-screen w-full -z-50'>\r\n        {/* Blob */}\r\n        <div className='absolute -z-40 -left-0 top-0 -translate-y-1/4 -translate-x-1/2'>\r\n          <Blob />\r\n        </div>\r\n\r\n        {/* Navbar */}\r\n        <Navbar />\r\n        \r\n        { children }\r\n      </div>\r\n    </>\r\n  )\r\n  \r\n}\r\n\r\nexport default Background")

  useEffect(() => {
    writeIndexJS(code)
  }, [code])


  return (
    <div className='h-full w-[30%] bg-gray-dark border border-black flex flex-col-reverse p-2'>
      <Directory />
      <textarea 
        className='h-full w-full text-black'
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
    </div>
  )
}

export default Code