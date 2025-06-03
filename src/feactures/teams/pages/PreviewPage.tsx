import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateTeamModal from "../components/CreateTeamModal";
import { useUser } from "../../../context/UserContext";
import type { CreateTeam } from "../types/CreateTeam";
import { createTeam } from "../services/teamService";
import type { Team } from "../types/Team";

const banner = "/assets/preview/banner.png";
const team = "/assets/preview/team.png";
const ranks = "/assets/preview/ranks.png";
const rewards = "/assets/preview/rewards.png";

const PreviewPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  const handleCreateTeam = async (newTeam: CreateTeam) => {
    try {
      if (!user) throw new Error("Usuario no autenticado");
      const result = await createTeam(newTeam);
      const resultTeam = result.createdTeam;
      const nTeam: Team = {
        idCapitan: resultTeam.idCapitan,
        idTeam: resultTeam.idTeam,
        teamLogo: resultTeam.teamLogo,
        teamName: resultTeam.teamName,
        status: resultTeam.status,
        creationDate: resultTeam.creationDate,
        descripcionTeam: resultTeam.descripcionTeam,
      };
      setSuccessMessage("¡Equipo creado exitosamente!");
      setTimeout(() => {
        setShowModal(false);
        navigate("/teams/my-team", { state: { team: nTeam } });
      }, 1500);
    } catch (err) {
      console.error("Error creando equipo:", err);
    }
  };

  return (
    <div className="relative bg-[#0d1b2a] text-white min-h-screen overflow-hidden">
      {/* Fondo visual difuminado */}
      <div className="absolute inset-0 z-0">
        <img
          src={banner}
          alt="League BG"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b2a]/80 to-black/90"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 px-6 pt-20 pb-10 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold leading-tight drop-shadow-lg mb-4">
          Domina la Grieta con tu Equipo
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Únete a la competencia. Crea tu escuadra, participa en torneos y alcanza la gloria en League of Legends.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-lg rounded-xl shadow-lg transition"
        >
          Crear mi equipo
        </button>
      </div>

      {/* Sección de características */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 pb-16 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-[#112a46] rounded-xl overflow-hidden shadow-md hover:scale-[1.03] transition transform duration-200"
          >
            <img src={f.img} alt={f.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-300">{f.text}</p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <CreateTeamModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateTeam}
        />
      )}
    </div>
  );
};

const features = [
  {
    title: "Encuentra tu escuadra",
    text: "Conéctate con otros jugadores y forma un equipo que se adapte a tu estilo.",
    img: team,
  },
  {
    title: "Escala en el ranking",
    text: "Compite en partidas oficiales y escala posiciones en la clasificación nacional.",
    img: ranks,
  },
  {
    title: "Gana recompensas",
    text: "Obtén premios y reconocimiento por tu rendimiento competitivo.",
    img: rewards,
  },
];

export default PreviewPage;

