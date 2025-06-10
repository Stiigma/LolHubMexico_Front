// components/MatchHistory.tsx
import React from "react";
import MatchCard from "./ScrimCard"; // Importa el nuevo componente
import type { ScrimDetail } from "@/feactures/scrims/types/ScrimDetail"; // Asegúrate de la ruta

interface MatchHistoryProps {
  scrims: ScrimDetail[]; // Ahora recibe una lista de scrims
  engageIconUrl: string;
  pickIconUrl: string;
}

const MatchHistory: React.FC<MatchHistoryProps> = ({
  scrims,
  engageIconUrl,
  pickIconUrl,
}) => {
  return (
    // La section principal ahora contendrá una lista de MatchCards
    <section className="mt-16 px-4 items-center">
      {/* Ya no hay un h2 de título aquí, se movería al componente padre */}
      <div className="flex flex-col items-center space-y-6">
        {" "}
        {/* Espacio vertical entre cada tarjeta de partida */}
        {scrims.map((scrim) => (
          <MatchCard
            key={scrim.scrim.idScrim} // Asegúrate de tener un ID único para cada scrim
            scrim={scrim}
            engageIconUrl={engageIconUrl}
            pickIconUrl={pickIconUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default MatchHistory;
