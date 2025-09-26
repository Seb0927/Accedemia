import Card from "@/components/card";
import LessonContent from "@/features/learn/components/lesson-content";
import Navigator from "@/features/learn/components/navigator";
import WebContainer from "@/features/learn/components/webcontainer";
import CodeEditor from "@/features/learn/components/code-editor";

export default function Page() {
  return (
    <>
      <div className="flex h-full min-h-0 w-full flex-col">
        <Navigator />
        <div className="flex flex-1 min-h-0 flex-row gap-2 p-4">
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
      </div>
    </>
  );
}