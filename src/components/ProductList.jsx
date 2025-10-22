import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const mockProducts = [
  { id: 1, name: "Coffee Mug", category: "Kitchen", price: 12 },
  { id: 2, name: "Tea Cup", category: "Kitchen", price: 8 },
  { id: 3, name: "Bluetooth Speaker", category: "Electronics", price: 49 },
  { id: 4, name: "Laptop Stand", category: "Electronics", price: 35 },
  { id: 5, name: "Yoga Mat", category: "Fitness", price: 25 },
  { id: 6, name: "Dumbbells", category: "Fitness", price: 40 },
];

export const ProductList = ({setSearch}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [name, setName] = useState(searchParams.get("name") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [price, setPrice] = useState([
    Number(searchParams.get("min") || 0),
    Number(searchParams.get("max") || 50),
  ]);

  // Sync to URL query params
  useEffect(() => {
    const params = {};
    if (name) params.name = name;
    if (category !== "All") params.category = category;
    params.min = price[0];
    params.max = price[1];
    setSearchParams(params);
  }, [name, category, price]);

  const categories = ["All", ...new Set(mockProducts.map((p) => p.category))];

  const filtered = useMemo(() => {
    return mockProducts.filter((p) => {
      const matchName = p.name.toLowerCase().includes(name.toLowerCase());
      const matchCat = category === "All" || p.category === category;
      const matchPrice = p.price >= price[0] && p.price <= price[1];
      return matchName && matchCat && matchPrice;
    });
  }, [name, category, price]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-6">
        <input
          className="border p-2 rounded"
          placeholder="Filter by name..."
          value={name}
          onChange={(e) => {setName(e.target.value);setSearch(name);}}
        />

        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <div className="flex flex-col">
          <label className="font-medium">Price Range: ₹{price[0]} - ₹{price[1]}</label>
          <input
            type="range"
            min="0"
            max="50"
            value={price[0]}
            onChange={(e) => setPrice([+e.target.value, price[1]])}
          />
          <input
            type="range"
            min="0"
            max="50"
            value={price[1]}
            onChange={(e) => setPrice([price[0], +e.target.value])}
          />
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg p-3 shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-500">{p.category}</p>
            <p className="font-medium">₹{p.price}</p>
          </div>
        ))}
        {filtered.length === 0 && <p>No products found.</p>}
      </div>
    </div>
  );
};