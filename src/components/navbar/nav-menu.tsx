import Link from "next/link";

function NavMenu() {
  return (
    <ul
      tabIndex={0}
      className={`
        dropdown-content menu menu-sm rounded-box bg-base-100
        md:menu-md
        z-1 mt-4 w-52 p-2 shadow
      `}>
      <li><Link href='/about'>Nosotros</Link></li>
      <li><Link href='/'>Lecciones</Link></li>
      <li><Link href='/credits'>Créditos</Link></li>
    </ul>
  );
}

export default NavMenu;