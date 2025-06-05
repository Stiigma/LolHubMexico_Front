import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  onClose: () => void;
  user: {
    username: string;
    email: string;
    role: string;
    avatarUrl: string;
  };
}

const ProfileModal: React.FC<Props> = ({ onClose, user }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    onClose();
    navigate("/profile");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#112a46] rounded-2xl p-6 w-full max-w-sm relative shadow-xl">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl hover:text-red-400"
        >
          ✕
        </button>

        {/* Contenido */}
        <div className="flex flex-col items-center text-white">
          <img
            src={user.avatarUrl}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-white mb-4 object-cover"
          />
          <h2 className="text-xl font-bold">{user.username}</h2>
          <p className="text-sm text-gray-300">{user.email}</p>
          <span className="text-xs mt-2 bg-gray-700 px-3 py-1 rounded-full">
            Rol: {user.role}
          </span>

          <button
            onClick={handleViewProfile}
            className="mt-5 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold"
          >
            Ver Perfil
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;


