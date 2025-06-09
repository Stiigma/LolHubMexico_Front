import React from "react";
import type { TeamMemberDTO } from "../types/TeamMemberDTO";

interface Props {
  member: TeamMemberDTO;
}

const MemberCard: React.FC<Props> = ({ member }) => {
  const player = member.player;
  const avatarUrl =
    player?.profilePicture || member.imagePath || "/assets/default-avatar.png";

  const displayName = player?.summonerName || member.userName;
  const joined = member.join_date
    ? new Date(member.join_date).toLocaleDateString()
    : "—";

  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg p-4 flex items-center space-x-4 hover:shadow-xl transition-shadow duration-200">
      {/* Avatar */}
      <img
        src={avatarUrl}
        alt={displayName}
        className="w-16 h-16 rounded-full ring-2 ring-violet-500 object-cover"
      />

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-white text-lg font-semibold truncate">
          {displayName}
        </h4>
        {member.Username && (
          <p className="text-gray-400 text-xs truncate">
            Usuario: {member.Username}
          </p>
        )}
        {member.email && (
          <p className="text-gray-400 text-xs truncate">
            Email: {member.email}
          </p>
        )}
        {member.role && (
          <p className="text-gray-400 text-sm">Rol: {member.role}</p>
        )}
        {/* Removed level display since not provided by DTO */}
        <p className="text-gray-500 text-xs">Ingresó: {joined}</p>
        {member.linkSummoner && (
          <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-green-600 text-white rounded-full">
            Summoner Link OK
          </span>
        )}
      </div>
    </div>
  );
};

export default MemberCard;
