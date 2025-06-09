import React, { useState } from "react";

interface Props {
  onClose: () => void;
}

const jugadoresMock = [
  "Jugador1", "Jugador2", "Jugador3", "Jugador4",
  "Jugador5", "Jugador6", "Jugador7", "Jugador8"
];

const CreateScrimModal: React.FC<Props> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [players, setPlayers] = useState<string[]>([]);

  const togglePlayer = (name: string) => {
    if (players.includes(name)) {
      setPlayers(players.filter(p => p !== name));
    } else if (players.length < 5) {
      setPlayers([...players, name]);
    }
  };

  const isFormValid =
    title.trim() !== "" &&
    description.trim() !== "" &&
    date !== "" &&
    time !== "" &&
    players.length === 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    console.log({ title, description, date, time, players });
    onClose(); // cerrar modal después de crear
  };

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
              {jugadoresMock.map((name) => (
                <button
                  type="button"
                  key={name}
                  onClick={() => togglePlayer(name)}
                  className={`py-2 px-3 rounded-md border ${
                    players.includes(name)
                      ? "bg-green-600 border-green-400"
                      : "bg-[#1e3a5f] border-[#1e3a5f]"
                  } text-white text-sm`}
                >
                  {name}
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

