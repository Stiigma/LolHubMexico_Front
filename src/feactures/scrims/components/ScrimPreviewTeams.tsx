import React from "react";

import type { ScrimEnriched } from "../types/ScrimEnriched";


interface ScrimPreviewTeamsProps {
  scrim: ScrimEnriched;
  onClick?: () => void;
}

const ScrimPreviewTeams: React.FC<ScrimPreviewTeamsProps> = ({ scrim, onClick }) => {
    // const [activeScrims, setActiveScrims] = useState<ScrimEnriched[]>([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     const loadScrims = async () => {
    //         if (!user?.idUser) return;

    //         try {
    //         setLoading(true);
    //         const scrimDTOs = await getActiveScrimsByUser(user.idUser);

    //         const enrichedList: ScrimEnriched[] = [];

    //         for (const scrim of scrimDTOs) {
    //             const enriched = await getScrimEnriched(scrim);
    //             if (enriched) enrichedList.push(enriched);
    //         }

    //         setActiveScrims(enrichedList);
    //         } catch (error) {
    //         console.error("❌ Error cargando scrims enriquecidas", error);
    //         } finally {
    //         setLoading(false);
    //         }
    //     };

    //     loadScrims();
    // }, [user]);
  return (
  <div
    className={`bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-start text-white transition ${
      onClick ? "hover:bg-gray-700 cursor-pointer" : ""
    }`}
    onClick={onClick}
  >
    <div>
      <h3 className="text-xl font-semibold">{scrim.scrimPDTO.tittle}</h3>
      <p className="text-sm text-gray-300">
        Fecha: {new Date(scrim.scrimPDTO.scheduled_date).toLocaleDateString("es-MX")}
      </p>
      <p className="text-sm">
        Estado:{" "}
        <span
          className={
            scrim.scrimPDTO.status === 0
              ? "text-yellow-400"
              : scrim.scrimPDTO.status === 1
              ? "text-blue-400"
              : "text-green-400"
          }
        >
          {scrim.statusString}
        </span>
      </p>

      <div className="mt-2">
        <p className="text-sm font-medium">Equipo 1: {scrim.teamName1}</p>
        <p className="text-sm font-medium">
          Equipo 2:{" "}
          {scrim.scrimPDTO.status === 0
            ? "Aún sin equipo rival asignado"
            : scrim.teamName2}
        </p>
      </div>

      {scrim.scrimPDTO.status === 0 && (
        <p className="text-yellow-300 text-sm mt-2">
          Aún sin equipo rival asignado.
        </p>
      )}
    </div>
  </div>
);

};

export default ScrimPreviewTeams;
