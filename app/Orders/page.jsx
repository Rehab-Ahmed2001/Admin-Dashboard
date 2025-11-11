"use client";
import React from "react";
import { motion } from "framer-motion";
import { Ban, CheckCircle, Clock, ShoppingBag } from "lucide-react";
import StatCard from "../components/StatCard";
import OrdersTable from "../components/OrdersTable";

const iconMap = {
  ShoppingBag,
  Clock,
  CheckCircle,
  Ban,
};

export default function OrdersPage() {
  const ordersData = {
    orderStats: [
      { name: "Total Orders", value: 1243, icon: "ShoppingBag" },
      { name: "Completed Orders", value: 1120, icon: "CheckCircle" },
      { name: "Pending Orders", value: 82, icon: "Clock" },
      { name: "Cancelled Orders", value: 41, icon: "Ban" },
    ],
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {ordersData.orderStats.map(({ name, value, icon }) => {
            const IconComponent = iconMap[icon];
            return (
              <StatCard
                key={name}
                name={name}
                icon={IconComponent}
                value={value}
              />
            );
          })}
        </motion.div>
        <OrdersTable/>
      </main>
    </div>
  );
}
