import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import chartDays from config folder
import { chartDays } from "../config/data";
// import Crypto from context_api folder
import { Crypto } from "../context_api/CryptoContext";
// import Line from react-chartjs-2 library
import { Line } from "react-chartjs-2";
// import important plugins from chartjs library
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
// register the plugins 
ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

function Customchart(props) {

  const { currency } = useContext(Crypto);
  const [historicData, setHistocData] = useState([]);
  const [days, setDays] = useState(1);
  const [error, setError] = useState(false);

  // fetchHistoricData function is a asyncronous function which is fetching data from coingecko api using the axios library
  const fetchHistoricData = async () => {
    try {

      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      setHistocData(data.prices);

    } catch (error) {
      setError(true);
    }
  };

  // in this useEffect hook, call the fetchHistoricData function when the currency and days will change.
  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  if(error) return <p>somthing went wrong</p>;
  
  return (
    <div className="  lg:w-[73%] flex flex-col items-center justify-center p-2">
      {/* to know more about the line chart from react chartjs-2 library visit-https://www.chartjs.org/ and https://react-chartjs-2.js.org/ */}
      <Line
        data={{
          labels: historicData.map((coin) => {
            // calculate the date and time 
            let date = new Date(coin[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
                // if the days value is 1 then return the time otherwise return the date
            return days === 1 ? time : date.toLocaleDateString();
          }),
          datasets: [
            {
              data: historicData.map((coin) => {
                // return price
                return coin[1];
              }),
              label: `Price (Past ${days} days) in ${currency}`,
              borderColor: "#EEBC1D",
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
      />
      <div className=" w-full mt-5 flex justify-around">
        {/* there are 4 objects in chartDays array it contains label and value attribute */}
        {chartDays.map((day, index) => {
          // calculate the current selected button
          const selected = day.value === days;
          return (
            <button
              onClick={() => setDays(day.value)}
              key={index}
              className={`${
                selected ? "bg-[#EEBC1D] text-stone-900 font-medium" : ""
              } border border-solid border-amber-500 rounded px-5 py-1 font-montserrat cursor-pointer font-medium hover:bg-[#EEBC1D] hover:text-stone-900`}
            >
              {day.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Customchart;
