import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BarChartComponent({
  data,
  width = 500,
  height = 300,
  margin = {},
  colors = [],
}: {
  data: {
    [key: string]: number | string;
  }[];
  width?: number;
  height?: number;
  margin?: {
    top?: number;
    right?: number;
    left?: number;
    bottom?: number;
  };
  colors?: string[];
}) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart
        width={width}
        height={height}
        data={data}
        margin={margin}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        {/* <YAxis /> */}
        <Tooltip />
        {data[0] && Object.keys(data[0]).map((key, index) => (
          key !== 'name' && (
            <Bar
                key={key}
              dataKey={key}
              stackId="a"
              fill={colors[index - 1] || '#8884d8'}
            />
          )
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
