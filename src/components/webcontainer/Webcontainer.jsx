import React, { useEffect, useState } from 'react';
import { setupWebContainer } from '../../../utils/webcontainer';
import Code from './Code';
import Page from './Page';

const Webcontainer = () => {
  const [iframeSrc, setIframeSrc] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Ctrl + K + C
  // useEffect(() => {
  //   const initializeWebContainer = async () => {
  //     const url = await setupWebContainer();
  //     setIframeSrc(url);
  //   };

  //   initializeWebContainer();
  // }, []);

  return (
    <>
      <Code selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
      { /* <Page iframeSrc={iframeSrc}/> */}
    </>
  )
}

export default Webcontainer