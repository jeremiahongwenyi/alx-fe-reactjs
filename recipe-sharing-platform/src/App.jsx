import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button className="bg-blue-500 p-8 text-white m-7 max-w-sm mx-auto">
        Click Me Here
      </button>
    </>
  );
}

export default App;
