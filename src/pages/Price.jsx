import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function Price() {

  const apiKey = "DB7A5589-AB90-487C-AD31-2D24D60A94A5";
  const params = useParams();
  const symbol = params.symbol;
  // console.log("SYMBOL: ", symbol);
  const [coin, setCoin] = useState(null);

  const url = `http://rest.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`;

  const getCoin = async() => {
    try{
      const response = await fetch(url);
      const data = await response.json();
      setCoin(data);
    } catch (error) {
      console.log("There was an error collecting data", error);
    };
  };

  useEffect(() => {
    getCoin();
  }, []);

  const loaded = () => {
    return (
      <div>
        <h1>Price</h1>
        <h2>
          {coin.asset_id_base}/ {coin.asset_id_quote}
        </h2>
        <h3>{coin.rate}</h3>
      </div>
    );
  }

  const loading = () => {
    return <h2>Loading...</h2>
  };

  return coin && coin.rate ? loaded() : loading();
};