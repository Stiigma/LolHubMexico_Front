import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { getUserById, getPlayerById } from "@/feactures/user/services/userService";
import type { UserDTO } from "@/shared/types/User/UserDTO";
import type { PlayerDTO } from "@/feactures/user/types/PlayerDTO";

interface Props {
  onClose: () => void;
}

const ProfileModal: React.FC<Props> = ({ onClose }) => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [userComplete, setUserComplete] = useState<UserDTO | null>(null);
  const [userPlayer, setUserPlayer] = useState<PlayerDTO | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.idUser) return;

      try {
        const complete = await getUserById(user.idUser);
        setUserComplete(complete);

        try {
          const player = await getPlayerById(user.idUser);
          setUserPlayer(player);
        } catch {
          setUserPlayer(null); // si no está vinculado
        }
      } catch (err) {
        console.error("Error cargando perfil:", err);
      }
    };

    fetchData();
  }, [user]);

  const handleViewProfile = () => {
    onClose();
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  if (!userComplete) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-[#112a46] rounded-2xl p-6 w-full max-w-sm text-center text-white">
          <p>Cargando información del perfil...</p>
        </div>
      </div>
    );
  }

  const isLinked = userComplete.role === 3;

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
            src={userPlayer?.profilePicture || "/assets/avatars/avatar1.png"}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-white mb-4 object-cover"
          />
          <h2 className="text-xl font-bold">{userComplete.userName}</h2>
          <p className="text-sm text-gray-300">{userComplete.email}</p>

          <span
            className={`text-xs mt-2 px-3 py-1 rounded-full font-medium ${
              isLinked ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {isLinked ? "Usuario" : "No vinculado"}
          </span>

          <button
            onClick={handleViewProfile}
            className="mt-5 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold"
          >
            Ver Perfil
          </button>

          <button
            onClick={handleLogout}
            className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

