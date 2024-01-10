// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import ShoppingCart from "../components/ShoppingCart";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterProducts(term, minPrice, maxPrice);
  };

  const handlePriceFilter = () => {
    filterProducts(searchTerm, minPrice, maxPrice);
  };

  const filterProducts = (searchTerm, min, max) => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (min !== "" && !isNaN(min)) {
      filtered = filtered.filter((product) => product.price >= parseFloat(min));
    }

    if (max !== "" && !isNaN(max)) {
      filtered = filtered.filter((product) => product.price <= parseFloat(max));
    }

    setFilteredProducts(filtered);
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, product) => total + product.price, 0);
  };

  return (
    <div className="min-h-screen p-8 relative">
      <SearchBar handleSearch={handleSearch} />
      <div className="mb-4">
        <label
          htmlFor="minPrice"
          className="block text-sm font-medium text-gray-600"
        >
          Min Price
        </label>
        <input
          type="number"
          id="minPrice"
          name="minPrice"
          className="mt-1 p-2 w-1/4 border rounded-md"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="maxPrice"
          className="block text-sm font-medium text-gray-600"
        >
          Max Price
        </label>
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          className="mt-1 p-2 w-1/4 border rounded-md"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        onClick={handlePriceFilter}
      >
        Apply Filter
      </button>
      <ProductList products={filteredProducts} addToCart={addToCart} />
      <ShoppingCart cartItems={cartItems} totalAmount={getTotalAmount()} />
    </div>
  );
};

export default HomePage;
