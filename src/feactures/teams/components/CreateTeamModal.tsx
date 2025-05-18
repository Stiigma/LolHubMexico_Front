import React, { useState } from "react";
import { useUser } from "../../../context/UserContext";
import type { CreateTeam } from "../types/CreateTeam"
import { createTeam } from "../services/teamService";
interface Props {
  onClose: () => void;
  onCreate: (newTeam: CreateTeam) => void;
}

const CreateTeamModal: React.FC<Props> = ({ onClose, onCreate }) => {
    const [teamName, setTeamName] = useState("");
    const { user } = useUser();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Toco");
        console.log(user);
        if(!user)
            return;
        if (teamName.trim()) {

            console.log(teamName.trim(),user?.idUser);
            const tryTeam: CreateTeam = {
                idCapitan: user?.idUser,
                teamName: teamName.trim(),
            };
            console.log("Se utilizo funcion de crear");
            onCreate(tryTeam);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-[#0f172a] p-6 rounded-lg shadow-lg w-full max-w-md text-white">
            <h2 className="text-2xl font-bold mb-4">Nombre del equipo</h2>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 mb-4 focus:outline-none focus:ring-2 focus:ring-[#10b981]"
                placeholder="Ej. DragonForce"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
            />
            <div className="flex justify-end space-x-3">
                <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
                >
                Cancelar
                </button>
                <button
                type="submit"
                className="px-4 py-2 rounded bg-[#10b981] hover:bg-[#34d399] font-semibold"
                >
                Crear
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};

export default CreateTeamModal;
