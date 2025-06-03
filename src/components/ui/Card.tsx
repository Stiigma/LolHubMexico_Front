import React from 'react';

interface CardProps {
  title: string;
  image?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, image, children }) => {
  return (
    <div className="w-full max-w-xs rounded-2xl bg-gray-900 border border-blue-800 shadow-lg hover:shadow-blue-500/30 hover:scale-[1.03] transition-transform duration-300 p-4 flex flex-col items-center text-center">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-70 object-cover rounded-xl mb-4"
        />
      )}
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="text-sm text-gray-400 mt-2">{children}</p>
    </div>
  );
};

export default Card;



