import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice.js";
// import { fetchProducts } from "./../store/productSlice";
// import { UserContext } from "./../context/UserContext";
import {
  fetchUserData,
  logoutUser,
  selectUser,
  selectAuth,
} from "../store/userSlice.js";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);

  console.log(user, auth);
  // const { auth, user, logout } = useContext(UserContext);
  const { data: products, status } = useSelector((state) => state.product);

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, []);

  const handleAddToCart = (product) => {
    dispatch(add(product));
  };
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  // To logout
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="mx-20">
      <div>{auth ? <p>Welcome, {user.email}!</p> : <p>Not Login</p>}</div>
      <button onClick={handleLogout}>Log out</button>
      {/* <div className="pt-20 grid md:grid-cols-4 gap-3">
        {products.map((p) => (
          <div key={p.id} className="flex justify-center">
            <div>
              <img className="w-40" src={p.thumbnail} alt="" />
              <h4 className="text-center font-semibold pt-2">{p.title}</h4>
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => handleAddToCart(p)}
                  className="bg-sky-400 px-2 rounded-sm shadow text-white"
                >
                  Add to card
                </button>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Home;
