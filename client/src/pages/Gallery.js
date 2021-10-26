import React from "react";
import MiniatureList from "../components/MiniatureList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Gallery = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <MiniatureList />
      {/* <Cart /> */}
    </div>
  );
};

export default Gallery;
