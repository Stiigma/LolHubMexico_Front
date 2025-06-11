import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateTournamentModal from "../components/CreateTournamentModal";
import TournamentHeroBanner from "../components/TournamentHeroBanner"; // Importa el nuevo componente de banner
import { getTorneosPendientes } from "../services/tournamentService";
import type { TournamentEnriched } from "../types/Tournament";

// Datos estáticos de ejemplo para los torneos
const TournamentsPreviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [tournaments, setTournaments] = useState<TournamentEnriched[]>([]);
  // Función para manejar el clic en el botón "Participar"
  const handleJoin = (id: number, status: number) => {
    // Solo permite la navegación si el torneo está "Abierto"
    if (status === 0) {
      navigate(`/tournaments/${id}/bracket`); // Navega a la página del bracket del torneo
    }
  };

  useEffect(() => {
  const fetchTorneos = async () => {
    const response = await getTorneosPendientes();
    console.log(response); // Debería mostrar: { created: true, createdTeam: [...] }
    setTournaments(response || []); // Extrae solo el array de torneos
  };

  fetchTorneos();
}, []);

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
        {tournaments.map((tournament) => {
  // Determinar texto y color según el estado numérico
  const estadoTexto = {
    0: "Abierto",
    1: "Lleno",
    2: "En proceso",
    3: "Terminado",
  }[tournament.estado];

  const estadoColor = {
    0: "bg-green-600",
    1: "bg-yellow-600",
    2: "bg-blue-500",
    3: "bg-gray-600",
  }[tournament.estado];

  return (
    <div
      key={tournament.idTorneo}
      className="bg-[#112a46] rounded-xl shadow-md p-6 flex flex-col md:flex-row md:items-center justify-between hover:shadow-lg transition transform hover:scale-105"
    >
      <div className="flex-1 mb-4 md:mb-0">
        <h3 className="text-xl font-bold mb-1">{tournament.nombre}</h3>
        <p className="text-sm text-gray-300">{tournament.descripcion}</p>
        <div className="text-xs text-gray-400 mt-2">
          Fecha: {new Date(tournament.fechaInicio).toLocaleDateString()}
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${estadoColor}`}
        >
          {estadoTexto}
        </span>
        <button
          onClick={() => handleJoin(tournament.idTorneo, tournament.estado)}
          disabled={tournament.estado !== 0}
          className={`px-6 py-2 rounded-lg font-semibold transition duration-300 ease-in-out ${
            tournament.estado === 0
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              : "bg-gray-600 text-gray-300 cursor-not-allowed"
          }`}
        >
          {tournament.estado === 0 ? "Participar" : "No disponible"}
        </button>
      </div>
    </div>
  );
})}
      </div>

      {/* Modal para crear torneo */}
      {showModal && <CreateTournamentModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default TournamentsPreviewPage;

