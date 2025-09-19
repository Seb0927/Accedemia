import { Menu } from "lucide-react";
import Breadcrumbs from "@/features/learn/components/breadcrumbs";

function Navigator() {
  return (
    <div className="navbar flex min-h-11 gap-2 bg-base-100 px-3 py-1 shadow-sm">
      <input id="lessons-drawer" className="drawer-toggle" type="checkbox" />
      <label className="drawer-button btn p-2 btn-sm" htmlFor="lessons-drawer">
        <Menu className="size-4" />
      </label>
      <Breadcrumbs />
    </div>
  );
}

export default Navigator;