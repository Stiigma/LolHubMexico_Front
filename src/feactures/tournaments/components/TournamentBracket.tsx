// src/components/TournamentBracket.tsx

import React from "react";
import TournamentCard from "../components/TournamentCard";

interface Team {
  name: string;
  logo: string;
}

interface Match {
  team1: Team | null;
  team2: Team | null;
  winner: string | null;
}

interface TournamentBracketProps {
  teams: Team[];
}

const generateBracketRounds = (teams: Team[]): Match[][] => {
  const rounds: Match[][] = [];

  const round1: Match[] = [];
  for (let i = 0; i < teams.length; i += 2) {
    round1.push({
      team1: teams[i],
      team2: teams[i + 1] || null,
      winner: teams[i]?.name || null, // ← TEMPORAL: simula que el primero gana
    });
  }
  rounds.push(round1);

  let prevRound = round1;
  while (prevRound.length > 1) {
    const nextRound: Match[] = [];
    for (let i = 0; i < prevRound.length; i += 2) {
      nextRound.push({
        team1: null,
        team2: null,
        winner: null,
      });
    }
    rounds.push(nextRound);
    prevRound = nextRound;
  }

  return rounds;
};

const BracketMatch = ({ match }: { match: Match }) => (
  <div className="relative flex flex-col space-y-6 items-start">
    <TournamentCard
      name={match.team1?.name || "Pendiente"}
      logo={match.team1?.logo || "/assets/logos/placeholder.png"}
      winner={match.winner === match.team1?.name}
    />
    <TournamentCard
      name={match.team2?.name || "Pendiente"}
      logo={match.team2?.logo || "/assets/logos/placeholder.png"}
      winner={match.winner === match.team2?.name}
    />
    <div className="absolute left-full top-[50%] w-16 h-0.5 bg-white/30" />
  </div>
);

const TournamentBracket: React.FC<TournamentBracketProps> = ({ teams }) => {
  const rounds = generateBracketRounds(teams);

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white p-12 overflow-x-auto">
      <h1 className="text-4xl font-extrabold text-center mb-12">
        🏆 Cuadro de Eliminatorias ({teams.length} equipos)
      </h1>

      <div
        className={`w-[1800px] mx-auto grid grid-cols-${rounds.length} gap-x-20 items-start`}
      >
        {rounds.map((round, roundIndex) => (
          <div
            key={roundIndex}
            className="flex flex-col justify-around h-[850px]"
          >
            {round.map((match, matchIndex) => (
              <BracketMatch key={matchIndex} match={match} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentBracket;

