import React from "react";

const ReviewItem = (props) => {
  const { name, quantity, key, price } = props.item;

  const reviewItemStyle = {
    borderBottom: "1px solid lightgray",
    margin: "0 0 5px 200px",
    paddingBottom: "5px",
  };
  return (
    <div style={reviewItemStyle}>
      <h4 className="product-name">{name}</h4>
      <p>Quantity:{quantity}</p>
      <p>${price}</p>
      <button onClick={() => props.removeItem(key)} className="main-button">
        Remove
      </button>
    </div>
  );
};

export default ReviewItem;
