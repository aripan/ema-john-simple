import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fakeData from "../../fakeData";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // reviewCart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const productItems = productKeys.map((key) => {
      const productItem = fakeData.find((pd) => pd.key === key);
      productItem.quantity = savedCart[key];
      return productItem;
    });
    setCart(productItems);
  }, []);

  // const handleAddProduct = (product) => {
  //   const newCart = [...cart, product];
  //   setCart(newCart);
  //   const sameProduct = newCart.filter((pd) => pd.key === product.key);
  //   const count = sameProduct.length;
  //   addToDatabaseCart(product.key, count);
  // };
  const handleAddProduct = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }

    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };

  return (
    <div className="twin-container">
      <div className="product-container">
        {products.map((pd) => (
          <Product
            product={pd}
            handleAddProduct={handleAddProduct}
            showAddToCart={true}
            key={pd.key}
          />
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="main-button">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
