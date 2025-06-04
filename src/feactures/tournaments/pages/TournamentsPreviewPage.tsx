import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateTournamentModal from "../components/CreateTournamentModal"; // Asegúrate de tener este archivo creado

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

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white px-6 py-12">
      <div className="flex justify-between items-center mb-10 max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold">Torneos Activos</h1>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
          onClick={() => setShowModal(true)} // ✅ Usamos modal
        >
          Crear Torneo
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tournaments.map((tournament) => (
          <div
            key={tournament.id}
            className="bg-[#112a46] rounded-xl overflow-hidden shadow hover:scale-105 transition cursor-pointer"
            onClick={() => navigate(`/tournaments/${tournament.id}`)}
          >
            <img
              src={tournament.image}
              alt={tournament.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-bold">{tournament.name}</h3>
              <p className="text-sm text-gray-300">{tournament.description}</p>
              <div className="text-xs text-gray-400">Fecha: {tournament.date}</div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  tournament.status === "Abierto"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {tournament.status}
              </span>
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


