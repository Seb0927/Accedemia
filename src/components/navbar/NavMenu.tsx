import Link from "next/link";

function NavMenu() {
  return (
    <ul
      tabIndex={0}
      className="menu menu-sm md:menu-md dropdown-content bg-base-100 rounded-box z-1 mt-4 w-52 p-2 shadow">
      <li><Link href='/about'>Nosotros</Link></li>
      <li><Link href='/'>Lecciones</Link></li>
      <li><Link href='/credits'>Créditos</Link></li>
    </ul>
  );
}

export default NavMenu;