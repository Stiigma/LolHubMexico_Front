// src/features/teams/pages/TeamDetail.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTeambyId, getTeamMembersEnriched } from "../services/teamService";
import type { TeamMemberDTO } from "../types/TeamMemberDTO";
import MemberCard from "../components/MemberCard";
import MatchHistory from "../components/MatchHistory"; // Este es el que ya modificamos
import { Youtube, Twitch, MessageCircle } from "lucide-react";
import type { Team } from "../types/Team";
import { useUser } from "@/context/UserContext";
import {
  getActiveScrimsByTeamId,
  getScrimDetailFull, // Necesitamos esta función para cada scrim
} from "@/feactures/scrims/services/ScrimService";
//import type { ScrimPDTO } from "@/feactures/scrims/types/ScrimPDTO";
import type { ScrimDetail } from "@/feactures/scrims/types/ScrimDetail"; // Importamos ScrimDetail

export default function TeamDetail() {
  const user = useUser().user;
  const { id } = useParams<{ id: string }>();
  const teamId = id;
  const [team, setTeam] = useState<Team | null>(null);
  const [members, setMembers] = useState<TeamMemberDTO[]>([]);
  // Mantendremos scrims para las ScrimPDTO, pero usaremos scrimDetails para los ScrimDetail
  const [scrimDetails, setScrimDetails] = useState<ScrimDetail[]>([]); // Cambiado a scrimDetails
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("asdasd");
    if (!user?.idUser) return;
    console.log("pepe");
    if (!teamId) return;

    const fetchData = async () => {
      try {
        const fetchedTeam = await getTeambyId(Number(teamId));
        setTeam(fetchedTeam);
        console.log(fetchedTeam);

        // Obtener los miembros
        const enrichedMembers = await getTeamMembersEnriched(
          fetchedTeam.idTeam
        );
        setMembers(enrichedMembers);

        // Obtenemos los scrims (como ScrimPDTOs)
        const activeScrims = await getActiveScrimsByTeamId(fetchedTeam.idTeam);
        // console.log(scrims); // Este console.log de 'scrims' no es necesario ahora

        // Ahora, para cada ScrimPDTO, obtenemos su detalle completo
        const detailedScrimsPromises = activeScrims.map(async (scrimPDTO) => {
          // getScrimDetailFull recibe un scrimId
          console.log("Fetching Scrim Detail for ID:", scrimPDTO.idScrim);
          return getScrimDetailFull(scrimPDTO.idScrim);
        });

        // Esperar a que todas las promesas de detalle se resuelvan
        const fetchedScrimDetails = (
          await Promise.all(detailedScrimsPromises)
        ).filter((detail): detail is ScrimDetail => detail !== null);
        setScrimDetails(fetchedScrimDetails); // Guardamos los detalles completos
      } catch (e) {
        console.error("Error loading team details or scrims", e);
        setError("Error al obtener detalles del equipo o partidas");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teamId, user?.idUser]); // Asegúrate de incluir user?.idUser en las dependencias

  if (loading) return <div className="p-6 text-white">Cargando miembros…</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="pb-12">
      {/* Banner de fondo */}
      <header
        className="relative h-120 bg-center bg-cover"
        style={{ backgroundImage: 'url("../assets/Teams/banner3.png")' }}
      >
        <div className="absolute inset-0 bg-opacity-100" />
      </header>

      {/* Tarjeta flotante con logo y nombre */}
      <div className="relative -mt-40 px-20">
        <div className="rounded-2xl shadow-xl/30 shadow-purple-800 p-15 w-70 flex flex-col items-center text-center space-y-4">
          <img
            src={team?.teamLogo} // ruta placeholder al logo
            alt="Team Logo"
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />
          <h1 className="text-xl font-bold text-white truncate">
            {team?.teamName}
          </h1>
          <div className="flex space-x-3">
            {/* Iconos sociales */}
            <Youtube className="text-white w-5 h-5 hover:text-red-500" />
            <Twitch className="text-white w-5 h-5 hover:text-purple-500" />
            <MessageCircle className="text-white w-5 h-5 hover:text-green-400" />
          </div>
        </div>
      </div>

      {/* Sección de miembros */}
      <section className="mt-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-6">Miembros</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {members.map((m) => (
            <MemberCard key={m.idUser} member={m} />
          ))}
        </div>
      </section>

      {/* Historial de Partidas */}
      <section className="mt-10 px-19 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Historial de Partidas
        </h2>
        {/* Pasamos la lista de scrimDetails al componente MatchHistory */}
        {/* engageIconUrl y pickIconUrl solo se pasarán una vez a MatchHistory, no a cada MatchCard */}
        <MatchHistory
          scrims={scrimDetails} // Ahora pasamos la lista completa de scrimDetails
          engageIconUrl="../assets/Teams/ally2.png"
          pickIconUrl="../assets/Teams/enemy.png"
        />
      </section>
    </div>
  );
}
