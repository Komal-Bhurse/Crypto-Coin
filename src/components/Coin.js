import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Customchart from "./Customchart";
import Loading from "./Loading";
// import Crypto from CryptoContext Component
import { Crypto } from "../context_api/CryptoContext";

function Coin() {
  const params = useParams();
  const [coin, setCoin] = useState([]);
  const { currency, symbol } = useContext(Crypto);
  const [loader, setLoader] = useState(false);
  const [error, setError]= useState(false);

  // fetchCoin function is a asyncronous function which is fetching data from coingecko api using the axios library
  const fetchCoin = async () => {
    try {

    // we set the true value to the loader before fetching the data
    setLoader(true);
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${params.id}`
    );
    setCoin(data);
    // after fetching the data we set the value false to the loader
    setLoader(false);

    } catch (error) {
      setError(true);
    }
  };

  // in this useEffect hook, call the fetchCoin function when the currency and params.id will change.
  useEffect(() => {
    fetchCoin();
  }, [currency, params.id]);

  // numberWithCommas function gives a number as a parameter and return it with commas
  const numberWithCommas = (x) => {
    return x ? x.toLocaleString() : x;
  };

  if(error) return <p>somthing went wrong</p>;
  
  return (
    <div className=" container m-auto mt-8 px-2 lg:px-1 lg:flex h-auto">
      {/* when the value of the loader is true then return the Loading components 
          otherwise it returns the reamaning code inside of fragment component*/}
      {loader ? (
        <Loading />
      ) : (
        <>
          <div className=" lg:w-[32%] lg:border-r-2 border-stone-600">
            <div className=" text-center mb-5">
              {/* image */}
              <img
                className=" h-40 mb-3 m-auto"
                src={coin.image?.large}
                alt={coin.name}
              />
              {/* name */}
              <h1 className="font-montserrat font-bold text-3xl">
                {coin.name}
              </h1>
            </div>
            {/* description */}
            <p className="font-montserrat px-5 mb-6 text-justify text-lg text-stone-400">
              {coin.description?.en.split(". ")[0]} .
            </p>
            <div className=" font-montserrat px-5 flex justify-evenly lg:flex-col max-sm:flex-col">
              {/* rank */}
              <p className="text-xl mb-3 flex max-md:flex-col items-center">
                <span>Rank </span>
                <span className="md:ml-3 text-stone-400">
                  {coin.market_cap_rank}
                </span>
              </p>
              {/* current_price */}
              <p className="text-xl mb-3 flex max-md:flex-col items-center">
                <span>Current Price </span>
                <span className="md:ml-3 text-stone-400">
                  {symbol}&nbsp;
                  {numberWithCommas(coin.market_data?.current_price[currency])}
                </span>
              </p>
              {/* market cap */}
              <p className="text-xl mb-5 flex max-md:flex-col items-center">
                <span>Market Cap </span>
                <span className="md:ml-3 text-stone-400">
                  {symbol}&nbsp;
                  {numberWithCommas(
                    coin.market_data?.market_cap[currency]
                  )?.slice(0, -8)}
                  M
                </span>
              </p>
            </div>
          </div>
        </>
      )}
      {/* pass the id prop which we will access in the Customchart component. 
          params.id is getting from useParams hook */}
      <Customchart id={params.id} />
    </div>
  );
}

export default Coin;
