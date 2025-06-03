import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Tournament {
  id: number;
  name: string;
  description: string;
  image: string;
  date: string;
  status: string;
}

interface Team {
  id: number;
  name: string;
  logo: string;
  description: string;
}

const mockTournaments: Tournament[] = [
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

const mockTeamsRegistered: Team[] = [
  {
    id: 1,
    name: "Dragons Reign",
    logo: "/images/teams/dragons.png",
    description: "Dominan el carril superior con agresividad táctica.",
  },
  {
    id: 2,
    name: "BotLane Brawlers",
    logo: "/images/teams/brawlers.png",
    description: "ADC y soporte con sinergia brutal y picks impredecibles.",
  },
];

const TournamentDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tournamentId = Number(id);

  const [tournament] = useState(
    mockTournaments.find((t) => t.id === tournamentId)
  );

  const handleEdit = () => {
    navigate(`/tournaments/${tournament?.id}/edit`, { state: { tournament } });
  };

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este torneo?")) {
      alert("Torneo eliminado (simulado)");
      navigate("/tournaments");
    }
  };

  if (!tournament) {
    return <div className="text-white text-center mt-20">Torneo no encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white px-6 py-12">
      <div className="max-w-3xl mx-auto bg-[#112a46] p-6 rounded-xl shadow">
        <img
          src={tournament.image}
          alt={tournament.name}
          className="w-full h-60 object-cover rounded-lg mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{tournament.name}</h1>
        <p className="text-gray-300 mb-2">{tournament.description}</p>
        <p className="text-sm text-gray-400 mb-1">Fecha: {tournament.date}</p>
        <span
          className={`inline-block text-xs font-semibold px-3 py-1 rounded mb-4 ${
            tournament.status === "Abierto" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {tournament.status}
        </span>

        <div className="flex gap-4 mb-6">
          <button
            onClick={handleEdit}
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded font-semibold text-sm"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold text-sm"
          >
            Eliminar
          </button>
        </div>

        {/* Equipos inscritos */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Equipos Inscritos</h2>
          {mockTeamsRegistered.length === 0 ? (
            <p className="text-gray-400">No hay equipos inscritos aún.</p>
          ) : (
            <ul className="space-y-4">
              {mockTeamsRegistered.map((team) => (
                <li key={team.id} className="flex items-center gap-4 bg-[#0f2239] p-4 rounded-lg">
                  <img src={team.logo} alt={team.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h3 className="text-lg font-semibold">{team.name}</h3>
                    <p className="text-sm text-gray-300">{team.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentDetailPage;

