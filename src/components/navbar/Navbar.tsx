import { Menu } from "lucide-react";
import NavMenu from "@/components/Navbar/NavMenu";
import Logo from "@/components/Logo";

function Navbar() {
  return (
    <div className="navbar bg-base-100 z-1 min-h-14 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost px-2">
            <Menu />
          </div>
          <NavMenu />
        </div>
      </div>
      <div className="navbar-center">
        <Logo className='h-6 w-64 md:h-7' />
      </div>
      <div className="navbar-end">
      </div>
    </div>
  );
}

export default Navbar;