// src/features/teams/components/MemberCard.tsx
import React from "react";
import type { TeamMemberDTO } from "../types/TeamMemberDTO";
import { Link } from "react-router-dom"; // ¡Importar Link!

interface Props {
  member: TeamMemberDTO;
}

const MemberCard: React.FC<Props> = ({ member }) => {
  const player = member.player;
  // Fallback para la URL del avatar
  const avatarUrl =
    player?.profilePicture || member.imagePath || "/assets/default-avatar.png";

  // Usar summonerName si existe, de lo contrario, userName
  const displayName = player?.summonerName || member.userName;
  const joined = member.join_date
    ? new Date(member.join_date).toLocaleDateString()
    : "—";

  return (
    // Envuelve toda la tarjeta con el componente Link.
    // La URL de destino será /player/:idUser
    <Link to={`/player/${member.idUser}`}>
      <div
        className="
        relative overflow-hidden
        bg-gradient-to-br from-slate-900 to-slate-800
        rounded-2xl
        shadow-lg hover:shadow-xl
        p-4 // Padding de la tarjeta principal
        flex items-center space-x-4
        transition-all duration-300 transform
        hover:-translate-y-2 hover:scale-102
        border border-transparent hover:border-violet-700
        group cursor-pointer // Añadimos cursor-pointer para indicar que es clickeable
      "
      >
        {/* Elemento de brillo sutil en el fondo al pasar el ratón */}
        <div
          className="
          absolute inset-0
          bg-gradient-to-br from-violet-900 via-transparent to-transparent
          opacity-0 group-hover:opacity-10
          transition-opacity duration-500
          pointer-events-none
        "
        ></div>

        {/* Avatar */}
        <img
          src={avatarUrl}
          alt={displayName}
          className="w-16 h-16 rounded-full ring-2 ring-violet-500 object-cover
            transition-all duration-300 group-hover:ring-violet-400 group-hover:scale-105" // Efecto al pasar el ratón
        />

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h4 className="text-white text-lg font-semibold truncate">
            {displayName}
          </h4>
          {/* member.Username ya es member.userName en TeamMemberDTO */}
          {member.userName && (
            <p className="text-gray-400 text-xs truncate">
              Usuario: {member.userName}
            </p>
          )}
          {member.email && (
            <p className="text-gray-400 text-xs truncate">
              Email: {member.email}
            </p>
          )}
          {member.player?.mainRole && (
            <p className="text-gray-400 text-sm">
              Rol: {member.player?.mainRole}
            </p>
          )}
          <p className="text-gray-500 text-xs">Ingresó: {joined}</p>
          {member.linkSummoner && (
            <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-green-600 text-white rounded-full">
              Summoner Link OK
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MemberCard;
