import React, { useEffect, useState } from "react";
import "./banner.css";
import { TrendingCoins } from "../../config/api";
import axios from "axios";
import { useCrypto } from "../../providers/CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = useCrypto();

  console.log(trending);
  const responsive = {
    0: { items: 2 },
    568: { items: 4 },
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  console.log(trending);
  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    console.log(profit);
    return (
      <div
        style={{
          display: "flex",
          marginLeft: "5px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to={`/coins/${coin.id}`}>
          <img src={coin?.image} alt={coin.name} height="80" />
          <p
            style={{
              color: "white",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            {coin?.symbol}&nbsp;
            <span style={profit ? { color: "green" } : { color: "red" }}>
              {profit && "+"}
              {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </p>
          <p
            style={{
              textAlign: "center",
              fontSize: "20px",
              marginTop: "5px",
              color: "white",
            }}
          >
            {symbol}&nbsp;
            {numberWithCommas(coin?.current_price.toFixed(2))}
          </p>
        </Link>
      </div>
    );
  });

  useEffect(() => {
    const fetchTrending = async () => {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    };
    fetchTrending();
  }, [currency]);

  return (
    <div className="carousel" style={{ display: "flex", width: "100%" }}>
      <AliceCarousel
        infinite
        mouseTracking
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
        controlsStrategy="alternate"
      />
    </div>
  );
};

export default Carousel;
