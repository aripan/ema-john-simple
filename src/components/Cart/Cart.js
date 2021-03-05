import React from "react";
import { Link } from "react-router-dom";

const Cart = (props) => {
  const cart = props.cart;
  // Product Price
  const productPrice = cart.reduce(
    (productPrice, product) => productPrice + product.price * product.quantity,
    0
  );

  //! easy way to replace reduce
  //   let total = 0;
  //   for (let i = 0; i < cart.length; i++) {
  //     const product = cart[i];
  //     total = total + product.price;
  //   }

  // Shipping Cost
  const shippingCost =
    productPrice === 0 || productPrice > 35
      ? 0
      : productPrice > 15
      ? 4.99
      : 9.99;

  //! easy way to replace ternary
  //   let shippingCost = 0;
  //   if (productPrice === 0) {
  //     shippingCost = 0;
  //   } else if (productPrice > 35) {
  //     shippingCost = 0;
  //   } else if (productPrice > 15) {
  //     shippingCost = 4.99;
  //   } else {
  //     shippingCost = 9.99;
  //   }

  // Tax + VAT
  const tax = (productPrice + shippingCost) * 0.1;
  // Total Price
  const totalPrice = productPrice + shippingCost + tax;

  // Format the number
  const formatNumber = (num) => {
    const precision = num.toFixed(2);
    return Number(precision);
  };

  return (
    <div>
      <h3>Order Summary</h3>
      <p>Items Ordered: {cart.length}</p>
      <p>Product Price: ${formatNumber(productPrice)} </p>
      <p>Shipping Cost: ${formatNumber(shippingCost)}</p>
      <p>Tax + VAT: ${formatNumber(tax)}</p>
      <p>Total Price: ${formatNumber(totalPrice)}</p>
      <br />
      {props.children}
    </div>
  );
};

export default Cart;
