// src/features/teams/pages/InvitationTeamPage.tsx
import React, { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import type { TeamInvitationDTO } from "../types/TeamInvitations";
import { getMyInvitations } from "../services/invitationService";

const InvitationTeamPage: React.FC = () => {
  const { user } = useUser();
  const [invitations, setInvitations] = useState<TeamInvitationDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.idUser) return;

    getMyInvitations(user.idUser)
      .then(setInvitations)
      .catch(() => setError("Error al cargar las invitaciones"))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="text-white text-center mt-10 animate-pulse">
        <p className="text-lg">Cargando invitaciones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white text-center mt-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Invitaciones a Equipos</h1>

      <div className="max-w-4xl mx-auto space-y-4">
        {invitations.length === 0 ? (
          <p className="text-center text-gray-400">No tienes invitaciones pendientes.</p>
        ) : (
          invitations.map((inv) => (
            <div
              key={inv.idInvitation}
              className="bg-[#112a46] p-6 rounded-lg shadow flex flex-col sm:flex-row sm:items-center justify-between"
            >
              <div>
                <p className="text-lg font-semibold">
                  Invitación de{" "}
                  <span className="text-[#10b981]">{inv.invitedByUsername || "Usuario"}</span>
                </p>
                <p className="text-sm text-gray-300">
                  Para unirte al equipo{" "}
                  <span className="font-semibold">{inv.teamName || "Equipo desconocido"}</span>
                </p>
                {inv.message && <p className="mt-2 text-sm italic">"{inv.message}"</p>}
                <p className="text-xs text-gray-500 mt-1">
                  Enviada el {new Date(inv.sentDate).toLocaleString()}
                </p>
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-4 flex space-x-2">
                <button className="bg-[#10b981] hover:bg-[#34d399] px-4 py-2 rounded font-semibold">
                  Aceptar
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded font-semibold">
                  Rechazar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InvitationTeamPage;
