import React, { useState, useEffect } from "react";
import { getMyTeam, getTeambyId, getTeamMembersEnriched } from "@/feactures/teams/services/teamService";
import { useUser } from "@/context/UserContext";
import { createScrim } from "../services/ScrimService";
import type { CreateScrimDTO } from "../types/CreateScrimDTO";
import type { PlayerDTO } from "@/feactures/user/types/PlayerDTO";
import type { UserDTO } from "@/shared/types/User/UserDTO";

interface Props {
  onClose: () => void;
}

const CreateScrimModal: React.FC<Props> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [players, setPlayers] = useState<number[]>([]);
  const [availablePlayers, setAvailablePlayers] = useState<PlayerDTO[]>([]);
  const [loadingPlayers, setLoadingPlayers] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [search, setSearch] = useState("");
  const [foundTeam, setFoundTeam] = useState<any | null>(null);
  const [idTeam2, setIdTeam2] = useState<number | null>(null);

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
    players.length === 5 &&
    idTeam2 !== null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !user) return;

    const team = await getMyTeam(user.idUser);
    const scheduled_date = new Date(`${date}T${time}:00`).toISOString();

    const dto: CreateScrimDTO = {
      created_by: user.idUser,
      idTeam1: team.idTeam,
      idTeam2: idTeam2!,
      scheduled_date,
      idsUsers: players,
      description,
      tittle: title,
    };

    const success = await createScrim(dto);
    if (success) {
      alert("Scrim creada correctamente ✅");
      onClose(); // cerrar modal
    } else {
      alert("Error al crear la scrim ❌");
    }
  };

  const handleTeamSearch = async () => {
    try {
      const team = await getTeambyId(search);
      setFoundTeam(team);
    } catch (error) {
      setFoundTeam(null);
      console.error("Equipo no encontrado");
    }
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      if (!user) return;
      try {
        const team = await getMyTeam(user.idUser);
        const members = await getTeamMembersEnriched(team.idTeam);
        const onlyPlayers = members.map(m => m.player!);
        setAvailablePlayers(onlyPlayers);
        setLoadingPlayers(false);
      } catch (error) {
        console.error("Error al obtener jugadores del equipo:", error);
        setLoadingPlayers(false);
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
            <label className="block text-sm font-medium text-white mb-1">Título del scrim</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Jungle Clash"
              className="w-full bg-[#1e3a5f] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Descripción</label>
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
              <label className="block text-sm font-medium text-white mb-1">Fecha</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#1e3a5f] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-white mb-1">Hora</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#1e3a5f] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Selecciona 5 jugadores</label>
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
            type="button"
            onClick={() => setShowInviteModal(true)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
          >
            Invitar equipo
          </button>

          {idTeam2 && (
            <p className="text-sm text-green-400 text-center">Equipo rival seleccionado: ID #{idTeam2}</p>
          )}

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

        {/* MODAL INVITAR EQUIPO */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-[#1e3a5f] w-full max-w-sm p-6 rounded-xl relative text-white">
              <button
                className="absolute top-3 right-3 text-white"
                onClick={() => setShowInviteModal(false)}
              >
                ✕
              </button>
              <h3 className="text-lg font-bold mb-4">Buscar equipo rival</h3>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Nombre del equipo"
                className="w-full px-4 py-2 mb-2 rounded bg-[#112a46] focus:outline-none"
              />

              <button
                onClick={handleTeamSearch}
                className="bg-green-500 hover:bg-green-600 w-full py-2 rounded mb-4"
              >
                Buscar
              </button>

              {foundTeam ? (
                <div className="bg-[#0e213a] p-4 rounded text-center">
                  <p className="font-semibold">{foundTeam.name}</p>
                  <button
                    onClick={() => {
                      setIdTeam2(foundTeam.idTeam);
                      setShowInviteModal(false);
                    }}
                    className="mt-3 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                  >
                    Invitar este equipo
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-300">No se ha encontrado ningún equipo.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateScrimModal;


