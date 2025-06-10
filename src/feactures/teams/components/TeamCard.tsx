// src/features/teams/components/TeamCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import type { Team } from "../../../shared/data/teams";

interface Props {
  team: Team;
}

const TeamCard: React.FC<Props> = ({ team }) => {
  // Determina el color de la sombra glow basado en el estado
  const glowColorClass =
    team.status === "Abierto"
      ? "hover:shadow-green-500/50" // Sombra verde para estado 'Abierto'
      : "hover:shadow-red-500/50"; // Sombra roja para estado 'Cerrado'

  return (
    <Link
      to={`/teams/${team.id}`}
      className={`
        group
        block
        bg-purple-700/10           // Tu fondo transparente actual
        rounded-2xl
        overflow-hidden
        
        shadow-lg
        hover:shadow-xl          // Sombra más grande al hacer hover para el efecto "glow"
        ${glowColorClass}        // Aplica el color de la sombra dinámicamente
        transition-shadow        // Transición suave para el efecto de sombra
        duration-200
        flex
        items-center             // Centra verticalmente el contenido
        justify-center           // Centra horizontalmente el contenido
        h-40                     // <-- CAMBIO: Altura fija de la tarjeta. Puedes ajustar este valor (ej. h-48, h-32)
        relative                 // Necesario para el inset-0 del overlay
        p-4                      // Padding general para la tarjeta
      `}
    >
      {/* Contenido de la tarjeta (SOLO el logo visible, el nombre al hover) */}
      {/* Ya no hay un div de 'contenido' separado. Todo va aquí. */}

      <img
        src={team.logoUrl}
        alt={team.name}
        className="
            max-h-full               // Se ajusta a la altura del padre (h-40)
            max-w-full               // Se ajusta al ancho del padre
            object-contain
            transition-transform
            duration-300
            group-hover:scale-110
          "
      />

      {/* Overlay con nombre al hover (invisible por defecto) */}
      {/* Este div cubre TODO el contenido de la tarjeta al hacer hover, mostrando solo el nombre del equipo */}
      <div
        className="
            absolute inset-0
            bg-[#0c0222]/75          // Fondo oscuro semi-transparente para el overlay
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-300
            flex items-center justify-center // Centra el texto del overlay
            p-4
            text-center
          "
      >
        <h3 className="text-white text-xl font-bold truncate">{team.name}</h3>
      </div>
    </Link>
  );
};

export default TeamCard;
