import React from "react";
import Banner from "./Banner";
import Product from "./Product";
import Cart from "./Cart";

const Home = () => {
  return(
    <div className="flex h-100vh">
      <Banner />
      <Cart />
      <Product />
    </div>
  )
};

export default Home;
