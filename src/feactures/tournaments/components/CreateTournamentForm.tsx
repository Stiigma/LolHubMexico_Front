import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Props {
  onSuccess: () => void;
}

const CreateTournamentForm: React.FC<Props> = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [maxTeams, setMaxTeams] = useState(8);
  const [format, setFormat] = useState("Eliminación directa");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tournamentData = {
      name,
      date,
      description,
      maxTeams,
      format,
    };

    console.log("Torneo enviado:", tournamentData);

    toast.success("¡Torneo creado exitosamente!");

    // Redirige y cierra el modal después de 2.5 segundos
    setTimeout(() => {
      onSuccess(); // cerrar el modal
      navigate("/tournaments"); // navegar a la lista de torneos
    }, 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nombre */}
      <div>
        <label className="block text-sm font-semibold mb-1 text-white">
          Nombre del Torneo
        </label>
        <input
          type="text"
          placeholder="Ej. Copa Nexus"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md bg-[#1a2a3c] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Fecha */}
      <div>
        <label className="block text-sm font-semibold mb-1 text-white">
          Fecha
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md bg-[#1a2a3c] text-white outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-semibold mb-1 text-white">
          Descripción
        </label>
        <textarea
          placeholder="Breve descripción del torneo..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 rounded-md bg-[#1a2a3c] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Máximo de Equipos */}
      <div>
        <label className="block text-sm font-semibold mb-1 text-white">
          Máximo de Equipos
        </label>
        <input
          type="number"
          min={2}
          max={64}
          value={maxTeams}
          onChange={(e) => setMaxTeams(Number(e.target.value))}
          className="w-full px-4 py-2 rounded-md bg-[#1a2a3c] text-white outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Formato */}
      <div>
        <label className="block text-sm font-semibold mb-1 text-white">
          Formato
        </label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-[#1a2a3c] text-white outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="Eliminación directa">Eliminación directa</option>
          <option value="Round Robin">Round Robin</option>
          <option value="Grupos + Eliminación">Grupos + Eliminación</option>
        </select>
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-semibold transition"
      >
        Crear Torneo
      </button>
    </form>
  );
};

export default CreateTournamentForm;

