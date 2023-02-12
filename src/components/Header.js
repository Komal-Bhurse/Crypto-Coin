import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
// import Crypto from CryptoContext component
import { Crypto } from "../context_api/CryptoContext.js";

function Header() {
  const { setCurrency } = useContext(Crypto);

  return (
    <nav className=" bg-stone-800 static drop-shadow-xl">
      <div className="container  mx-auto py-3 flex justify-between">
        <div>
          <Link to="/">
            <span className="font-montserrat font-bold cursor-pointer text-xl">
              Crypto Coin
            </span>
          </Link>
          <Link to="/" className="ml-10">
            <span className="text-stone-100 font-montserrat font-normal cursor-pointer text-xl">
              Home
            </span>
          </Link>
        </div>
        <select
          className="w-26 h-8 mr-15 bg-stone-700 px-1 outline-none hover:bg-stone-900"
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="inr">INR</option>
          <option value="usd">USD</option>
        </select>
      </div>
    </nav>
  );
}

export default Header;
