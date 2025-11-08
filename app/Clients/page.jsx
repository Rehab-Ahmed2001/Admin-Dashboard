"use client";
import React from "react";
import { motion } from "framer-motion";
import StatCard from "../components/StatCard";
import { RotateCcw, UserCheck, UserPlus, UsersIcon } from "lucide-react";
import ClientsTable from "../components/ClientsTable";
export default function clientsPage() {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Total Clients" icon={UsersIcon} value="7352" />
          <StatCard name="New Clients" icon={UserPlus} value="1845" />
          <StatCard name="Active Clients" icon={UserCheck} value="5459" />
          <StatCard name="Returning Clients" icon={RotateCcw} value="8465" />
        </motion.div>
        <ClientsTable />
      </main>
    </div>
  );
}
