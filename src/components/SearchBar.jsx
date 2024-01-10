// src/components/SearchBar.jsx
import React from "react";

const SearchBar = ({ handleSearch }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="search"
        className="block text-sm font-medium text-gray-600"
      >
        Search
      </label>
      <input
        type="text"
        id="search"
        name="search"
        className="mt-1 p-2 w-full border rounded-md"
        placeholder="Search products by name"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
