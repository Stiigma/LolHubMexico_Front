import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateScrimModal from "../components/CreateScrimModal";

const scrims = [
  {
    id: "1",
    title: "Clash de Junglas",
    description: "Práctica intensa entre equipos para controlar la jungla.",
    date: "2025-06-15",
    status: "Disponible",
  },
  {
    id: "2",
    title: "Bot Lane Duel",
    description: "Scrim centrado en combos de ADC y support.",
    date: "2025-06-18",
    status: "Ocupado",
  },
];

export default function ScrimsPreviewPage() {
  const [showModal, setShowModal] = useState(false);

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
        <div className="grid gap-6">
          {scrims.map((scrim) => (
            <Link to={`/scrims/${scrim.id}`} key={scrim.id}>
              <div className="bg-[#1F2937] hover:bg-[#374151] transition rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold">{scrim.title}</h3>
                <p className="text-sm text-gray-300 mb-2">{scrim.description}</p>
                <p className="text-sm text-gray-400">Fecha: {scrim.date}</p>
                <span
                  className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${
                    scrim.status === "Disponible"
                      ? "bg-green-600 text-white"
                      : "bg-yellow-600 text-white"
                  }`}
                >
                  {scrim.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Modal para crear Scrim */}
      {showModal && <CreateScrimModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
