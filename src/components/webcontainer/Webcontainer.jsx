import React, { useEffect, useState } from 'react';
import { setupWebContainer } from '../../../utils/webcontainer';
import Code from './Code';
import Page from './Page';

const Webcontainer = () => {
  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    const initializeWebContainer = async () => {
      const url = await setupWebContainer();
      setIframeSrc(url);
    };

    initializeWebContainer();
  }, []);

  return (
    <>
      <Code />
      <Page iframeSrc={iframeSrc}/>
    </>
  )
}

export default Webcontainer