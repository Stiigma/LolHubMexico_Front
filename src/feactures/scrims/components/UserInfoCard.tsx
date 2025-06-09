import React from "react";
import type { LinkUser } from "@/feactures/user/types/LinkUser";

const UserInfoCard: React.FC<{ user: LinkUser }> = ({ user }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white text-black rounded-lg shadow hover:bg-gray-100 w-full">
      <img
        src={user.player.profilePicture || "/default-avatar.png"}
        alt="Perfil"
        className="w-16 h-16 rounded-full object-cover border"
      />
      <div>
        <p className="font-bold text-base">{user.user.userName}</p>
        <p className="text-sm text-gray-600">Invocador: {user.player.summonerName}</p>
        <p className="text-sm text-gray-500">Nivel: {user.player.level}</p>
      </div>
    </div>
  );
};

export default UserInfoCard;