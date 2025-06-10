import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { getPlayerById } from "@/feactures/user/services/userService";
import type { PlayerDTO } from "@/feactures/user/types/PlayerDTO";

import { FaBell, FaComments, FaUsers, FaPlus } from "react-icons/fa";

interface Props {
  onProfileClick?: () => void; // ✅ ahora opcional
}

const UserActionsPanel: React.FC<Props> = ({ onProfileClick }) => {
  const { user } = useUser();
  const [player, setPlayer] = useState<PlayerDTO | null>(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      if (!user?.idUser) return;
      try {
        const result = await getPlayerById(user.idUser);
        setPlayer(result);
      } catch (error) {
        console.error("Error fetching player:", error);
      }
    };

    fetchPlayer();
  }, [user]);

  return (
    <div className="flex flex-col items-center bg-transparent text-white space-y-6">
      {/* Avatar + nombre del usuario */}
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => onProfileClick?.()} // ✅ solo si se define
      >
        <img
          src={player?.profilePicture || "/assets/avatars/avatar1.png"}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-white object-cover"
        />
        <p className="text-xs font-semibold mt-1">{user?.userName || "Usuario"}</p>
      </div>

      {/* Iconos de acción */}
      <div className="flex flex-col items-center space-y-4 mt-4 text-lg">
        <FaBell className="hover:text-blue-400 cursor-pointer" title="Notificaciones" />
        <FaUsers className="hover:text-blue-400 cursor-pointer" title="Amigos" />
        <FaComments className="hover:text-blue-400 cursor-pointer" title="Chats" />
        <FaPlus className="hover:text-blue-400 cursor-pointer" title="Agregar" />
      </div>
    </div>
  );
};

export default UserActionsPanel;



