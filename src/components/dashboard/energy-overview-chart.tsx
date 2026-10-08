"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
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
        <ComposedChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -10,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="production-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f3c65a" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#f3c65a" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 4"
            vertical={false}
            stroke="#e8e2d7"
          />

          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#85765f" }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#85765f" }}
            unit="kW"
          />

          <Tooltip
            contentStyle={{
              borderRadius: 10,
              border: "1px solid #e7e2d8",
            }}
          />

          <Legend/>

          <Area
            type="monotone"
            dataKey="productionKw"
            name="Production"
            stroke="#d9a92f"
            fill="url(#production-fill)"
            strokeWidth={3}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="consumptionKw"
            name="Consumption"
            stroke="#76604b"
            strokeDasharray="5 5"
            strokeWidth={3}
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}