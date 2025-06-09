import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getScrimDetailFull } from "../services/ScrimService";
import type { ScrimDetail } from "../types/ScrimDetail";
import TeamStatsPanel from "../layout/TeamStatsPanel";

const ScrimDetailPage: React.FC = () => {
  const { id } = useParams();
  const [scrimDetail, setScrimDetail] = useState<ScrimDetail | null>(null);

  useEffect(() => {
    if (id) {
      getScrimDetailFull(Number(id)).then(setScrimDetail);
    }
  }, [id]);

  if (!scrimDetail) return <div className="text-center mt-10">Cargando scrim...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-2">
        Scrim: {scrimDetail.scrim.tittle}
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Fecha programada: {new Date(scrimDetail.scrim.scheduled_date).toLocaleString("es-MX")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TeamStatsPanel
          teamName={scrimDetail.team1Name}
          teamLogo={scrimDetail.team1Logo}
          players={scrimDetail.team1Players}
        />
        <TeamStatsPanel
          teamName={scrimDetail.team2Name}
          teamLogo={scrimDetail.team2Logo}
          players={scrimDetail.team2Players}
        />
      </div>
    </div>
  );
};

export default ScrimDetailPage;
