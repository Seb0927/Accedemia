import Image from "next/image";

import { cn } from "@/utils/cn";

interface LogoProps {
  className?: string;
}

function Logo({ className }: Readonly<LogoProps>) {
  return (
    <div className={cn("relative object-contain", className)}>
      <Image
        src='/images/light-logotype.png'
        alt='Accedemia Logo'
        className='block object-contain dark:hidden'
        loading="eager"
        fill
      />
      <Image
        src='/images/dark-logotype.png'
        alt='Accedemia Logo'
        className='hidden object-contain dark:block'
        loading="eager"
        fill
      />
    </div>
  );
}

export default Logo;