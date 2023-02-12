import React, { createContext, useEffect, useState } from "react";
// create context
const Crypto = createContext();

function CryptoContext({ Children }) {
  const [currency, setCurrency] = useState("inr");

  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    if (currency === "inr") {
      setSymbol("₹");
    } else if (currency === "usd") {
      setSymbol("$");
    }
  }, [currency]);

  return (
    // provide the context 
    <Crypto.Provider
      value={{ currency: currency, setCurrency: setCurrency, symbol: symbol }}
    >
      {Children}
    </Crypto.Provider>
  );
}

export default CryptoContext;
export { Crypto };
