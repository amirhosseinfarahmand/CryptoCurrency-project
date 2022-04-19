import React from "react";
import Banner from "../components/banner/Banner";
import CoinTable from "../components/coinTable/CoinTable";
import Header from "../components/header/Header";

const HomePage = () => {
  return (
    <div className="container">
      <Header />
      <Banner />
      <CoinTable />
    </div>
  );
};

export default HomePage;
