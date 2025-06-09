// src/features/teams/components/TeamCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import type { Team } from "../../../shared/data/teams";

interface Props {
  team: Team;
}

const TeamCard: React.FC<Props> = ({ team }) => (
  <Link
    to={`/teams/${team.id}`}
    className="
      group 
      block 
      bg-[#10173a] 
      rounded-2xl 
      overflow-hidden 
      shadow-lg 
      hover:shadow-2xl 
      transition-shadow 
      duration-200
    "
  >
    <div className="relative">
      {/* Logo */}
      <img
        src={team.logoUrl}
        alt={team.name}
        className="
          w-full 
          h-48 
          object-contain 
          p-6 
          mx-auto 
          group-hover:scale-110 
          transition-transform 
          duration-300
        "
      />

      {/* Overlay con nombre al hover */}
      <div
        className="
        absolute inset-0 
        bg-[#0c0222]/75 
        opacity-0 
        group-hover:opacity-100 
        transition-opacity 
        duration-200 
        flex items-center justify-center
      "
      >
        <h3 className="text-white text-lg font-bold text-center px-4">
          {team.name}
        </h3>
      </div>
    </div>
  </Link>
);

export default TeamCard;
