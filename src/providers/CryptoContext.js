import React, { createContext, useContext, useState, useEffect } from "react";

const Crypto = createContext();

const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("EUR");
  const [symbol, setSymbol] = useState("€");

  useEffect(() => {
    if (currency === "EUR") {
      setSymbol("€");
    }
    if (currency === "USD") {
      setSymbol("$");
    }
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoProvider;

export const useCrypto = () => useContext(Crypto);
