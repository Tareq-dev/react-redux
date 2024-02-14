import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  remove,
  increaseQuantity,
  decreaseQuantity,
} from "../store/cartSlice.js";
function Cart() {
  const products = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(remove(id));
  };
  const handleIncrease = (id) => {
    dispatch(increaseQuantity({ id }));
  };
  const handleDecrease = (id) => {
    dispatch(decreaseQuantity({ id }));
  };

  const calculateTotalPrice = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.quantity * product.price; // Assuming each product has a 'price' property
    });
    return total;
  };
  return (
    <div className="flex w-full">
      <div className="w-3/5">
        {products.map((cart) => (
          <div className="flex justify-center" key={cart.id}>
            <div className="flex gap-8 justify-center shadow  my-2 items-center py-2  px-8">
              <img className="w-14 h-14" src={cart.thumbnail} alt="" />
              <p className="w-20 text-xs">{cart.title.slice(0, 10)}</p>
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => handleDecrease(cart.id)}
                  className="rounded-full border p-1 flex justify-center items-center font-bold text-2xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14"
                    />
                  </svg>
                </button>
                <p>{cart.quantity}</p>
                <button
                  onClick={() => handleIncrease(cart.id)}
                  className="rounded-full border p-1 flex justify-center items-center font-bold text-3xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
              <p className="w-20 text-xs">Price : ${cart.price}</p>
              <button onClick={() => handleRemoveItem(cart.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div classname="w-2/5">
        <div className="shadow border rounded p-8 m-3 mt-10">
          <h3 className="text-md text-center font-semibold ">
            Total -
            {calculateTotalPrice() + Math.ceil(calculateTotalPrice() * 0.02)}{" "}
            USD
          </h3>
          <hr />
          <div className="flex justify-between items-center mt-4 w-60">
            <p className="text-sm font-semibold">sub-total </p>
            <p className="text-sm">{calculateTotalPrice()} USD</p>
          </div>
          <div className="flex justify-between items-center w-60">
            <p className="text-sm font-semibold">Delivery (2%) </p>
            <p className="text-sm">
              {calculateTotalPrice() * (0.02).toFixed(2)} USD
            </p>
          </div>
          <button className="bg-green-400 w-full mt-6 rounded-sm py-2 text-white">
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
