
import CreateTournamentForm from "../components/CreateTournamentForm";

const CreateTournamentPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1b2a] to-[#112a46] flex items-center justify-center px-4">
      <div className="bg-[#0f1f38] p-8 rounded-2xl shadow-2xl max-w-md w-full text-white">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Crear Torneo</h1>
        <CreateTournamentForm />
      </div>
    </div>
  );
};

export default CreateTournamentPage;


