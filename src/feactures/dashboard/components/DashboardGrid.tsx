import React from 'react';

interface CardProps {
  title: string;
  image?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, image, children }) => {
  return (
    <div className="rounded-2xl overflow-hidden bg-gray-900 border border-blue-800 shadow-xl">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-4 text-white">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <div className="text-sm text-gray-300">{children}</div>
      </div>
    </div>
  );
};
