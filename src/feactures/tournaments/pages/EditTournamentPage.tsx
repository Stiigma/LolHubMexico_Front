import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface Tournament {
  id: number;
  name: string;
  description: string;
  image: string;
  date: string;
  status: string;
}

const mockTournaments: Tournament[] = [
  {
    id: 1,
    name: "League Clash LAN",
    description: "Compite por la gloria regional",
    image: "/images/tournaments/clash_lan.png",
    date: "2025-06-20",
    status: "Abierto"
  },
  {
    id: 2,
    name: "Hextech Cup",
    description: "Solo para valientes nivel Diamante+",
    image: "/images/tournaments/hextech_cup.png",
    date: "2025-07-05",
    status: "Cerrado"
  },
  {
    id: 3,
    name: "ARAM Fiesta",
    description: "Diversión sin parar en el puente del abismo",
    image: "/images/tournaments/aram_fiesta.png",
    date: "2025-06-30",
    status: "Abierto"
  }
];

const EditTournamentPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Tournament | null>(null);

 useEffect(() => {
  console.log("useEffect ejecutado. location.state:", location.state);
  const passedTournament = location.state?.tournament;
  if (passedTournament) {
    setFormData(passedTournament);
  } else {
    const fallback = mockTournaments.find(t => t.id === Number(id));
    setFormData(fallback ?? null);
  }
 }, [id, location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Torneo actualizado correctamente (simulado)");
    navigate(`/tournaments/${formData?.id}`);
  };

  if (!formData) {
    return <div className="text-white text-center mt-20">Cargando torneo...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white px-6 py-12">
      <div className="max-w-2xl mx-auto bg-[#112a46] p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">Editar Torneo</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fecha</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Estado</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            >
              <option value="Abierto">Abierto</option>
              <option value="Cerrado">Cerrado</option>
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded font-semibold"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTournamentPage;

