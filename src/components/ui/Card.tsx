import React from 'react';

interface CardProps {
  title: string;
  image?: string;
  children: React.ReactNode;
  width?: string;  // clases de Tailwind como 'w-[300px]' o 'w-full'
  height?: string; // clases de Tailwind como 'min-h-[500px]'
}

const Card: React.FC<CardProps> = ({
  title,
  image,
  children,
  width = 'w-[500px]',     // puedes cambiar esto al usarlo
  height = 'min-h-[350px]'       // valor por defecto si no mandas nada
}) => {
  return (
    <div
      className={`${width} ${height} rounded-2xl bg-gray-900 border border-blue-800 shadow-lg hover:shadow-blue-500/30 hover:scale-[1.03] transition-transform duration-300 p-4 flex flex-col items-center text-center`}
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-52 object-contain rounded-xl mb-4"
        />
      )}
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="text-sm text-gray-400 mt-2">{children}</p>
    </div>
  );
};

export default Card;



