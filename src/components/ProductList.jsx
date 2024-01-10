// src/components/ProductList.jsx
import React, { useState } from "react";

const ProductList = ({ products, addToCart }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
            <div className="mb-4 overflow-hidden rounded-md">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover"
              />
            </div>
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-blue-500">Price: ${product.price}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
