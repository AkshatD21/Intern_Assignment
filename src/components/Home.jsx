import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Logout from "./Logout";
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

  // Implementing Toast effect for successfully logging in notification

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      toast.success("Successfully logged in!", {
        toastId: "uniqueToastId",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, []);


  // this is the useffect hook to fetch the products from the endpoint

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  // This function is used to handle the search and price filter.
  const handleSearch = (term) => {
    setSearchTerm(term);
    filterProducts(term, minPrice, maxPrice);
  };

  const handlePriceFilter = () => {
    filterProducts(searchTerm, minPrice, maxPrice);
  };

  // The filterproducts function is responsible for filtering the products based on the provided search term.

  const filterProducts = (searchTerm, min, max) => {
    let filtered = products;

    //if a search term is provided, it filters the product based on whether the lowercase version of the product title includes the lowercase version of the searchterm.

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

  // Function used to add product in the cart

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // Function used to remove product from the cart 

  const removeFromCart = (product) => {
    const itemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (itemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart.splice(itemIndex, 1);
      setCartItems(updatedCart);
    }
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, product) => total + product.price, 0);
  };

  return (
    <div className="min-h-screen p-8 relative">
      <ToastContainer />
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
      <ProductList
        products={filteredProducts}
        addToCart={addToCart}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
      />
      <ShoppingCart
        cartItems={cartItems}
        totalAmount={getTotalAmount()}
        removeFromCart={removeFromCart}
      />
      <br />
      <br />
      <Logout />
    </div>
  );
};

export default HomePage;
