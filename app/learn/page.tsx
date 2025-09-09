import Card from "@/components/Card";
import LessonContent from "@/features/learn/components/LessonContent";
import Navigator from "@/features/learn/components/Navigator";
import WebContainer from "@/features/learn/components/WebContainer";
import CodeEditor from "@/features/learn/components/CodeEditor";

export default function Page() {
  return (
    <>
      <Navigator />
      {/* 56px (Header) + 44px (Navigator) = 100px */}
      <div className={`
        flex max-h-[calc(100vh-100px)] w-full grow flex-row gap-2 p-4
      `}>
        <Card className="h-full max-w-1/3 flex-1 bg-base-100">
          <LessonContent />
        </Card>
        <Card className="h-full max-w-1/3 flex-1 bg-base-100">
          <CodeEditor />
        </Card>
        <Card className="h-full max-w-1/3 flex-1 bg-base-100">
          <WebContainer />
        </Card>
      </div>
    </>
  );
}