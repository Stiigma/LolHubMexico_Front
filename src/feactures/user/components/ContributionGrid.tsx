import React from "react";



// Genera datos falsos (puedes adaptarlo a tus scrims reales)
const generateData = () => {
  const grid = Array.from({ length: 53 }, () =>
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 4))
  );
  return grid;
};

const ContributionGrid: React.FC = () => {
  const data = generateData();

  const getColor = (value: number) => {
    switch (value) {
      case 0: return "bg-gray-800";
      case 1: return "bg-green-700";
      case 2: return "bg-green-600";
      case 3: return "bg-green-500";
      default: return "bg-green-400";
    }
  };

  return (
    <div className="bg-[#0D1117] p-4 rounded border border-gray-700 text-white w-full overflow-x-auto">
      <div className="text-sm mb-2">Contribuciones este año</div>

      <div className="flex items-start space-x-1">
        {data.map((week, i) => (
          <div key={i} className="flex flex-col space-y-1">
            {week.slice(0, 3).map((value, j) => (
              <div
                key={j}
                className={`w-4 h-4 rounded-sm ${getColor(value)}`}
                title={`${value} contribuciones`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-3 text-xs text-gray-400">
        <div className="flex space-x-2 items-center">
          <span>Menos</span>
          {[0, 1, 2, 3].map((v) => (
            <div key={v} className={`w-4 h-4 rounded-sm ${getColor(v)}`} />
          ))}
          <span>Más</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionGrid;
