import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateScrimModal from "../components/CreateScrimModal";

import { getAllScrimsEnriched } from "../services/ScrimService";
import { useUser } from "@/context/UserContext";
import type { ScrimEnriched } from "../types/ScrimEnriched";

export default function ScrimsPreviewPage() {
  const [showModal, setShowModal] = useState(false);
  const [Scrims, setScrims] = useState<ScrimEnriched[]>([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.idUser) return;

    getAllScrimsEnriched()
      .then((fetchedScrim) => {
        setScrims(fetchedScrim);
        console.log(fetchedScrim);
      })
      .catch(() => setError("Error al obtener scrims"))
      .finally(() => setLoading(false));
  }, [user]);

  // 🔧 Función auxiliar para traducir el status
  const getStatusInfo = (status: number) => {
    switch (status) {
      case 0:
        return { text: "Disponible", color: "bg-green-600" };
      case 1:
        return { text: "Ocupado", color: "bg-yellow-600" };
      case 2:
        return { text: "Finalizado", color: "bg-gray-600" };
      default:
        return { text: "Desconocido", color: "bg-red-600" };
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0B1120] text-white">
      {/* Hero encabezado */}
      <section className="w-full bg-[#111827] py-12 text-center">
        <h1 className="text-4xl font-bold mb-3">Domina la Grieta con Scrims</h1>
        <p className="text-md text-gray-300 mb-6">
          Entrena con otros equipos, afina estrategias y mejora tu coordinación.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow"
        >
          Crear Scrim
        </button>
      </section>

      {/* Lista de Scrims */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">Próximos Scrims</h2>

        {error && <p className="text-red-400 mb-4">{error}</p>}
        {loading ? (
          <p className="text-gray-300">Cargando scrims...</p>
        ) : Scrims.length === 0 ? (
          <p className="text-gray-400">No hay scrims disponibles por ahora.</p>
        ) : (
          <div className="grid gap-6">
            {Scrims.map((scrim) => {
              const statusInfo = getStatusInfo(scrim.scrimPDTO.status);
              return (
                <Link to={`/scrims/${scrim.scrimPDTO.idScrim}`} key={scrim.scrimPDTO.idScrim}>
                  <div className="bg-[#1F2937] hover:bg-[#374151] transition rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-bold">Equipo 1: {scrim.teamName1}</h3>
                    <p className="text-sm text-gray-300 mb-2">{scrim.descripcion}</p>
                    <p className="text-sm text-gray-400">
                      Fecha: {new Date(scrim.scrimPDTO.scheduled_date).toLocaleString("es-MX")}
                    </p>
                    <span
                      className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                    >
                      {statusInfo.text}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Modal para crear Scrim */}
      {showModal && <CreateScrimModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
