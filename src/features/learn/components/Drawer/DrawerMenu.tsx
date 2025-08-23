interface DrawerMenuInterface {
  title: string;
  children: React.ReactNode
}

function DrawerMenu({ title, children }: DrawerMenuInterface) {
  return (
    <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
      <input type="checkbox" />
      <h2 className="collapse-title text-lg font-semibold border-base-300">
        {title}
      </h2>
      <div className="-mt-2 collapse-content">
        {children}
      </div>
    </div>
  )
}

export default DrawerMenu;