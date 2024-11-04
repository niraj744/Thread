import Card from "./Card";

export default function RightsideBar() {
  return (
    <>
      <div className="hidden lg:flex w-[22rem] bg-secondary p-4 sticky capitalize h-[90vh] flex-col justify-between">
        <div>
          <h1 className="font-bold text-lg">suggested communities</h1>
          <ul className="flex flex-col gap-2">
            <li>
              <Card />
            </li>
            <li>
              <Card />
            </li>
            <li>
              <Card />
            </li>
          </ul>
        </div>
        <div>
          <h1 className="font-bold text-lg">similar minds</h1>
          <ul className="flex flex-col gap-2">
            <li>
              <Card />
            </li>
            <li>
              <Card />
            </li>
            <li>
              <Card />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
