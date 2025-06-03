
import teams from "../services/db";

const BrowserPage = () => {
  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Explora Equipos</h1>
      <p className="text-center text-gray-400 mb-10">Encuentra un equipo que comparta tu pasión competitiva.</p>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {teams.map((team) => (
            <div
            key={team.IdTeam}
            className="flex bg-[#112a46] rounded-lg shadow-md hover:shadow-xl transition hover:scale-[1.01] overflow-hidden"
            >
            {/* Logo */}
            <div className="p-4 flex items-center justify-center">
                <img
                src={team.TeamLogo}
                alt={team.TeamName}
                className="w-20 h-20 rounded-full border-4 border-[#10b981]"
                />
            </div>

            {/* Detalles */}
            <div className="flex-1 px-4 py-3">
                <h2 className="text-xl font-bold text-white">{team.TeamName}</h2>
                <p className="text-sm text-gray-300">{team.DescripcionTeam}</p>
                <p className="text-xs text-gray-400 mt-1">
                Creado el: {new Date(team.CreationDate).toLocaleDateString()}
                </p>
            </div>

            {/* Acción */}
            <div className="flex items-center pr-6">
                <button className="bg-[#10b981] hover:bg-[#34d399] text-white font-semibold text-sm px-4 py-2 rounded shadow-md transition active:scale-95">
                Unirme al equipo
                </button>
            </div>
            </div>
        ))}
        </div>
    </div>
  );
};

export default BrowserPage;
