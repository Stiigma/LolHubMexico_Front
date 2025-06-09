// src/features/teams/pages/BrowserPage.tsx
import { useState, useEffect } from "react";
import TeamCard from "../components/TeamCard";
import type { Team } from "../../../shared/data/teams";
import { getAllTeams } from "../services/teamService";

export default function BrowserPage() {
  // 1. Estado para datos, loading y error
  const [teamsData, setTeamsData] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Fetch al endpoint y normalización
  useEffect(() => {
    const load = async () => {
      try {
        const teamsFromApi = await getAllTeams();
        setTeamsData(
          teamsFromApi.map((d) => ({
            id: String(d.idTeam),
            name: d.teamName,
            logoUrl: d.teamLogo,
            status: d.status === 1 ? "Abierto" : "Cerrado",
          }))
        );
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // 3. Estados de loading / error
  if (loading) {
    return <div className="p-6 text-white">Cargando equipos...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">Error al cargar equipos: {error}</div>
    );
  }

  // 4. Render del grid con los datos obtenidos
  return (
    <div className="min-h-screen bg-[#0c0222] text-white font-sans">
      {/* HERO */}
      <header
        className="relative h-[420px] flex items-center justify-center bg-center bg-cover"
        style={{ backgroundImage: "url('/assets/Teams/banner2.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#0c0222]/80" />
        <div className="relative z-10 text-center space-y-4 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            EXPLORA EQUIPOS
          </h1>
          <p className="max-w-xl mx-auto text-gray-300 text-sm sm:text-base">
            Encuentra un equipo que comparta tu pasión competitiva.
          </p>
          <span className="inline-block bg-[#1f0e63]/70 px-4 py-1.5 rounded-full border border-violet-500 text-sm tracking-wide">
            HOME / TEAMS
          </span>
        </div>
      </header>

      {/* GRID Dinámico */}
      <section className="px-4 py-8">
        <div className="grid w-full justify-center grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
          {teamsData.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </section>
    </div>
  );
}
