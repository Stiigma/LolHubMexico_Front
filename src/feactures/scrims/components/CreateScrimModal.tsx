import {  getMyTeam, getTeambyId, getTeamMembers, getTeamMembersEnriched } from "@/feactures/teams/services/teamService";
import React, { useState , useEffect} from "react";
import type { CreateScrimDTO } from "../types/CreateScrimDTO";
import { useUser } from "@/context/UserContext";
import type { UserDTO } from "@/shared/types/User/UserDTO";
import { createScrim } from "../services/ScrimService";
import type { PlayerDTO } from "@/feactures/user/types/PlayerDTO";

interface Props {
  onClose: () => void;
}

const jugadoresMock = [
  { id: 101, name: "Jugador1" },
  { id: 102, name: "Jugador2" },
  { id: 103, name: "Jugador3" },
  { id: 104, name: "Jugador4" },
  { id: 105, name: "Jugador5" },
  { id: 106, name: "Jugador6" },
  { id: 107, name: "Jugador7" },
  { id: 108, name: "Jugador8" },
];

const CreateScrimModal: React.FC<Props> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [players, setPlayers] = useState<number[]>([]);
  const [currentUser, setCurrentUser] = useState<UserDTO | null>(null);
  const [availablePlayers, setAvailablePlayers] = useState<PlayerDTO[]>([]);
  const [loadingPlayers, setLoadingPlayers] = useState(true);
  const { user } = useUser(); 

  const togglePlayer = (id: number) => {
    if (players.includes(id)) {
      setPlayers(players.filter(p => p !== id));
    } else if (players.length < 5) {
      setPlayers([...players, id]);
    }
  };

  const isFormValid =
    title.trim() !== "" &&
    description.trim() !== "" &&
    date !== "" &&
    time !== "" &&
    players.length === 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    if (!user) {
      alert("No se encontró información del usuario.");
      return;
    }

    const team = await getMyTeam(user.idUser);

    const scheduled_date = new Date(`${date}T${time}:00`).toISOString(); // Formateo correcto

    const dto: CreateScrimDTO = {
      created_by: user.idUser, // desde contexto o props
      idTeam1: team.idTeam,     // desde contexto o props
      idTeam2: 0,               // aún no definido
      scheduled_date,
      idsUsers: players,
      description: description,
      tittle: title,
    };
    console.log(dto);
    const success = await createScrim(dto);
    console.log(success);
    if (success) {
      alert("Scrim creada correctamente ✅");
      
      onClose(); // cerrar modal
    } else {
      alert("Error al crear la scrim ❌");
    }
  };
  useEffect(() => {
    const fetchPlayers = async () => {
      if (!user) return;

      try {
        const team = await getMyTeam(user.idUser);
        const members = await getTeamMembersEnriched(team.idTeam);

        const onlyPlayers = members
          .map(m => m.player!); // ! porque ya filtramos los nulls

        setAvailablePlayers(onlyPlayers);
      } catch (error) {
        console.error("Error al obtener jugadores del equipo:", error);
      }
    };

    fetchPlayers();
  }, [user]);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#112a46] w-full max-w-md p-8 rounded-2xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-lg"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Crear nuevo Scrim
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Título del scrim
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Jungle Clash"
              className="w-full bg-[#1e3a5f] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Descripción
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve descripción del scrim"
              className="w-full bg-[#1e3a5f] text-white px-4 py-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-white mb-1">
                Fecha
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#1e3a5f] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-white mb-1">
                Hora
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#1e3a5f] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Selecciona 5 jugadores
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availablePlayers.map((player) => (
                <button
                  key={player.idUser}
                  type="button"
                  onClick={() => togglePlayer(player.idUser)}
                  className={`py-2 px-3 rounded-md border ${
                    players.includes(player.idUser)
                      ? "bg-green-600 border-green-400"
                      : "bg-[#1e3a5f] border-[#1e3a5f]"
                  } text-white text-sm`}
                >
                  {player.summonerName}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-300 mt-1">{players.length}/5 seleccionados</p>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full ${
              isFormValid ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 cursor-not-allowed"
            } text-white font-semibold py-2 rounded-md transition`}
          >
            Publicar Scrim
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateScrimModal;

