import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
// import  ProfileModal  from "@/context/ProfileModalContext";
import { getPlayerById } from "@/feactures/user/services/userService";
import type { PlayerDTO } from "@/feactures/user/types/PlayerDTO";

import { FaBell, FaComments, FaUsers, FaPlus } from "react-icons/fa";

const UserActionsPanel: React.FC = () => {
  const { user } = useUser();
  // const { openProfileModal } = ProfileModal();
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
        //onClick={openProfileModal}
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
