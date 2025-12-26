import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMediaQuery } from "react-responsive";

const YearlySalesChart = ({ data, year = new Date().getFullYear() }) => {
  const isSmall = useMediaQuery({ maxWidth: 600 });

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Convert month numbers to labels
  const formattedData = data?.map(item => ({
    ...item,
    monthLabel: monthNames[item.month - 1] || item.month,
  }));

  // Calculate min/max for dynamic color logic
  const { minValue, maxValue } = useMemo(() => {
    const values = data?.map(d => d.totalSales) || [];
    return {
      minValue: Math.min(...values),
      maxValue: Math.max(...values),
    };
  }, [data]);

  return (
    <div
      style={{
        width: "100%",
        height: isSmall ? 280 : 420,
        padding: isSmall ? "12px" : "20px",
      }}
    >
      <h3
        style={{
          color: "#1e3a8a",
          textAlign: "center",
          fontSize: isSmall ? "1rem" : "1.25rem",
          marginBottom: "0.75rem",
          letterSpacing: "0.3px",
        }}
      >
        Annual Performance ({year})
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: isSmall ? 10 : 30,
            left: isSmall ? 0 : 20,
            bottom: 10,
          }}
        >
          {/* Gradient */}
          <defs>
            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#facc15" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="monthLabel"
            tick={{ fill: "#1e3a8a", fontSize: isSmall ? 10 : 12 }}
          />
          <YAxis
            tick={{ fill: "#1e3a8a", fontSize: isSmall ? 10 : 12 }}
            axisLine={{ stroke: "#bfdbfe" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #93c5fd",
              borderRadius: "8px",
              fontSize: isSmall ? "0.8rem" : "0.9rem",
            }}
            labelStyle={{ color: "#1e3a8a", fontWeight: "bold" }}
          />
          {!isSmall && <Legend wrapperStyle={{ color: "#1e3a8a" }} />}

          {/* Dynamic color dots */}
          <Line
            type="monotone"
            dataKey="totalSales"
            stroke="url(#trendGradient)"
            strokeWidth={3}
            dot={(dotProps) => {
              const { cx, cy, payload } = dotProps;
              const val = payload.totalSales;
              let color = "#f97316"; // mid
              if (val <= minValue + (maxValue - minValue) * 0.33) color = "#ef4444";
              else if (val >= minValue + (maxValue - minValue) * 0.66) color = "#facc15";
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSmall ? 3 : 5}
                  stroke="#fff"
                  strokeWidth={2}
                  fill={color}
                />
              );
            }}
            activeDot={{
              r: isSmall ? 5 : 7,
              stroke: "#1e3a8a",
              strokeWidth: 2,
              fill: "#facc15",
            }}
            name="Total Sales"
            animationDuration={1000}
          />

          <Line
            type="monotone"
            dataKey="totalOrders"
            stroke="#3b82f6"
            strokeDasharray="4 4"
            strokeWidth={2}
            dot={false}
            name="Total Orders"
            animationDuration={1000}
          />
          <Line
            type="monotone"
            dataKey="ordersCancelled"
            stroke="#22c55e"        // green for returns
            strokeDasharray="3 3"
            strokeWidth={2}
            dot={false}
            name="Orders Cancelled"
            animationDuration={1000}
          />

          <Line
            type="monotone"
            dataKey="ordersRefunded"
            stroke="#a855f7"        // purple for refunds
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={false}
            name="Orders Refunded"
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearlySalesChart;
