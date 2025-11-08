"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Edit, Save, Search, Trash2 } from "lucide-react";
import Image from "next/image";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({ id: "", price: "" });

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleEditClick = (id, currentPrice) => {
    setEditingRow(id);
    setEditedData({ id, price: currentPrice });
  };

  const handleSaveClick = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              id: Number(editedData.id),
              price: Number(editedData.price),
            }
          : product
      )
    );
    setEditingRow(null);
  };

  const handleInputChange = (field, value) => {
    if (field === "price" && !/^\d*\.?\d*$/.test(value)) return;
    if (field === "id" && !/^\d*$/.test(value)) return;
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeleteClick = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  return (
    <motion.div
      className="bg-[#121212] shadow-2xl rounded-2xl p-6 md:p-10 mx-2 md:mx-0 mb-8"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-semibold text-gray-100 tracking-wide">
          Products List
        </h2>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#1f1f1f] border border-gray-700 text-gray-200 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-200 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-[#1a1a1a]">
            <tr>
              {["Image", "Name", "ID", "Category", "Price", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800">
            {filteredProducts.map((product, index) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className={`hover:bg-[#1e1e1e] transition-colors duration-300 ${
                  editingRow === product.id ? "bg-[#2f2f2f]" : ""
                }`}
              >
                <td className="px-6 py-4">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={40}
                    height={40}
                    className="rounded-md shadow-md bg-white p-1"
                  />
                </td>

                <td className="px-6 py-4 text-sm font-medium text-gray-100">
                  {product.title.length > 45
                    ? product.title.slice(0, 45) + "..."
                    : product.title}
                </td>

                <td className="px-6 py-4 text-sm text-gray-400">
                  {editingRow === product.id ? (
                    <input
                      type="text"
                      value={editedData.id}
                      onChange={(e) => handleInputChange("id", e.target.value)}
                      className="bg-[#1f1f1f] border border-gray-600 text-gray-200 rounded px-2 py-1 w-16 text-center"
                    />
                  ) : (
                    `#${product.id}`
                  )}
                </td>

                <td className="px-6 py-4 text-sm text-gray-300 capitalize">
                  {product.category}
                </td>

                <td className="px-6 py-4 text-sm font-semibold text-indigo-400">
                  {editingRow === product.id ? (
                    <input
                      type="text"
                      value={editedData.price}
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                      className="bg-[#1f1f1f] border border-gray-600 text-gray-200 rounded px-2 py-1 w-20 text-center"
                    />
                  ) : (
                    `$${product.price.toFixed(2)}`
                  )}
                </td>

                <td className="px-6 py-4 text-sm">
                  <div className="flex space-x-2">
                    {editingRow === product.id ? (
                      <button
                        className="text-green-500 hover:text-green-300 transition"
                        title="Save"
                        onClick={() => handleSaveClick(product.id)}
                      >
                        <Save size={18} />
                      </button>
                    ) : (
                      <button
                        className="text-indigo-500 hover:text-indigo-300 transition"
                        title="Edit product"
                        onClick={() =>
                          handleEditClick(product.id, product.price)
                        }
                      >
                        <Edit size={18} />
                      </button>
                    )}
                    <button
                      className="text-red-500 hover:text-red-300 transition"
                      title="Delete product"
                      onClick={() => handleDeleteClick(product.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-400 py-6 text-sm">
            {products.length === 0
              ? "Loading products..."
              : "No products match your search."}
          </p>
        )}
      </div>
    </motion.div>
  );
}
