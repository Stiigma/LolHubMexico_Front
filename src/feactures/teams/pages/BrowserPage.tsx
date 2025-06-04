import React from 'react';
import { Link } from 'react-router-dom';
import { teams, type Team } from '../../../shared/data/teams'; // Asegúrate que la ruta sea correcta

export default function BrowserPage() {
  return (
    <div className="min-h-screen bg-[#0c0222] text-white font-sans">
      {/* HERO */}
      <header
        className="relative h-[420px] flex items-center justify-center bg-center bg-cover"
        style={{ backgroundImage: "url('/assets/dragon.jpg')" }} // Ruta pública
      >
        <div className="absolute inset-0 bg-[#0c0222]/80" />
        <div className="relative z-10 text-center space-y-4 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold">EXPLORA EQUIPOS</h1>
          <p className="max-w-xl mx-auto text-gray-300 text-sm sm:text-base">
            Encuentra un equipo que comparta tu pasión competitiva.
          </p>
          <span className="inline-block bg-[#1f0e63]/70 px-4 py-1.5 rounded-full border border-violet-500 text-sm tracking-wide">
            HOME / TEAMS
          </span>
        </div>
      </header>

      {/* GRID */}
      <section className="px-4 py-8">
        <div className="grid w-full justify-center grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* TARJETA --------------------------------------------- */
function TeamCard({ team }: { team: Team }) {
  return (
    <Link
      to={`/teams/${team.id}`}
      className="group relative h-56 rounded-xl border-2 border-violet-600 bg-[#10173a] overflow-hidden shadow-lg hover:scale-105 transition-transform"
    >
      <img
        src={team.logo}
        alt={team.name}
        className="w-full max-h-full object-contain p-6 mx-auto group-hover:scale-110 transition-transform"
      />
      <div className="absolute inset-0 bg-[#0c0222]/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
        <h2 className="text-lg font-bold text-center px-4">{team.name}</h2>
      </div>
    </Link>
  );
}

