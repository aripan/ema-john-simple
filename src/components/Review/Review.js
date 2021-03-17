import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import fakeData from "../../fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import happyImage from "../../images/giphy.gif";

const Review = () => {
  const [reviewCart, setReviewCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleProceedToCheckout = () => {};
  useEffect(() => {
    // reviewCart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const productItems = productKeys.map((key) => {
      const productItem = fakeData.find((pd) => pd.key === key);
      productItem.quantity = savedCart[key];
      return productItem;
    });
    setReviewCart(productItems);
  }, []);

  const removeItem = (itemKey) => {
    const newCartItems = reviewCart.filter((item) => {
      return item.key !== itemKey;
    });
    setReviewCart(newCartItems);
    removeFromDatabaseCart(itemKey);
  };

  const thankYou = <img src={happyImage} alt="" />;
  return (
    <div className="twin-container">
      <div className="product-container">
        {reviewCart.map((item) => (
          <ReviewItem
            key={item.key}
            item={item}
            removeItem={removeItem}
          ></ReviewItem>
        ))}

        {orderPlaced && thankYou}
      </div>

      <div className="cart-container">
        <Cart cart={reviewCart}>
          <button onClick={handleProceedToCheckout} className="main-button">
            Proceed To Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
