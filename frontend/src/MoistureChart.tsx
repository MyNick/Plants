import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  {
    time: '17/11',
    moisture: 100,
  },
  {
    time: '18/11',
    moisture: 90,
  },
  {
    time: '19/11',
    moisture: 80,
  },
  {
    time: '20/11',
    moisture: 70,
  },
  {
    time: '21/11',
    moisture: 100,
  },
  {
    time: '22/11',
    moisture: 90,
  },
  {
    time: '23/11',
    moisture: 80,
  },
];

export default function MoistureChart() {
  return (
    <LineChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis dataKey="moisture" tickFormatter={(tick) => `${tick}%`} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="moisture" stroke="#8884d8" />
    </LineChart>
  );
}
