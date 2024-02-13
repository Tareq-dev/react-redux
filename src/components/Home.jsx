import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../store/cartSlice.js";
function Home() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(add(product));
  };

  return (
    <div className="mx-20">
      <div className="pt-20 grid md:grid-cols-4 gap-3">
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
      </div>
    </div>
  );
}

export default Home;
