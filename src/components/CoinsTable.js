import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { pagination } from "../config/pagination";
import Loading from "./Loading";

// import Crypto from CryptoContext component
import { Crypto } from "../context_api/CryptoContext";

// import images
import lessthan from "../images/less-than.png";
import morethan from "../images/more-than.png";

function CoinsTable() {
  const { currency, symbol } = useContext(Crypto);
  const [loader, setLoader] = useState(false);

  // when user will Searching in search box , then use this useState hook 
  const [search, setSearch] = useState("");
  
  // after fetching the data set the data into setcoins 
  const [coins, setCoins] = useState([]);

  // when matches the data acording to serach then use this setSearchResult
  const [searchResult, setSearchResult] = useState([]);

  // bellow the coins table we use the pagination, when user will click pageNo button then we have to use setpage() 
  const [page, setPage] = useState(1);

//  after all the filtration set the the data into setNewCoin 
  const [newCoin, setNewCoin] = useState([]);

  const[error,setError]=useState(false);

  const navigate = useNavigate();

  // fetchTrendingCoins function is a asyncronous function which is fetching data from coingecko api using the axios library
  const fetchTrendingCoins = async () => {
    try {

       // we set the true value to the loader before fetching the data
    setLoader(true);
    const { data } = await axios.get(
      `api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
    );
    setCoins(data);
    // after fetching the data we set the value false to the loader
    setLoader(false);

    } catch (error) {
      setError(true);
    }
  };

  // in this useEffect hook, call the fetchTrendingCoins function when the currency will change.
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

// when user will searching anything in the serach box then call searchbox function.
  function searchBox(e) {
    // convert the search value into in lowercase and set it in setSearch()
    setSearch(e.target.value.toLowerCase());
    if (search !== "") {
      // if search is not empty then, filter the coins acording to search
      const newTerm = coins.filter((obj) => {
        // in this filtration check name or symbole includs or not acording to search
        // and return the resultunt data into newTerm variable 
        return (
          obj.name.toString().toLowerCase().includes(search) ||
          obj.symbol.toString().toLowerCase().includes(search)
        );
      });
      // set the serach result into the setSearchResult()
      setSearchResult(newTerm);
    } 
    // if serach is empty then set given coins into the setSearchResult()
    else {
      setSearchResult(coins);
    }
  }

  // in this useEffect hook, setNewCoin() when the newCoin, coins, searchResult, search will change.
  useEffect(() => {
    setNewCoin(search.length < 1 ? coins : searchResult);
  }, [newCoin, coins, searchResult, search]);

  // we have 10 pages, when the user will click on the perticular pageNo button then we have to 
  // setpage(perticular pageno button value) and scoll the from 0 to 380px 
  function changePage(e) {
    setPage(e.target.value);
    window.scroll(0, 380);
  }

  // numberWithCommas function gives a number as a parameter and return it with commas
  const numberWithCommas = (x) => {
    return x.toLocaleString();
  };

  // we have 10 pages, when user will click less-than button then call this prev function, this function
  // check current page if current page is greater than 1,it set the value (page-1) into the setpage and scroll 
  // the window from 0 to 380px
  function prev() {
    if (page > 1) {
      setPage(page - 1);
      window.scroll(0, 380);
    }
    
  }

  // we have 10 pages, when user will click more-than button then call this next function, this function
  // check current page if current page is less than 10,it set the value (page+1) into the setpage and scroll 
  // the window from 0 to 380px 
  function next() {
    if (page < 10) {
      setPage(page + 1);
      window.scroll(0, 380);
    }
    
  }
  
  if(error) return <p>somthing went wrong</p>;

  return (
    <div className="container text-center m-auto ">
      {/* heading */}
      <h4 className=" font-montserrat pt-3 text-4xl">
        Cryptocurrency Prices by Market Cap
      </h4>
      {/* searchBox */}
      <div className="bg-stone-800 py-1 mx-auto my-3 text-center rounded-full drop-shadow-xl">
        <input
          type="text"
          placeholder=" Search For a Crypto Currency.."
          className=" outline-none  p-1  w-11/12 bg-transparent rounded"
          onChange={searchBox}
        />
      </div>
      {/* when value of the loader is true then return the loading component otherwise return the table */}
      {loader ? (
        <Loading />
      ) : (
        <>
          <table className=" table-auto w-full">
            <thead className="bg-[#EEBC1D] text-stone-900 text-lg">
              <tr className="">
                <th className="p-1">Coin</th>
                <th className="p-1">Price</th>
                <th className="p-1">24h change</th>
                <th className="p-1">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {/* if the newCoin is empty then render "no results found" */}
              {newCoin < 1 ? (
                <tr className="">
                  <td className=" ">
                    <div className=" mt-5">
                      <p>No results found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                // if newCoin is not empty then slice it according to pageno and map it 
                //  we have 100 coins that we devide into 10 pages 
                newCoin
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((e, key) => {
                    // calculate the Profit
                    const profit = e.price_change_percentage_24h >= 0;
                    return (
                      // when we click this row it navigate to this-> "/coin/e.id" route
                      <tr
                        className="border-b border-stone-700 cursor-pointer hover:bg-[#131111]"
                        key={key}
                        onClick={() => navigate(`/coin/${e.id}`)}
                      >
                        <td className="p-1 sm:flex">
                          {/* image */}
                          <img
                            className=" w-10 md:w-16 "
                            src={e.image}
                            alt={e.name}
                          />
                          <div className=" sm:pl-4 pt-1 text-left">
                            {/* symbol */}
                            <span className=" uppercase font-medium text-lg">
                              {e.symbol}
                            </span>{" "}
                            <br />
                            {/* name */}
                            <span className=" capitalize text-stone-400">
                              {e.name}
                            </span>
                          </div>
                        </td>
                        {/* current price */}
                        <td className="p-1 font-normal text-lg">
                          {symbol}&nbsp;{numberWithCommas(e.current_price)}
                        </td>
                        {/* profit or loss */}
                        <td
                          className={
                            profit
                              ? "text-green-600 font-medium text-lg p-1"
                              : "text-red-600 font-normal text-lg p-1"
                          }
                        >
                          {profit
                            ? e.price_change_percentage_24h.toFixed(2)
                            : e.price_change_percentage_24h.toFixed(2)}
                          {profit ? "+" : ""}&nbsp;%
                        </td>
                         {/* market cap */}
                        <td className="p-1 font-normal text-lg">
                          {numberWithCommas(e.market_cap).slice(0, -8)}M
                        </td>
                      </tr>
                    );
                  })
              )}
            </tbody>
          </table>
          <div className="flex-wrap mt-3 p-5 text-[#EEBC1D] flex justify-center">
            {/* pagination */}
            {pagination.map((pageNo, index) => {
              // if the newCoin contains below the 10 coin then hidden the pagination
              const hidden = newCoin.length < 10 ? "hidden" : "";
              return (
                <div className="flex" key={index}>
                  {/* less-than image */}
                  <img
                    className={
                      index < 1 && newCoin.length > 10
                        ? "max-sm:hidden"
                        : "hidden"
                    }
                    src={lessthan}
                    alt="less than"
                    onClick={prev}
                  />
                  {/* from 1 to 10 buttons */}
                  <button
                    className={`${hidden} h-8 w-8 border border-solid border-1 rounded-full border-amber-500 m-2`}
                    value={pageNo.value}
                    onClick={(e) => changePage(e)}
                  >
                    {pageNo.label}
                  </button>
                  {/* more-than image */}
                  <img
                    className={
                      index > 8 && newCoin.length > 10
                        ? "max-sm:hidden"
                        : "hidden"
                    }
                    src={morethan}
                    alt="more than"
                    onClick={next}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default CoinsTable;
