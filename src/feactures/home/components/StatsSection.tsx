import React from 'react';

const stats = [
  { label: 'Jugadores en línea', value: '85,742' },
  { label: 'Partidas activas', value: '4,600' },
  { label: 'eSports nuevos', value: '415' },
];

const StatsSection: React.FC = () => {
  return (
    <section className="w-full py-12 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 px-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="w-60 h-36 bg-gradient-to-br from-indigo-700 to-purple-800 rounded-xl shadow-lg flex flex-col items-center justify-center text-center p-4 hover:scale-105 transition-transform"
          >
            <div className="text-3xl font-extrabold text-yellow-300">{stat.value}</div>
            <div className="mt-2 text-sm uppercase text-gray-200 tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
