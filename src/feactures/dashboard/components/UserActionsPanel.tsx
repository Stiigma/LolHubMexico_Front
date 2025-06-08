import { useUser } from '../../../context/UserContext';
import { useProfileModal } from '../../../context/ProfileModalContext';
import { FaBell, FaComments, FaUsers, FaPlus } from 'react-icons/fa';
import type { PlayerDTO } from '@/feactures/user/types/PlayerDTO';
import { getPlayerById } from '@/feactures/user/services/userService';
import React, { useEffect, useState } from "react";

const UserActionsPanel = () => {
  const { user } = useUser();
  const { openProfileModal } = useProfileModal();
  const [player, setPlayer] = useState<PlayerDTO | null>(null);
    useEffect(() => {
    const fetchPlayer = async () => {
      if (!user?.idUser) return;
      const result = await getPlayerById(user.idUser);
      setPlayer(result); // Aquí asumes que tienes un setPlayer
    };
  
    fetchPlayer();
  }, [user]);
  return (
    <div className="flex flex-col items-center bg-transparent text-white space-y-6">
      {/* Avatar y nombre del usuario */}
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={openProfileModal}
      >
        <img
          src={player?.profilePicture || '/assets/avatars/avatar1.png'}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-white object-cover"
        />
        <p className="text-xs font-semibold mt-1">{user?.userName || 'Usuario'}</p>
      </div>

      {/* Iconos de acción */}
      <div className="flex flex-col items-center space-y-4 mt-4 text-lg">
        <FaBell className="hover:text-blue-400 cursor-pointer" />
        <FaUsers className="hover:text-blue-400 cursor-pointer" />
        <FaComments className="hover:text-blue-400 cursor-pointer" />
        <FaPlus className="hover:text-blue-400 cursor-pointer" />
      </div>
    </div>
  );
};

export default UserActionsPanel;


