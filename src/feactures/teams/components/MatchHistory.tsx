// src/features/teams/components/MatchHistory.tsx
import React from "react";
// Ya no necesitamos Link, useState, useEffect, getScrimDetailFull aquí.
import type { ScrimDetail } from "@/feactures/scrims/types/ScrimDetail";
import ScrimCard from "./ScrimCard"; // <-- Importa el nuevo ScrimCard

interface MatchHistoryProps {
  scrims: ScrimDetail[]; // Recibe la lista completa de ScrimDetail
  engageIconUrl: string; // <-- Ahora estas props son obligatorias
  pickIconUrl: string; // <-- Ahora estas props son obligatorias
}

const MatchHistory: React.FC<MatchHistoryProps> = ({
  scrims,
  engageIconUrl,
  pickIconUrl,
}) => {
  if (!scrims || scrims.length === 0) {
    return (
      <div className="text-gray-400 p-4 text-center">
        No hay scrims recientes para este equipo.
      </div>
    );
  }

  return (
    // La section principal ahora contendrá una lista de ScrimCard
    // Quitamos el mt-16 px-4 y items-center de aquí, ya que los pondremos en TeamDetail
    // Opcional: si quieres un espaciado consistente, puedes mantener el 'space-y-6'
    <div className="flex flex-col items-center space-y-6">
      {" "}
      {/* Mantén el espacio vertical entre tarjetas */}
      {scrims.map((scrim) => (
        <ScrimCard
          key={scrim.scrim.idScrim} // Asegúrate de tener un ID único para cada scrim
          scrim={scrim}
          engageIconUrl={engageIconUrl}
          pickIconUrl={pickIconUrl}
        />
      ))}
    </div>
  );
};

export default MatchHistory;
