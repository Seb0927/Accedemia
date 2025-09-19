import { ReactNode } from "react";
import LessonDrawer from "@/features/learn/components/lesson-drawer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-full">
      <div className="drawer h-full">
        <input id="lessons-drawer" className="drawer-toggle" type="checkbox" />

        {/* Main Content */}
        <div className="drawer-content flex flex-col">
          {children}
        </div>

        {/* Drawer Content - Client Component */}
        <LessonDrawer />
      </div>
    </div>
  );
}