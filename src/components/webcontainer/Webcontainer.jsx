import React, { useEffect, useState } from 'react';
import { setupWebContainer, readFileFromWebContainer } from '../../../utils/webcontainer';
import Code from './Code';
import Page from './Page';

const Webcontainer = () => {
  const [iframeSrc, setIframeSrc] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeWebContainer = async () => {
      try {
        setIsLoading(true);
        const url = await setupWebContainer();
        setIframeSrc(url);
      } catch (error) {
        console.error("Error initializing WebContainer:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeWebContainer();
  }, []);

  return (
    <>
      <Code selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
      {!isLoading && <Page iframeSrc={iframeSrc} />}
      {isLoading && <div className="flex items-center justify-center h-full w-[45%] bg-gray-dark border border-black">
        <p className="text-black">Loading WebContainer...</p>
      </div>}
    </>
  )
}

export default Webcontainer