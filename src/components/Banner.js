import React from "react";
import Carousel from "./Carousel";

// In this Banner component consist of main Heading and description also import the carousel component from
// the components folder, it is just bellow the Header componet of the home page.
function Banner() {
  return (
    <div className='h-80 w-full'>
      <div className="h-2/5 flex flex-col pt-6 justify-evenly items-center">
        {/* main Heading */}
        <h1 className="font-montserrat text-stone-100 font-bold mb-3.5 text-6xl md:text-7xl">
          Crypto Coin
        </h1>
        {/* description */}
        <p className="font-montserrat text-stone-400 md:text-xl text-bold ">
          Get all the info regarding your favorite crypto currency
        </p>
      </div>
      <Carousel />
    </div>
  );
}

export default Banner;
