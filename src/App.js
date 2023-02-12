import { Route, Routes } from "react-router-dom";
import "./App.css";
import Coin from "./components/Coin";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <div className="bg-[#14161a] text-white min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<Coin />} />
      </Routes>
    </div>
  );
}

export default App;
