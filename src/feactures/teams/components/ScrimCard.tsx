// components/MatchCard.tsx (o scrims/components/ScrimCard.tsx si prefieres mantener la estructura)
import React from "react";
import type { ScrimDetail } from "@/feactures/scrims/types/ScrimDetail"; // Asegúrate de que la ruta sea correcta

interface MatchCardProps {
  scrim: ScrimDetail; // Recibe un objeto ScrimDetail completo
  engageIconUrl: string;
  pickIconUrl: string;
}

const MatchCard: React.FC<MatchCardProps> = ({
  scrim,
  engageIconUrl,
  pickIconUrl,
}) => {
  const allies = scrim.team1Players.map((player) => player.championName);
  const enemies = scrim.team2Players.map((player) => player.championName);

  return (
    // Contenedor principal de la tarjeta de partida
    <div
      className="
      relative overflow-hidden
      bg-gradient-to-br from-slate-900 to-slate-800 
      rounded-2xl 
      shadow-lg hover:shadow-xl 
      p-3 // Padding de la tarjeta principal
      flex flex-col // Cambiado a columna para el contenido interno
      space-y-4 // Espacio vertical entre los elementos internos (campeones, separador)
      transition-all duration-300 transform 
      hover:-translate-y-2 hover:scale-102
      border border-transparent hover:border-violet-700
      group
      mb-6 // Margen inferior para separar las tarjetas de partida
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

      {/* Fila de campeones y separador */}
      <div className="flex flex-nowrap items-center justify-center space-x-3 overflow-x-auto py-2 px-2 md:px-0">
        {/* Campeones aliados */}
        <div className="flex space-x-2">
          {allies.map((champ) => (
            <div
              key={champ}
              className="
                relative overflow-hidden
                bg-gradient-to-br from-purple-900/40 to-purple-800/30
                rounded-xl 
                shadow-lg hover:shadow-xl 
                p-1 
                flex-shrink-0 
                transition-all duration-300 transform 
                hover:-translate-y-1 hover:scale-105 
                border border-transparent hover:border-violet-700
                group cursor-pointer
              "
            >
              <div
                className="
                absolute inset-0 
                bg-gradient-to-br from-violet-900 via-transparent to-transparent 
                opacity-0 group-hover:opacity-10 
                transition-opacity duration-500 
                pointer-events-none
              "
              ></div>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${champ}.png`}
                alt={champ}
                className="
                  w-16 h-16 
                  rounded-xl 
                  object-cover
                  ring-2 ring-transparent group-hover:ring-violet-500 
                  transition-all duration-300
                  shadow-md
                "
              />
            </div>
          ))}
        </div>

        {/* Separador central */}
        <div className="flex flex-col items-center text-white space-y-3 mx-2 flex-shrink-0">
          <div className="flex space-x-3">
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full border border-blue-500 text-blue-500">
              Ally
            </span>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full border border-red-500 text-red-500">
              Enemy
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <img src={engageIconUrl} alt="Engage" className="w-8 h-8" />
            <span className="text-white text-xl font-bold">×</span>
            <img src={pickIconUrl} alt="Pick" className="w-8 h-8" />
          </div>
        </div>

        {/* Campeones enemigos */}
        <div className="flex space-x-2">
          {enemies.map((champ) => (
            <div
              key={champ}
              className="
                relative overflow-hidden
                bg-gradient-to-br from-red-900/40 to-red-800/30 
                rounded-xl 
                shadow-lg hover:shadow-xl 
                p-1 
                flex-shrink-0
                transition-all duration-300 transform 
                hover:-translate-y-1 hover:scale-105
                border border-transparent hover:border-red-700 
                group cursor-pointer
              "
            >
              <div
                className="
                absolute inset-0 
                bg-gradient-to-br from-red-900 via-transparent to-transparent 
                opacity-0 group-hover:opacity-10 
                transition-opacity duration-500 
                pointer-events-none
              "
              ></div>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${champ}.png`}
                alt={champ}
                className="
                  w-16 h-16 
                  rounded-xl 
                  object-cover
                  ring-2 ring-transparent group-hover:ring-red-500 
                  transition-all duration-300
                  shadow-md
                "
              />
            </div>
          ))}
        </div>
      </div>
      {/* Puedes añadir más detalles de la partida aquí si los tienes en ScrimDetail, por ejemplo: */}
      {/* <div className="text-gray-400 text-sm mt-4 text-center">
        <p>Fecha: {new Date(scrim.scrim.date).toLocaleDateString()}</p>
        <p>Resultado: {scrim.scrim.result}</p>
      </div> */}
    </div>
  );
};

export default MatchCard;
