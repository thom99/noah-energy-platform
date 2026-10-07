"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type BatteryHistoryPoint = {
  time: string;
  stateOfCharge: number;
  powerKw: number;
  temperatureC: number;
};

type BatteryChartProps = {
  data: BatteryHistoryPoint[];
};

export function BatteryChart({
  data,
}: BatteryChartProps) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="#e5e5e5"
          />

          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="stateOfCharge"
            name="State of Charge"
            stroke="#7ca91f"
            strokeWidth={3}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="temperatureC"
            name="Temperature"
            stroke="#d97706"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}