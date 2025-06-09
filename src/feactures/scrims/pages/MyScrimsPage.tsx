import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { getActiveScrimsByUser, getScrimEnriched } from "../services/ScrimService";
import type { ScrimEnriched } from "../types/ScrimEnriched";
import ScrimPreviewTeams from "../components/ScrimPreviewTeams";

const MyScrimsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeScrims, setActiveScrims] = useState<ScrimEnriched[]>([]);
  const [completedScrims, setCompletedScrims] = useState<ScrimEnriched[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const handleScrimClick = (scrim: ScrimEnriched) => {
    if (scrim.scrimPDTO.status === 2) {
      navigate(`/scrims/${scrim.scrimPDTO.idScrim}`);
    } else {
      alert("Esta scrim aún no está activa para ver el detalle.");
    }
  };

  useEffect(() => {
    const loadScrims = async () => {
      if (!user?.idUser) return;

      try {
        setLoading(true);
        const scrimDTOs = await getActiveScrimsByUser(user.idUser);
        console.log(scrimDTOs);

        const enrichedList: ScrimEnriched[] = [];

        for (const scrim of scrimDTOs) {
          const enriched = await getScrimEnriched(scrim);
          if (enriched) enrichedList.push(enriched);
        }

        // Clasificar activas y completadas
        
        //const completed = enrichedList.filter((s) => s.scrimPDTO.status === 2);

        setActiveScrims(enrichedList);
        //setCompletedScrims(completed);
      } catch (error) {
        console.error("❌ Error cargando scrims enriquecidas", error);
      } finally {
        setLoading(false);
      }
    };

    loadScrims();
  }, [user]);

  return (
    <div className="text-white px-8 py-6">
      <h2 className="text-3xl font-bold mb-4">Mis Scrims Activos</h2>

      {loading ? (
        <p className="text-gray-400">Cargando scrims...</p>
      ) : activeScrims.length === 0 ? (
        <p className="text-gray-400">Aún no estás inscrito en ningún scrim.</p>
      ) : (
        <div className="space-y-4">
          {activeScrims.map((scrim) => (
            <ScrimPreviewTeams
              key={scrim.scrimPDTO.idScrim}
              scrim={scrim}
              onClick={() => handleScrimClick(scrim)}
            />
          ))}
        </div>
      )}

      <hr className="my-8 border-gray-600" />

      <h2 className="text-3xl font-bold mb-4">Historial de Scrims</h2>

      {completedScrims.length === 0 ? (
        <p className="text-gray-400">No tienes scrims completados.</p>
      ) : (
        <div className="space-y-4">
          {completedScrims.map((scrim) => (
            <div
              key={scrim.scrimPDTO.idScrim}
              onClick={() => navigate(`/scrims/history/${scrim.scrimPDTO.idScrim}`)}
              className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 cursor-pointer transition"
            >
              <h3 className="text-xl font-semibold">{scrim.scrimPDTO.tittle}</h3>
              <p>Fecha: {new Date(scrim.scrimPDTO.scheduled_date).toLocaleDateString("es-MX")}</p>
              <p>Estado: <span className="text-green-400">Completado</span></p>
              <p>Resultado: (pendiente integrar)</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyScrimsPage;
