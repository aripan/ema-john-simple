import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import logo from "../../images/logo.png";
import "./Header.css";

const Header = () => {
  const [loggedInUser] = useContext(UserContext);
  return (
    <div className="header">
      <h1>Email:{loggedInUser.email}</h1>
      <img src={logo} alt="" />
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Order Review</Link>
        <Link to="/inventory">Manage Inventory</Link>
      </nav>
    </div>
  );
};

export default Header;
