import React from "react";

interface TestProps {
  children: React.ReactNode
}

function Test({ children }: TestProps) {
  return (
    <div className='bg-black opacity-50'>
      {children}
    </div>
  );
}

export default Test;