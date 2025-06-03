import React from 'react';

interface AvatarModalProps {
  avatars: string[];
  onSelect: (url: string) => void;
  onClose: () => void;
}

const AvatarModal: React.FC<AvatarModalProps> = ({ avatars, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-blue-950 p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-white text-xl mb-4 text-center">Selecciona tu nuevo avatar</h2>
        <div className="grid grid-cols-3 gap-4">
          {avatars.map((url) => (
            <img
              key={url}
              src={url}
              alt="avatar"
              onClick={() => onSelect(url)}
              className="w-20 h-20 rounded-full border-2 cursor-pointer hover:brightness-110 hover:scale-105 transition"
            />
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 transition p-2 rounded text-white"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default AvatarModal;
