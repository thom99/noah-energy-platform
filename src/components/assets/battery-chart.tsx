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
            strokeDasharray="3 4"
            stroke="#e8e2d7"
          />

          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#85765f" }}
          />

          <YAxis
            yAxisId="soc"
            axisLine={false}
            tickLine={false}
            unit="%"
          />

          <YAxis
            yAxisId="temperature"
            orientation="right"
            axisLine={false}
            tickLine={false}
            unit="°C"
          />

          <Tooltip />

          <Legend />

          <Line
            yAxisId="soc"
            type="monotone"
            dataKey="stateOfCharge"
            name="State of Charge"
            stroke="#d9a92f"
            strokeWidth={3}
            dot={false}
          />

          <Line
            yAxisId="temperature"
            type="monotone"
            dataKey="temperatureC"
            name="Temperature"
            stroke="#76604b"
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}