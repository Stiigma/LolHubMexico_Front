import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateTeamModal from "../components/CreateTeamModal";
import banner from "../../../assets/preview/banner.png";
import team from "../../../assets/preview/team.png";
import ranks from "../../../assets/preview/ranks.png";
import rewards from "../../../assets/preview/rewards.png";
import { useUser } from "../../../context/UserContext";
import type { CreateTeam } from "../types/CreateTeam";
import { createTeam } from "../services/teamService";
import type { Team } from "../types/Team";
const PreviewPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

   const handleCreateTeam = async (newTeam: CreateTeam) => {
    try {
      if (!user) throw new Error("Usuario no autenticado");
      const result = await createTeam(newTeam);
      console.log("Equipo creado:", result);
      const resultTeam = result.createdTeam;
      const nTeam: Team = {
        idCapitan: resultTeam.idCapitan,
        idTeam: resultTeam.idTeam,
        teamLogo: resultTeam.teamLogo,
        teamName: resultTeam.teamName,
        status: resultTeam.status,
        creationDate: resultTeam.creationDate,
        descripcionTeam: resultTeam.descripcionTeam,
      }
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
    <div className="min-h-screen bg-[#0d1b2a] text-white relative overflow-hidden">
      {/* Hero */}
      <div className="relative z-10 text-center px-6 pt-20 pb-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold leading-tight drop-shadow-lg mb-4">
            Domina la Grieta con tu Equipo
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Únete a la competencia. Crea tu escuadra, participa en torneos y alcanza la gloria en League of Legends.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#10b981] hover:bg-[#34d399] text-white px-6 py-3 rounded-lg font-semibold text-lg transition"
          >
            Crear mi equipo
          </button>
        </div>
      </div>

      {/* Imagen de fondo difuminada */}
      <div className="absolute inset-0 bg-black/40 z-0">
        <img
          src={banner}
          alt="League Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Features */}
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4 pb-16">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-[#112a46] rounded-lg overflow-hidden shadow-md hover:scale-105 transition"
          >
            <img src={f.img} alt={f.title} className="w-full h-100 object-cover" />
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
