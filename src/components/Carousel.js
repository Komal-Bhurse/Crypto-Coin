import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import Crypto from CryptoContext component
import { Crypto } from "../context_api/CryptoContext.js";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

function Carousel() {

  const { currency, symbol } = useContext(Crypto);
  const [coins, setCoins] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError]= useState(false);

  // fetchTop10Coins function is a asyncronous function which is fetching data from coingecko api using the axios library  
    const fetchTop10Coins = async () => {
      try {

        // we set the true value to the loader before fetching the data 
    setLoader(true);
    const { data } = await axios.get(
      `api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
    );
    setCoins(data);
    // after fetching the data we set the value false to the loader
    setLoader(false);

      } catch (error) {
        setError(true);
      }
    };
 
  // in this useEffect hook, call the fetchTop10Coins function when the currency will change.
  useEffect(() => {
    fetchTop10Coins();
  }, [currency]);

  //numberWithCommas function gives a number as a parameter and return it with commas  
  const numberWithCommas = (x) => {
    return x.toLocaleString();
  };

  if(error) return <p>somthing went wrong</p>;
  
  return (
    <div className="  mt-3 h-44 container mx-auto flex items-center justify-center">
      {/* when the value of the loader is true then return the span components
          when the value of the loader is false then return Swiper component */}
      {loader ? (
        <span className="text-2xl tracking-wide font-montserrat text-[#EEBC1D]">
          Loading . . .
        </span>
      ) : (
        <>
        {/* this swiper component is imoprted from the swiper-js react library,this is a slider or carousel, to know more about this library
            visit-https://swiperjs.com/    */}
          <Swiper
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              512: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            loop={true}
            autoplay={{
              delay: 1000,
            }}
            speed={2000}
            pagination={false}
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {/* there are 10 objects inside this coins array that we are mapping */}
            {coins?.map((e, index) => {
              // calculating the profit 
              const profit = e.price_change_percentage_24h >= 0;
              const slide = (
                // swiperSlide component is imported from swiper-js react library to know more visit-https://swiperjs.com/
                <SwiperSlide key={index}>
                  <div className="text-center">
                    {/* when we click on this image it moves to this -> "/coin/e.id" route */}
                    <Link to={`/coin/${e.id}`}>
                      <img className="w-20 m-auto" src={e.image} alt="img" />
                    </Link>
                    <span className="uppercase">
                      {e.symbol}
                      &nbsp; &nbsp;
                      <span
                        className={
                          profit
                            ? "text-green-600 font-medium text-lg"
                            : "text-red-600 font-medium text-lg"
                        }
                      >
                        {/* if profit true then possitive number otherwise negative number*/}
                        {profit
                          ? e.price_change_percentage_24h.toFixed(2)
                          : e.price_change_percentage_24h.toFixed(2)}
                           {/* when number is possite then we show the plus sign otherwise nothing will show */}
                        {profit ? "+" : ""}&nbsp;%
                      </span>
                    </span>
                    <br />
                    <span className="font-normal text-xl">
                      {/* symbol gets from useContext hook. we are passing the current price(number) in numberWithcommas function*/}
                      {symbol}&nbsp;{numberWithCommas(e.current_price)}
                    </span>
                  </div>
                </SwiperSlide>
              );
              return slide;
            })}
          </Swiper>
        </>
      )}
    </div>
  );
}

export default Carousel;
