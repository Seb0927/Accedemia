interface DrawerItem {
  id: string,
  title: string,
  onClick: () => void,
}

function DrawerItem({id, title, onClick }: DrawerItem) {
  return (
    <li>
      <button 
        className="flex items-center"
        onClick={onClick}
      >
        <div>
          <span className="font-bold">{id}:&nbsp;</span>
          <span>{title}</span>
        </div>
      </button>
    </li>
  )
}

export default DrawerItem