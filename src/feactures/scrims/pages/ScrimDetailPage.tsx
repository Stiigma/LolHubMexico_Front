import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Simulación temporal de scrims (en el futuro se conectará con el backend)
const mockScrims = [
  {
    id: "1",
    title: "Clash de Junglas",
    description: "Práctica intensa entre equipos para controlar la jungla.",
    date: "2025-06-15",
    time: "18:00",
    status: "Disponible",
  },
  {
    id: "2",
    title: "Bot Lane Duel",
    description: "Scrim centrado en combos de ADC y support.",
    date: "2025-06-18",
    time: "20:00",
    status: "Ocupado",
  },
];

export default function ScrimDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scrim, setScrim] = useState<any>(null);

  useEffect(() => {
    const found = mockScrims.find((s) => s.id === id);
    if (found) setScrim(found);
    else navigate("/scrims");
  }, [id, navigate]);

  if (!scrim) return null;

  return (
    <div className="min-h-screen bg-[#0B1120] text-white px-6 py-10">
      <div className="max-w-3xl mx-auto bg-[#1F2937] p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-4">{scrim.title}</h2>
        <p className="text-gray-300 mb-4">{scrim.description}</p>
        <div className="mb-3">
          <p>
            <span className="font-semibold">Fecha:</span>{" "}
            <span className="text-gray-300">{scrim.date}</span>
          </p>
          <p>
            <span className="font-semibold">Hora:</span>{" "}
            <span className="text-gray-300">{scrim.time}</span>
          </p>
          <p>
            <span className="font-semibold">Estado:</span>{" "}
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                scrim.status === "Disponible"
                  ? "bg-green-600 text-white"
                  : "bg-yellow-600 text-white"
              }`}
            >
              {scrim.status}
            </span>
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
        >
          Volver
        </button>
      </div>
    </div>
  );
}
