import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateTournamentModal from "../components/CreateTournamentModal";
import TournamentHeroBanner from "../components/TournamentHeroBanner"; // Importa el nuevo componente de banner

// Datos estáticos de ejemplo para los torneos
const tournaments = [
  {
    id: 1,
    name: "League Clash LAN",
    description: "Compite por la gloria regional",
    image: "/images/tournaments/clash_lan.png",
    date: "2025-06-20",
    status: "Abierto",
  },
  {
    id: 2,
    name: "Hextech Cup",
    description: "Solo para valientes nivel Diamante+",
    image: "/images/tournaments/hextech_cup.png",
    date: "2025-07-05",
    status: "Cerrado",
  },
  {
    id: 3,
    name: "ARAM Fiesta",
    description: "Diversión sin parar en el puente del abismo",
    image: "/images/tournaments/aram_fiesta.png",
    date: "2025-06-30",
    status: "Abierto",
  },
];

const TournamentsPreviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Función para manejar el clic en el botón "Participar"
  const handleJoin = (id: number, status: string) => {
    // Solo permite la navegación si el torneo está "Abierto"
    if (status === "Abierto") {
      navigate(`/tournaments/${id}/bracket`); // Navega a la página del bracket del torneo
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white px-6 py-12">
      {/* Componente Hero Banner para la sección de torneos */}
      {/* Pasa la función para abrir el modal al hacer clic en el botón "Crear Torneo" del banner */}
      <TournamentHeroBanner onCreateTournament={() => setShowModal(true)} />

      {/* Sección de "Próximos Torneos" */}
      <h2 className="text-3xl font-extrabold text-white mb-6 text-center max-w-6xl mx-auto">
        Próximos Torneos
      </h2>
      {/* Contenedor para la lista de torneos, usando flexbox para apilar verticalmente */}
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        {/* Mapea sobre el array de torneos para renderizar cada uno */}
        {tournaments.map((tournament) => (
          <div
            key={tournament.id} // Clave única para cada elemento de la lista
            // Clases de Tailwind ajustadas para mejorar la apariencia de la lista
            className="bg-[#112a46] rounded-xl shadow-md p-6 flex flex-col md:flex-row md:items-center justify-between hover:shadow-lg transition transform hover:scale-105"
          >
            <div className="flex-1 mb-4 md:mb-0"> {/* Flex-1 para que ocupe el espacio disponible */}
              <h3 className="text-xl font-bold mb-1">{tournament.name}</h3> {/* Margen inferior ajustado */}
              <p className="text-sm text-gray-300">{tournament.description}</p>
              <div className="text-xs text-gray-400 mt-2">Fecha: {tournament.date}</div>
            </div>
            <div className="flex flex-row items-center gap-4"> {/* Cambiado a flex-row para botones y estado */}
              {/* Indicador de estado del torneo (Abierto/Cerrado) */}
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  tournament.status === "Abierto"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {tournament.status}
              </span>
              {/* Botón "Participar" o "Cerrado" */}
              <button
                onClick={() => handleJoin(tournament.id, tournament.status)}
                disabled={tournament.status !== "Abierto"} // Deshabilita el botón si no está abierto
                className={`px-6 py-2 rounded-lg font-semibold transition duration-300 ease-in-out ${
                  tournament.status === "Abierto"
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                    : "bg-gray-600 text-gray-300 cursor-not-allowed"
                }`}
              >
                {tournament.status === "Abierto" ? "Participar" : "Cerrado"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para crear torneo */}
      {showModal && <CreateTournamentModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default TournamentsPreviewPage;

