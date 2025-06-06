import React from "react";
import type { TeamMemberDTO } from "../types/TeamMemberDTO";

interface Props {
  member: TeamMemberDTO;
}

const MemberTeam: React.FC<Props> = ({ member }) => {
  return (
    <div className="bg-[#112a46] p-4 rounded-lg shadow flex items-center gap-4">
      <div className="w-14 h-14 bg-gray-600 rounded-full overflow-hidden">
        {member.linkSummoner && member.player?.profilePicture ? (
          <img src={member.player.profilePicture} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-xl font-bold">
            {member.Username?.charAt(0).toUpperCase() ?? "?"}
          </div>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-white font-semibold text-lg">
          {member.Username ?? "Desconocido"}
        </h3>
        <p className="text-sm text-gray-300">
          Cuenta LoL: {member.linkSummoner ? member.player?.summonerName : "No vinculada"}
        </p>

        {member.linkSummoner && (
          <>
            <p className="text-sm text-gray-400">
              Nivel: {member.player?.level}
            </p>
            <p className="text-sm text-gray-400">
              Rol Principal: {member.player?.mainRole}
            </p>
          </>
        )}

        <p className="text-sm text-gray-400 mt-1">
          Ingreso: {new Date(member.join_date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default MemberTeam;