"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Trash2 } from "lucide-react";

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://ecommerce.routemisr.com/api/v1/orders")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setOrders(data);
        else if (Array.isArray(data.orders)) setOrders(data.orders);
        else console.error("Unexpected API structure:", data);
      })
      .catch((err) => console.error("Error loading orders:", err));
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.paymentMethodType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (id) => {
    setOrders((prev) => prev.filter((order) => order._id !== id));
  };

  return (
    <motion.div
      className="bg-[#121212] shadow-2xl rounded-2xl p-6 md:p-10 mx-2 md:mx-0 mb-8"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-semibold text-gray-100 tracking-wide">
          Orders List
        </h2>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#1f1f1f] border border-gray-700 text-gray-200 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-200 text-sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-[#1a1a1a]">
            <tr>
              {[
                "User",
                "Email",
                "Payment Method",
                "Total Price",
                "Paid",
                "Delivered",
                "Created At",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800">
            {filteredOrders.map((order, index) => (
              <motion.tr
                key={order._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="hover:bg-[#1e1e1e] transition-colors duration-300"
              >
                <td className="px-6 py-4 text-sm text-gray-100">
                  {order.user?.name || "Unknown"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {order.user?.email || "—"}
                </td>
                <td className="px-6 py-4 text-sm text-indigo-400 capitalize">
                  {order.paymentMethodType}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-green-400">
                  ${order.totalOrderPrice?.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {order.isPaid ? "✅ Yes" : "❌ No"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {order.isDelivered ? "✅ Yes" : "❌ No"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    className="text-red-500 hover:text-red-300 transition"
                    title="Delete order"
                    onClick={() => handleDeleteClick(order._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <p className="text-center text-gray-400 py-6 text-sm">
            {orders.length === 0
              ? "Loading orders..."
              : "No orders match your search."}
          </p>
        )}
      </div>
    </motion.div>
  );
}
