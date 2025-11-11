"use client";
import React from "react";
import { motion } from "framer-motion";
import StatCard from "../components/StatCard";
import SalesOverviewChart from "../components/SalesOverviewChart";
import CategoryDistributionCart from "../components/CategoryDistributionCart";
import {
  ArrowUpRight,
  DollarSign,
  ShoppingBag,
  SquareActivity,
} from "lucide-react";

export default function salesPage() {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-4 px-4 lg:px-8 ">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Total Revenue" icon={DollarSign} value="$42.450" />
          <StatCard
            name="Avg. Order value"
            icon={ShoppingBag}
            value="$78.450"
          />
          <StatCard name="Total Sales" icon={SquareActivity} value="128.500" />
          <StatCard name="Sales Growth" icon={ArrowUpRight} value="32.40%" />
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart />
          <CategoryDistributionCart />
        </div>
      </main>
    </div>
  );
}
