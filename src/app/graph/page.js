"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import "../../styles/smostyle.css";
import "../../styles/text.css";

export default function RealValueGraph() {
  const [data, setData] = useState([]);
// process.env.NEXT_PUBLIC_SCRIPT_GRAPH_DATA
  useEffect(() => {
    fetch('https://collectintel.in/seographexportdata.php') // <-- CHANGE TO YOUR NODE ROUTE
      .then((response) => response.json())
      .then((jsonData) => {
        if (jsonData.success && Array.isArray(jsonData.data)) {
          const formattedData = jsonData.data.map((item, index) => ({
            id: index + 1,
            name: item.name,
            visitors: Number(item.visitors) || 0,
            conversion: Number(item.conversion) || 0,
          }));
          setData(formattedData);
        }
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  return (
    <div className="p-4 w-full max-w-screen-lg mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Monthly Visitors & Conversion Rate
      </h2>

      <div className="w-full h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 40, left: 10, bottom: 10 }}>

            {/* Soft Grid */}
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />

            {/* Month Axis */}
            <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 12 }} />

            {/* Left Visitors Axis */}
            <YAxis 
              yAxisId="left"
              tick={{ fill: "#3559E0", fontSize: 12 }}
              label={{
                value: "Visitors",
                angle: -90,
                position: "insideLeft",
                fill: "#3559E0",
                fontSize: 12,
                fontWeight: "bold",
              }}
            />

            {/* Right Conversion Axis */}
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: "#FF6600", fontSize: 12 }}
              label={{
                value: "Conversion Rate (%)",
                angle: -90,
                position: "insideRight",
                fill: "#FF6600",
                fontSize: 12,
                fontWeight: "bold",
              }}
            />

            <Tooltip contentStyle={{ fontSize: 12 }} />

            <Legend verticalAlign="bottom" />

            {/* Visitors Line */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="visitors"
              stroke="#3559E0"
              strokeWidth={3}
              dot={{ r: 5, strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />

            {/* Conversion Line */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="conversion"
              stroke="#FF6600"
              strokeWidth={3}
              dot={{ r: 5, strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
