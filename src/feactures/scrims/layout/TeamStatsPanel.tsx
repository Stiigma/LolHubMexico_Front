import React from "react";
import type { PlayerStats } from "@/feactures/user/types/PlayerStats";
import PlayerStatsCard from "../components/PlayerStatsCard";
interface TeamStatsPanelProps {
  teamName: string;
  teamLogo: string;
  players: PlayerStats[];
}

const TeamStatsPanel: React.FC<TeamStatsPanelProps> = ({ teamName, teamLogo, players }) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={teamLogo}
          alt={`${teamName} logo`}
          className="w-12 h-12 rounded-full object-cover border"
        />
        <h2 className="text-xl font-semibold">{teamName}</h2>
      </div>

      <div className="flex flex-col gap-4">
        {players.map((player) => (
          <div key={player.userName}>
            <PlayerStatsCard player={player} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamStatsPanel;
