import Card from "@/components/card";
import LessonContent from "@/features/learn/components/lesson-content";
import Navigator from "@/features/learn/components/navigator";
import WebContainer from "@/features/learn/components/webcontainer";
import CodeEditor from "@/features/learn/components/code-editor";

export default function Page() {
  return (
    <>
      <div className="flex size-full min-h-0 flex-col">
        <Navigator />
        <div className={`
          flex min-h-0 flex-1 flex-col gap-2 p-4
          lg:flex-row
        `}>
          <Card className={`
            bg-base-100 h-96 overflow-auto
            lg:h-full lg:max-w-1/3 lg:flex-1
          `}>
            <LessonContent />
          </Card>
          <Card className={`
            bg-base-100 h-96
            lg:h-full lg:max-w-1/3 lg:flex-1
          `}>
            <CodeEditor />
          </Card>
          <Card className={`
            bg-base-100 h-96 min-h-96
            lg:h-full lg:max-w-1/3 lg:flex-1
          `}>
            <WebContainer />
          </Card>
        </div>
      </div>
    </>
  );
}