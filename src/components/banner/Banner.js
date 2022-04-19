import { Container, Typography } from "@mui/material";
import React from "react";
import "./banner.css";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div className="banner">
      <Container
        className="banner-content"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <div className="typoBox">
          <Typography variant="h2">CryptoCurrency Finder</Typography>
          <Typography variant="subtitle1">
            get all the info regarding your favorit currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
