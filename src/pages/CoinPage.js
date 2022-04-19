import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCrypto } from "../providers/CryptoContext";
import { SingleCoin } from "../config/api";
import axios from "axios";
import CoinInfo from "../components/coinInfo/CoinInfo";
import { Typography, styled, LinearProgress } from "@mui/material";
import parse from "html-react-parser";
import Header from "../components/header/Header";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = useCrypto();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    fetchCoin();
  }, []);
  console.log(coin);

  const SliderBar = styled("div")(({ theme }) => ({
    color: "white",
    [theme.breakpoints.up("lg")]: {
      width: "30%",
    },
  }));

  const Div = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      justifyContent: "start",
      color: "white",
    },
  }));

  const NestedDiv = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("lg")]: {
      borderRight: "1px solid white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "30px",
      padding: "10px",
      height: "95%",
    },
    [theme.breakpoints.down("lg")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "30px",
      padding: "10px",
    },
  }));

  return (
    <div>
      <Header />
      {!coin ? (
        <LinearProgress sx={{ backgroundColor: "gold" }} />
      ) : (
        <Div>
          <SliderBar>
            <NestedDiv>
              <img
                src={coin?.image.large}
                alt={coin?.name}
                width={200}
                height={200}
              />
              <Typography variant="h3">{coin?.name}</Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  textAlign: "justify",
                  whiteSpace: "break-spaces",
                  fontFamily: "moserat",
                  fontSize: "16px",
                }}
              >
                {parse(`${coin?.description.en.split(". ")[0]}`)}.
              </Typography>
              <Typography
                sx={{
                  width: "100%",
                  fontFamily: "monserat",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
                variant="h5"
              >
                Rank: {coin?.market_cap_rank}
              </Typography>
              <Typography
                sx={{
                  width: "100%",
                  fontFamily: "monserat",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
                variant="h5"
              >
                Current Price: {symbol}&nbsp;
                {coin?.market_data.current_price[currency.toLowerCase()]}
              </Typography>
              <Typography
                sx={{
                  width: "100%",
                  fontFamily: "monserat",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
                variant="h5"
              >
                Market Cap:{" "}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, 7)
                )}
                M
              </Typography>
            </NestedDiv>
          </SliderBar>
          <CoinInfo coin={coin} />
        </Div>
      )}
    </div>
  );
};

export default CoinPage;
