// src/components/ShoppingCart.jsx
import React from "react";

const ShoppingCart = ({ cartItems, totalAmount }) => {
  return (
    <div className="bg-gray-800 text-white p-4 fixed top-0 right-0">
      <div>
        Cart: {cartItems.length} items | Total: ${totalAmount.toFixed(2)}
      </div>
      {/* You can display individual items in the cart here if needed */}
    </div>
  );
};

export default ShoppingCart;
