import React from "react";

const ShoppingCart = ({ cartItems, totalAmount }) => {
  return (
    <div className="bg-gray-800 text-white p-4 fixed top-0 right-0">
      <div>
        Cart: {cartItems.length} items | Total: ${totalAmount.toFixed(2)}
      </div>
    </div>
  );
};

export default ShoppingCart;
