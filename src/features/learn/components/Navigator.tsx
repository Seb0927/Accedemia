import { Menu } from "lucide-react";
import Breadcrumbs from "@/features/learn/components/Breadcrumbs"

function Navigator() {
  return (
    <div className="navbar min-h-11 bg-base-100 shadow-sm px-3 py-1">
      <input id="lessons-drawer" className="drawer-toggle" type="checkbox" />
      <label className="btn p-2 btn-sm drawer-button" htmlFor="lessons-drawer">
        <Menu className="size-4" />
      </label>
      <Breadcrumbs />
    </div>
  )
}

export default Navigator;