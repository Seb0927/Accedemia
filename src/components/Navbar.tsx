import Link from "next/link";
import { Menu } from "lucide-react";
import Logo from "@/components/Logo";

function Navbar() {
  return (
    <div className="navbar min-h-14 bg-base-100 shadow-sm z-1">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <Menu />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm md:menu-md dropdown-content bg-base-100 rounded-box z-1 mt-4 w-52 p-2 shadow">
            <li><Link href='/about'>Nosotros</Link></li>
            <li><Link href='/'>Lecciones</Link></li>
            <li><Link href='/credits'>Créditos</Link></li>
          </ul>
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