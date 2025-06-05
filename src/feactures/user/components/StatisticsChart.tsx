import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { mes: 'Ene', torneos: 2, scrims: 5 },
  { mes: 'Feb', torneos: 1, scrims: 3 },
  { mes: 'Mar', torneos: 3, scrims: 4 },
  { mes: 'Abr', torneos: 0, scrims: 2 },
  { mes: 'May', torneos: 2, scrims: 6 },
  { mes: 'Jun', torneos: 4, scrims: 3 },
  { mes: 'Jul', torneos: 1, scrims: 1 },
  { mes: 'Ago', torneos: 3, scrims: 2 },
];

const StatisticsChart = () => {
  return (
    <div className="bg-[#1e293b] p-6 rounded-xl shadow w-full">
      <h3 className="text-white text-lg font-semibold mb-4">Estadísticas de Participación</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="mes" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} labelStyle={{ color: 'white' }} />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ color: 'white' }} />
          <Line type="monotone" dataKey="torneos" stroke="#60a5fa" strokeWidth={2} dot={{ r: 4 }} name="Torneos" />
          <Line type="monotone" dataKey="scrims" stroke="#f87171" strokeWidth={2} dot={{ r: 4 }} name="Scrims" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatisticsChart;
