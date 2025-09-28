import Link from "next/link";

function NavMenu() {
  return (
    <ul
      tabIndex={0}
      className={`
        dropdown-content menu menu-md rounded-box bg-base-100 z-1 mt-4 w-52 p-2
        shadow
      `}>
      <li><Link href='/about'>Acerca de</Link></li>
      <li><Link href='/'>Lecciones</Link></li>
      <li><Link href='/attributions'>Atribuciones</Link></li>
    </ul>
  );
}

export default NavMenu;