interface DrawerMenuInterface {
  title: string;
  children: React.ReactNode
}

function DrawerMenu({ title, children }: DrawerMenuInterface) {
  return (
    <div className="collapse-arrow border-base-300 bg-base-100 collapse border">
      <input type="checkbox" />
      <h2 className="collapse-title border-base-300 text-lg font-semibold">
        {title}
      </h2>
      <div className="collapse-content -mt-2">
        {children}
      </div>
    </div>
  );
}

export default DrawerMenu;