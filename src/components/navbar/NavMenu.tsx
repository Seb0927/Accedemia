import Link from "next/link";

function NavMenu() {
  return (
    <ul
      tabIndex={0}
      className={`
        dropdown-content menu z-1 mt-4 w-52 menu-sm rounded-box bg-base-100 p-2
        shadow
        md:menu-md
      `}>
      <li><Link href='/about'>Nosotros</Link></li>
      <li><Link href='/'>Lecciones</Link></li>
      <li><Link href='/credits'>Créditos</Link></li>
    </ul>
  );
}

export default NavMenu;