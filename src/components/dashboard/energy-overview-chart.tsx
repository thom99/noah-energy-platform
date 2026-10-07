"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type EnergyHistoryPoint = {
  time: string;
  productionKw: number;
  consumptionKw: number;
};

type EnergyOverviewChartProps = {
  data: EnergyHistoryPoint[];
};

export function EnergyOverviewChart({
  data,
}: EnergyOverviewChartProps) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -10,
            bottom: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e5e5e5"
          />

          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#737373" }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#737373" }}
            unit="kW"
          />

          <Tooltip
            contentStyle={{
              borderRadius: 16,
              border: "1px solid #e5e5e5",
            }}
          />

          <Legend/>

          <Line
            type="monotone"
            dataKey="productionKw"
            name="Production"
            stroke="#7ca91f"
            strokeWidth={3}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="consumptionKw"
            name="Consumption"
            stroke="#292d28"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}