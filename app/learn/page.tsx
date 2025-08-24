import Card from "@/components/Card";
import Navigator from "@/features/learn/components/Navigator";

export default function Page() {
  return (
    <>
      <Navigator />
      <div className="grow w-full flex flex-row gap-2 p-4">
        <Card className="h-full bg-base-100 flex-1">
          <p>Hola :D</p>
        </Card>
        <Card className="h-full bg-base-100 flex-1">
          <p>Hola :D</p>
        </Card>
        <Card className="h-full bg-base-100 flex-1">
          <p>Hola :D</p>
        </Card>
      </div>
    </>
  );
}