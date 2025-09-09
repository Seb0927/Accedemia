import { Menu } from "lucide-react";
import Breadcrumbs from "@/features/learn/components/Breadcrumbs";

function Navigator() {
  return (
    <div className="navbar bg-base-100 flex min-h-11 gap-2 px-3 py-1 shadow-sm">
      <input id="lessons-drawer" className="drawer-toggle" type="checkbox" />
      <label className="btn btn-sm drawer-button p-2" htmlFor="lessons-drawer">
        <Menu className="size-4" />
      </label>
      <Breadcrumbs />
    </div>
  );
}

export default Navigator;