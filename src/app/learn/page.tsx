import Card from "@/components/card";
import LessonContent from "@/features/learn/components/lesson-content";
import Navigator from "@/features/learn/components/navigator";
import WebContainer from "@/features/learn/components/web-container";
import CodeEditor from "@/features/learn/components/code-editor";

export default function Page() {
  return (
    <>
      <Navigator />
      {/* 56px (Header) + 44px (Navigator) = 100px */}
      <div className={`
        flex max-h-[calc(100vh-100px)] w-full grow flex-row gap-2 p-4
      `}>
        <Card className="bg-base-100 h-full max-w-1/3 flex-1">
          <LessonContent />
        </Card>
        <Card className="bg-base-100 h-full max-w-1/3 flex-1">
          <CodeEditor />
        </Card>
        <Card className="bg-base-100 h-full max-w-1/3 flex-1">
          <WebContainer />
        </Card>
      </div>
    </>
  );
}