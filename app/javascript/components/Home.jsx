import React from "react";
import "../../assets/stylesheets/components/Home.css"
import Banner from "./Banner";
import Product from "./Product";
import Cart from "./Cart";

const Home = () => {

  return(
    <>
      <Banner />
      <div className="flex">
        <Cart />
        <Product />
      </div>
    </>
    )
};

export default Home;
