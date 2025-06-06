import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { useUser } from "../../../context/UserContext";
import type { CreateTeam } from "../types/CreateTeam";
//import { createTeam } from "../services/teamService";
import { getCroppedImg } from "@/core/utils/cropImage"; // función utilitaria que veremos abajo

interface Props {
  onClose: () => void;
  onCreate: (newTeam: CreateTeam, imageBlob: Blob | null) => void;
}

const CreateTeamModal: React.FC<Props> = ({ onClose, onCreate }) => {
  const [teamName, setTeamName] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const { user } = useUser();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
    }
  };

  const onCropComplete = useCallback((_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!teamName.trim()) return;

    const tryTeam: CreateTeam = {
      idCapitan: user.idUser,
      teamName: teamName.trim(),
    };

    let croppedBlob: Blob | null = null;

    if (imageSrc && croppedAreaPixels) {
      croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
    }

    onCreate(tryTeam, croppedBlob); // ahora se incluye la imagen
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#0f172a] p-6 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-bold mb-4">Nombre del equipo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 mb-4"
            placeholder="Ej. DragonForce"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />

          <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-2">
                    Logo del equipo
                </label>
                <div className="flex items-center gap-4">
                    <button
                    type="button"
                    onClick={() => document.getElementById("fileInput")?.click()}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    >
                    Seleccionar imagen
                    </button>
                    {imageSrc && <span className="text-sm text-green-400">Imagen cargada ✅</span>}
                </div>
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
            </div>

          {imageSrc && (
            <div className="relative w-full h-64 bg-black mb-4 rounded overflow-hidden">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          )}

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

