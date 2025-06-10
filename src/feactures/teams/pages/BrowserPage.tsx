// src/features/teams/pages/BrowserPage.tsx
import { useState, useEffect } from "react";
import TeamCard from "../components/TeamCard";
import type { Team } from "../../../shared/data/teams"; // Mantengo tu importación original
import { getAllTeams } from "../services/teamService";

export default function BrowserPage() {
  const [teamsData, setTeamsData] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const teamsFromApi = await getAllTeams();
        // Mapeo de datos: NO LO CAMBIO, ya que pediste no tocar la lógica.
        // Asegúrate que 'd.idTeam', 'd.teamName', 'd.teamLogo', 'd.status'
        // coincidan con la estructura que devuelve getAllTeams y que TeamCard espera.
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-xl">Cargando equipos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-500 text-xl">Error al cargar equipos: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Sección del Héroe (Banner) - Estilo similar a TeamDetail */}
      <header
        className="relative h-96 flex items-center justify-center bg-center bg-cover rounded-b-3xl shadow-lg"
        style={{ backgroundImage: "url('/assets/Teams/banner2.jpg')" }} // Asegúrate de que la ruta de la imagen sea correcta
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80 rounded-b-3xl" />
        <div className="relative z-10 text-center space-y-4 px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
            ENCUENTRA TU EQUIPO
          </h1>
          <p className="max-w-xl mx-auto text-gray-300 text-lg sm:text-xl">
            Explora equipos de alto nivel y únete a la competición.
          </p>
          {/* El span de "HOME / TEAMS" con estilo de TeamDetail */}
          <span className="inline-block bg-violet-700/60 px-5 py-2 rounded-full border border-violet-500 text-sm tracking-wide shadow-md">
            HOME / EQUIPOS
          </span>
        </div>
      </header>

      {/* Sección de la cuadrícula de equipos */}
      <section className="mt-16 px-4 max-w-7xl mx-auto pb-12">
        <h2 className="text-4xl font-bold text-violet-400 mb-10 text-center">
          Todos los Equipos
        </h2>
        {teamsData.length > 0 ? (
          <div className="grid grid-cols-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teamsData.map((team) => (
              <TeamCard
                key={team.id} // Asumiendo que TeamCard espera 'id'
                team={team}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-xl">
            No hay equipos disponibles en este momento.
          </p>
        )}
      </section>
    </div>
  );
}
