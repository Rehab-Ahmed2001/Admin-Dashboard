"use client";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

export default function SalesOverviewChart() {
  const [chartData, setChartData] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("SalesOverviewChart loaded:", data);

        const uniqueYears = [...new Set(data.sales.map((d) => d.year))];
        setYears(uniqueYears);

        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const formatted = months.map((month) => {
          const monthData = { name: month };
          uniqueYears.forEach((year) => {
            const found = data.sales.find(
              (d) => d.name === month && d.year === year
            );
            monthData[year] = found ? found.sales : null;
          });
          return monthData;
        });

        setChartData(formatted);
      })
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  return (
    <div className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-0">
      <h2 className="text-base md:text-lg font-medium mb-4 text-gray-100 text-center md:text-left">
        Sales Overview (2022–2024)
      </h2>
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
            <XAxis
              dataKey="name"
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31,41,55,0.8)",
                borderColor: "#4b5563",
                fontSize: "12px",
              }}
              itemStyle={{ color: "#e5e7eb" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", color: "#e5e7eb" }} />

            {years.map((year, index) => (
              <Line
                key={year}
                type="monotone"
                dataKey={year}
                name={year.toString()}
                strokeWidth={3}
                stroke={
                  ["#9c27b0", "#03a9f4", "#4caf50"][index % 3]
                } 
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
