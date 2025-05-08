import Directory from './Directory'

const Code = (props) => {

  const { selectedFile, setSelectedFile } = props;

  return (
    <div className='h-full w-[30%] bg-gray-dark border border-black flex flex-col-reverse p-2'>
      <Directory selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
    </div>
  )
}

export default Code