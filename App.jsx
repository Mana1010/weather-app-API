import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Beshy from "./Beshy";
import Home from "./projects/Home";
import Header from "./projects/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
