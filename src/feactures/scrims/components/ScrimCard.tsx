import React from 'react';

interface ScrimCardProps {
  teamName: string;
  playerIcons: string[];
  gamestyle?: string;
  scalingLevel?: 'low' | 'medium' | 'high';
  onClick?: () => void;
}

const getScalingColors = (level: 'low' | 'medium' | 'high') => {
  switch (level) {
    case 'low':
      return ['bg-red-500', 'bg-red-500', 'bg-red-500'];
    case 'medium':
      return ['bg-yellow-400', 'bg-yellow-400', 'bg-yellow-400'];
    case 'high':
      return ['bg-green-500', 'bg-green-500', 'bg-green-500'];
    default:
      return ['bg-gray-500'];
  }
};

const ScrimCard: React.FC<ScrimCardProps> = ({
  teamName,
  playerIcons,
  gamestyle = 'Pick',
  scalingLevel = 'medium',
  onClick,
}) => {
  const scalingBars = getScalingColors(scalingLevel);

  return (
    <div
      onClick={onClick}
      className="bg-gray-800 hover:bg-gray-700 transition cursor-pointer p-4 rounded-xl flex justify-between items-center shadow-md"
    >
      <div>
        <h3 className="text-lg font-semibold mb-2">{teamName}</h3>
        <div className="flex gap-2">
          {playerIcons.map((icon, index) => (
            <img
              key={index}
              src={icon}
              alt={`Player ${index + 1}`}
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>
      </div>

      <div className="text-right hidden md:block">
        <p className="text-sm text-gray-400">Gamestyle</p>
        <p className="text-md font-semibold">{gamestyle}</p>
        <p className="text-sm text-gray-400 mt-1">Scaling</p>
        <div className="flex gap-1 mt-1">
          {scalingBars.map((color, index) => (
            <span key={index} className={`w-4 h-1 ${color} rounded`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrimCard;


