import { Menu } from "lucide-react";
import NavMenu from "@/components/navbar/nav-menu";
import Logo from "@/components/logo";

function Navbar() {
  return (
    <div className="z-1 navbar min-h-14 bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn px-2 btn-ghost">
            <Menu />
          </div>
          <NavMenu />
        </div>
      </div>
      <div className="navbar-center">
        <Logo className={`
          h-6 w-64
          md:h-7
        `} />
      </div>
      <div className="navbar-end">
      </div>
    </div>
  );
}

export default Navbar;