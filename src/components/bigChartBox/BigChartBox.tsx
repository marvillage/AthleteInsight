import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./bigChartBox.scss";

const data = [
  {
    name: "Sun",
    heartRate: 85,
    caloriesBurned: 2200,
    hydration: 2.5,
  },
  {
    name: "Mon",
    heartRate: 90,
    caloriesBurned: 2400,
    hydration: 2.7,
  },
  {
    name: "Tue",
    heartRate: 88,
    caloriesBurned: 2300,
    hydration: 2.8,
  },
  {
    name: "Wed",
    heartRate: 92,
    caloriesBurned: 2500,
    hydration: 2.6,
  },
  {
    name: "Thu",
    heartRate: 87,
    caloriesBurned: 2100,
    hydration: 2.4,
  },
  {
    name: "Fri",
    heartRate: 94,
    caloriesBurned: 2600,
    hydration: 2.9,
  },
  {
    name: "Sat",
    heartRate: 89,
    caloriesBurned: 2400,
    hydration: 2.7,
  },
];

const BigChartBox = () => {
  return (
    <div className="bigChartBox">
      <h1>Athlete Performance Metrics</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="hydration"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="caloriesBurned"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="heartRate"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;
