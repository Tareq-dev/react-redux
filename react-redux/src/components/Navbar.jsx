import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const items = useSelector((state) => state.cart);
  return (
    <div className="py-4 flex justify-between items-center">
      <p className="text-2xl">React-Redux</p>
      <ul className="flex justify-center gap-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/cart">
            Cart <span>{items.length}</span>
          </Link>
        </li>
      </ul>
      <div>
        <Link to="/login"> Login </Link>
      </div>
    </div>
  );
}

export default Navbar;
