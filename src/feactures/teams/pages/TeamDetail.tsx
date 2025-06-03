import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { teams } from '@/shared/data/teams';      // ajusta alias
import { Youtube, Twitch, MessageCircle as Discord } from 'lucide-react';

const TeamDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const team = teams.find(t => t.id.toString() === id);

  if (!team) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center bg-[#0c0222] text-white">
        <h1 className="text-3xl font-bold mb-4">Equipo no encontrado</h1>
        <Link to="/teams" className="underline text-emerald-400">Volver</Link>
      </main>
    );
  }

  const stats = [
    { k: 'Juegos', v: team.stats.games },
    { k: 'Victorias', v: team.stats.wins },
    { k: 'Derrotas', v: team.stats.losses },
    { k: 'Empates', v: team.stats.draws },
  ];
  const icon = (s: string) => (s === 'youtube' ? Youtube : s === 'twitch' ? Twitch : Discord);

  return (
    <main className="min-h-screen bg-[#0c0222] text-white px-4 py-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-14">

        {/* fila logo + banner */}
        <div className="flex flex-col lg:flex-row gap-14">
          {/* logo */}
          <aside className="w-full lg:w-auto max-w-xs bg-[#1b2344] rounded-3xl p-8 flex flex-col items-center text-center shadow-xl">
            <img src={team.logo} alt={team.name} className="w-56 h-56 object-contain rounded-2xl" />
            <h2 className="mt-6 text-2xl font-bold">{team.name}</h2>
            <div className="mt-6 flex gap-4">
              {team.socials.map(s => {
                const Icon = icon(s.name);
                return (
                  <a key={s.name} href={s.url} target="_blank" rel="noreferrer"
                     className="text-gray-200 hover:text-violet-400 transition">
                    <Icon size={28}/>
                  </a>
                );
              })}
            </div>
          </aside>

          {/* banner */}
          <div
            className="flex-1 h-48 rounded-3xl overflow-hidden shadow-lg"
            style={team.banner
              ? { backgroundImage:`url(${team.banner})`, backgroundSize:'cover', backgroundPosition:'center' }
              : { background:'linear-gradient(135deg,#35267266,#1d0f4d66)' }}
          />
        </div>

        {/* contenido */}
        <section className="space-y-10">
          <header>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Acerca de {team.name}</h1>
            <p className="text-gray-300 max-w-2xl">{team.description}</p>
          </header>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl">
            {stats.map(s => (
              <div key={s.k} className="bg-[#1b2344] rounded-2xl py-8 flex flex-col items-center">
                <span className="text-4xl font-extrabold mb-1">{s.v}</span>
                <span className="text-green-400 text-sm uppercase tracking-wide">{s.k}</span>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-3xl font-extrabold mb-6">Team Players</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {team.players.map(p => (
                <article key={p.id} className="bg-[#1b2344] rounded-2xl p-6 flex flex-col items-center hover:scale-105 transition">
                  <img src={p.avatar} alt={p.name} className="w-24 h-24 rounded-full object-cover mb-4" />
                  <span className="font-semibold">{p.name}</span>
                  <span className="text-gray-400 text-sm">{p.role}</span>
                </article>
              ))}
            </div>
          </div>

          <button className="px-8 py-3 rounded-full border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-[#0c0222] font-bold transition">
            JOIN OUR TEAM »
          </button>
        </section>
      </div>
    </main>
  );
};

export default TeamDetail;
