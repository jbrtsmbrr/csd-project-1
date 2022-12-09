import React from "react";
import { useMostRated } from "../../../api/dashboard";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "@mui/material";
import Loading from "../../../components/Loading";

const CustomLabel = () => <div>Most Rated Capstones</div>;

const MostRated = () => {
  const { data, error } = useMostRated();
  const chartData = React.useMemo(() => {
    if (!data?.capstone) return [];
    return data.capstone.map(({ title, rate }) => {
      return {
        title,
        rate,
      };
    });
  }, [data]);

  if (!data?.capstone) return <Loading />;

  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5">Most Rated Capstones</Typography>
      <BarChart
        // margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        width={1000}
        height={400}
        data={chartData}
        // layout="vertical"
      >
        <CartesianGrid strokeDasharray="5 5" />
        <YAxis dataKey="rate" type="number" domain={[1, 5]} />
        <XAxis dataKey="title" type="category" />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="rate"
          fill="#8884d8"
          legendType="none"
          label={<CustomLabel />}
        />
      </BarChart>
    </div>
  );
};

export default MostRated;
