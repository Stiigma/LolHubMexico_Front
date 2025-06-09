// src/features/teams/pages/TeamDetail.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTeamMembersEnriched } from "../services/teamService";
import type { TeamMemberDTO } from "../types/TeamMemberDTO";
import MemberCard from "../components/MemberCard";

export default function TeamDetail() {
  const { id } = useParams<{ id: string }>();
  const teamId = id;
  const [members, setMembers] = useState<TeamMemberDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!teamId) return;
    (async () => {
      try {
        const enriched = await getTeamMembersEnriched(Number(teamId));
        console.log(enriched);
        setMembers(enriched);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [teamId]);

  if (loading) return <div className="p-6 text-white">Cargando miembros…</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-white mb-4">
        Miembros del Equipo #{teamId}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {members.map((m) => (
          <MemberCard key={m.idUser} member={m} />
        ))}
      </div>
    </div>
  );
}
