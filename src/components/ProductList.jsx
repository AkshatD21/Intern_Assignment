// src/components/ProductList.jsx
import React from "react";

const ProductList = ({ products, addToCart, cartItems, removeFromCart }) => {
  const isItemInCart = (productId) =>
    cartItems.some((item) => item.id === productId);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-md shadow-md flex flex-col justify-between"
          >
            <div
              className="mb-4 overflow-hidden rounded-md"
              style={{ height: "150px", width: "100%" }}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
            </div>
            <div className="flex flex-col items-start mt-2">
              <p className="text-blue-500">Price: ${product.price}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mt-2"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
              {isItemInCart(product.id) && (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300 mt-2 ml-2"
                  onClick={() => removeFromCart(product)}
                >
                  Remove from Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
