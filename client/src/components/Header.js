import { Button, Dropdown } from "./Button";

function Header(props) {
  return (
    <header className="container flex flex-col max-w-5xl py-4 mx-auto sm:flex-row">
      <div className="flex-1">
        <h1 className=" font-black text-7xl">{props.pageName}</h1>
      </div>
      <div className="flex flex-1 sm:justify-end">
        <Button btnName="Click Me" />
        <Dropdown options={["English", "Spanish"]} />
      </div>
    </header>
  );
}

export default Header;