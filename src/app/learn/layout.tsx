import { ReactNode } from "react";
import LessonDrawer from "@/features/learn/components/lesson-drawer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="drawer flex flex-1 flex-col min-h-0 w-full">
      <input id="lessons-drawer" className="drawer-toggle" type="checkbox" />

      {/* Main Content */}
      <div className="drawer-content min-h-0 w-full flex-1 overflow-hidden">
        {children}
      </div>

      {/* Drawer Content - Client Component */}
      <LessonDrawer />
    </div>
  );
}