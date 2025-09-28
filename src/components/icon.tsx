import Image from "next/image";

import { cn } from "@/utils/cn";

interface IconProps {
  className?: string;
}

function Icon({ className }: Readonly<IconProps>) {
  return (
    <div className={cn("relative object-contain", className)}>
      <Image
        src="/images/light-logo.png"
        alt="Accedemia Icon"
        className={`
          block object-contain
          dark:hidden
        `}
        loading="eager"
        fill
      />
      <Image
        src="/images/dark-logo.png"
        alt="Accedemia Icon"
        className={`
          hidden object-contain
          dark:block
        `}
        loading="eager"
        fill
      />
    </div>
  );
}

export default Icon;