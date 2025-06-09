// src/features/teams/pages/MyTeamPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import type { Team } from "../types/Team";
import { getMyTeam, searchUsersByName } from "../services/teamService";
import { Settings, BarChart2, UserPlus } from "lucide-react";
import type { UserSearchDTO } from "../../auth/types/UserSearchDTO";
import type { TeamMemberDTO } from "../types/TeamMemberDTO";
import { getTeamMembersEnriched } from "../services/teamService";
import MemberTeam from "../components/MemberCard";
import { inviteUserToTeam } from "../services/teamService";

const MyTeamPage: React.FC = () => {
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<UserSearchDTO[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const { user } = useUser();
  const navigate = useNavigate();
  const [members, setMembers] = useState<TeamMemberDTO[]>([]);

  useEffect(() => {
    if (!user?.idUser) return;

    getMyTeam(user.idUser)
      .then(async (fetchedTeam) => {
        setTeam(fetchedTeam);
        console.log(fetchedTeam);

        // Ahora que tienes el equipo, obtén los miembros
        const enrichedMembers = await getTeamMembersEnriched(
          fetchedTeam.idTeam
        );
        setMembers(enrichedMembers);
      })
      .catch(() => setError("Error al obtener tu equipo"))
      .finally(() => setLoading(false));
  }, [user]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setSearchLoading(true);
    try {
      const results = await searchUsersByName(searchTerm.trim());
      setSearchResults(results);
    } catch (err) {
      console.error("Error buscando usuarios:", err);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleInvite = async (targetUserId: number) => {
    if (!user || !team) return;

    try {
      await inviteUserToTeam({
        idTeam: team.idTeam,
        idUser: targetUserId,
        invitedBy: user.idUser,
        message: "¡Únete a nuestro equipo competitivo!",
      });
      alert("Invitación enviada con éxito.");
      setShowInviteModal(false);
    } catch (error) {
      alert("No se pudo enviar la invitación.");
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center mt-20 animate-pulse">
        <p className="text-xl">Cargando tu equipo...</p>
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="text-white text-center mt-20">
        <h1 className="text-4xl font-bold">No se encontró tu equipo</h1>
        <p className="text-gray-400 mt-2">
          Aún no formas parte de ningún equipo competitivo.
        </p>
        <button
          onClick={() => navigate("/teams/preview")}
          className="mt-6 px-6 py-3 bg-[#10b981] hover:bg-[#34d399] text-white rounded font-semibold transition"
        >
          Crear un equipo
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">{team.teamName}</h1>
          <div className="flex space-x-4">
            <button title="Estadísticas">
              <BarChart2 className="w-6 h-6 hover:text-[#10b981]" />
            </button>
            <button title="Configuración">
              <Settings className="w-6 h-6 hover:text-[#10b981]" />
            </button>
            <button
              title="Invitar miembros"
              onClick={() => setShowInviteModal(true)}
            >
              <UserPlus className="w-6 h-6 hover:text-[#10b981]" />
            </button>
          </div>
        </div>

        <div className="bg-[#112a46] rounded-xl shadow-lg p-8 flex flex-col sm:flex-row items-center">
          <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center text-3xl font-bold mr-8">
            <img
              src={team.teamLogo}
              alt="Logo del equipo"
              className="w-32 h-32 bg-gray-700 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-extrabold mb-2">{team.teamName}</h2>
            <p className="text-gray-300 mb-1">
              {team.descripcionTeam || "Sin descripción aún."}
            </p>
            <div className="mt-4 space-y-1 text-sm">
              <p>
                <span className="font-bold text-white">ID del equipo:</span>{" "}
                {team.idTeam}
              </p>
              <p>
                <span className="font-bold text-white">Fecha de creación:</span>{" "}
                {new Date(team.creationDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-bold text-white">ID Capitán:</span>{" "}
                {team.idCapitan}
              </p>
              <p>
                <span className="font-bold text-white">Estado:</span>{" "}
                {team.status === 1 ? "Activo" : "Inactivo"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-[#0f172a] p-6 rounded-lg shadow-lg w-full max-w-md text-white">
            <h2 className="text-2xl font-bold mb-4">Invitar a un jugador</h2>
            <input
              type="text"
              placeholder="Buscar por nombre de usuario o ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 mb-2 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="mb-4 bg-[#10b981] hover:bg-[#34d399] px-4 py-2 rounded text-sm"
            >
              Buscar
            </button>

            {searchLoading ? (
              <p className="text-sm text-gray-400">Buscando...</p>
            ) : (
              <ul className="max-h-60 overflow-y-auto text-sm">
                {searchResults.length === 0 && searchTerm && (
                  <p className="text-gray-400">No se encontraron usuarios.</p>
                )}
                {searchResults.map((user) => (
                  <li
                    key={user.idUser}
                    className="flex justify-between items-center border-b border-gray-700 py-2"
                  >
                    <span>{user.userName}</span>
                    {user.status === 0 ? (
                      <button
                        className="text-xs bg-[#10b981] hover:bg-[#34d399] px-3 py-1 rounded"
                        onClick={() => handleInvite(user.idUser)}
                      >
                        Invitar
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs">
                        Ya en equipo
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                onClick={() => setShowInviteModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 space-y-4">
        {members.map((member) => (
          <MemberTeam key={member.idUser} member={member} />
        ))}
      </div>
    </div>
  );
};

export default MyTeamPage;
