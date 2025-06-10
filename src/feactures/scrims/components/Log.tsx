// src/features/scrims/components/Log.tsx
import React from 'react';
import type {
  GeminiAnalysis,
  KeyObjective,
  DragonEvent,
  MajorFight,
} from "@/feactures/scrims/types/gemini-analysis";
import type { Team } from '@/feactures/teams/types/Team';


import { GiDragonHead, GiBroadsword,  GiCastle, GiDeadHead, GiBarbedSun } from 'react-icons/gi';
import { IoTimerOutline } from 'react-icons/io5';



interface LogProps {
  geminiAnalysis: GeminiAnalysis | null;
  team1?: Team | null;
  team2?: Team | null;
  puuidToSummonerNameMap?: { [key: string]: string };
}

interface TimelineEvent {
  type: 'firstDragon' | 'firstBaron' | 'firstHerald' | 'firstTower' | 'dragonKill' | 'majorFight';
  timestampMillis: number;
  timeFormatted: string;
  data: KeyObjective | DragonEvent | MajorFight;
}

const Log: React.FC<LogProps> = ({ geminiAnalysis, team1, team2, puuidToSummonerNameMap }) => {
  if (!geminiAnalysis) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white text-center">
        <p>No se encontró análisis de la partida de Gemini.</p>
        <p>Es posible que la partida sea muy corta o que el análisis aún no esté disponible.</p>
      </div>
    );
  }

  const getTeamName = (teamId: number): string => {
    if (teamId === 100 && team1?.teamName) return team1.teamName;
    if (teamId === 200 && team2?.teamName) return team2.teamName;
    return `Equipo ${teamId}`;
  };

  const getSummonerNameByPuuid = (puuid: string): string => {
    return puuidToSummonerNameMap?.[puuid] || puuid.substring(0, 8) + '...';
  };

  const getDragonImageUrl = (dragonType: string): string => {
    const baseUrl = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/maps/generic/monsterassets/';
    switch (dragonType?.toLowerCase()) {
      case 'ocean': return `${baseUrl}sr_elemental_ocean_dragon_icon.png`;
      case 'cloud': return `${baseUrl}sr_elemental_cloud_dragon_icon.png`;
      case 'infernal': return `${baseUrl}sr_elemental_fire_dragon_icon.png`;
      case 'mountain': return `${baseUrl}sr_elemental_mountain_dragon_icon.png`;
      case 'hextech': return `${baseUrl}sr_elemental_hextech_dragon_icon.png`;
      case 'chemtech': return `${baseUrl}sr_elemental_chemtech_dragon_icon.png`;
      case 'elder': return `${baseUrl}sr_elemental_elder_dragon_icon.png`;
      default: return 'https://static.wikia.nocookie.net/leagueoflegends/images/1/1a/Dragon_crest_icon.png';
    }
  };

  const timelineEvents: TimelineEvent[] = [];

  if (geminiAnalysis.keyEvents.firstDragon) {
    const [minutes, seconds] = geminiAnalysis.keyEvents.firstDragon.time.split(':').map(Number);
    const timestampMillis = (minutes * 60 + seconds) * 1000;
    timelineEvents.push({
      type: 'firstDragon',
      timestampMillis: timestampMillis,
      timeFormatted: geminiAnalysis.keyEvents.firstDragon.time,
      data: geminiAnalysis.keyEvents.firstDragon
    });
  }
  if (geminiAnalysis.keyEvents.firstBaron) {
    const [minutes, seconds] = geminiAnalysis.keyEvents.firstBaron.time.split(':').map(Number);
    const timestampMillis = (minutes * 60 + seconds) * 1000;
    timelineEvents.push({
      type: 'firstBaron',
      timestampMillis: timestampMillis,
      timeFormatted: geminiAnalysis.keyEvents.firstBaron.time,
      data: geminiAnalysis.keyEvents.firstBaron
    });
  }
  if (geminiAnalysis.keyEvents.firstHerald) {
    const [minutes, seconds] = geminiAnalysis.keyEvents.firstHerald.time.split(':').map(Number);
    const timestampMillis = (minutes * 60 + seconds) * 1000;
    timelineEvents.push({
      type: 'firstHerald',
      timestampMillis: timestampMillis,
      timeFormatted: geminiAnalysis.keyEvents.firstHerald.time,
      data: geminiAnalysis.keyEvents.firstHerald
    });
  }
  if (geminiAnalysis.keyEvents.firstTower) {
    const [minutes, seconds] = geminiAnalysis.keyEvents.firstTower.time.split(':').map(Number);
    const timestampMillis = (minutes * 60 + seconds) * 1000;
    timelineEvents.push({
      type: 'firstTower',
      timestampMillis: timestampMillis,
      timeFormatted: geminiAnalysis.keyEvents.firstTower.time,
      data: geminiAnalysis.keyEvents.firstTower
    });
  }

  geminiAnalysis.allDragons?.forEach(dragon => {
    const [minutes, seconds] = dragon.time.split(':').map(Number);
    const timestampMillis = (minutes * 60 + seconds) * 1000;
    timelineEvents.push({
      type: 'dragonKill',
      timestampMillis: timestampMillis,
      timeFormatted: dragon.time,
      data: dragon
    });
  });

  geminiAnalysis.majorFights.forEach(fight => {
    timelineEvents.push({
      type: 'majorFight',
      timestampMillis: fight.timestampMillisStart,
      timeFormatted: fight.timeStart,
      data: fight
    });
  });

  timelineEvents.sort((a, b) => a.timestampMillis - b.timestampMillis);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-xl text-white max-w-4xl mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Historial de Eventos Clave</h2>

      {timelineEvents.length === 0 ? (
        <div className="text-center text-gray-500">No hay eventos clave para mostrar.</div>
      ) : (
        <div className="space-y-6">
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className="bg-gray-800 p-5 rounded-lg shadow-md flex items-start space-x-4 border-l-4 border-blue-500 hover:border-blue-700 transition-colors duration-200"
            >
              <div className="flex-shrink-0 text-3xl">
                {event.type === 'firstDragon' && <GiDragonHead className="text-green-500" />}
                {event.type === 'firstBaron' && <GiBarbedSun className="text-red-500" />}
                {event.type === 'firstHerald' && <GiBarbedSun className="text-purple-500" />}
                {event.type === 'firstTower' && <GiCastle className="text-gray-400" />}
                {event.type === 'dragonKill' && <GiDragonHead className="text-blue-500" />}
                {event.type === 'majorFight' && <GiBroadsword className="text-orange-500" />}
              </div>
              <div className="flex-grow">
                <p className="text-xs text-gray-400">
                  <IoTimerOutline className="inline-block mr-1" /> {event.timeFormatted}
                </p>
                {event.type === 'firstDragon' && (
                  <p className="font-bold text-lg">
                    ¡Primer Dragón de {((event.data as KeyObjective).type || 'Tipo desconocido')} para{' '}
                    <span className="text-green-400">{getTeamName((event.data as KeyObjective).team)}</span>!
                  </p>
                )}
                {event.type === 'firstBaron' && (
                  <p className="font-bold text-lg">
                    ¡Primer Barón para{' '}
                    <span className="text-red-400">{getTeamName((event.data as KeyObjective).team)}</span>!
                  </p>
                )}
                {event.type === 'firstHerald' && (
                  <p className="font-bold text-lg">
                    ¡Primer Heraldo para{' '}
                    <span className="text-purple-400">{getTeamName((event.data as KeyObjective).team)}</span>!
                  </p>
                )}
                {event.type === 'firstTower' && (
                  <p className="font-bold text-lg">
                    ¡Primera Torre ({((event.data as KeyObjective).lane || 'Desconocida')}) derribada por{' '}
                    <span className="text-gray-400">{getTeamName((event.data as KeyObjective).team)}</span>!
                  </p>
                )}
                {event.type === 'dragonKill' && (
                  <div className="flex items-center">
                     <img src={getDragonImageUrl((event.data as DragonEvent).type)} alt="Dragon" className="w-6 h-6 mr-2" />
                     <p className="font-bold text-lg">
                       Dragón de {((event.data as DragonEvent).type)} para{' '}
                       <span className="text-blue-400">{getTeamName((event.data as DragonEvent).team)}</span>
                     </p>
                  </div>
                )}
                {event.type === 'majorFight' && (
                  <div>
                    <p className="font-bold text-lg text-orange-300">
                      Gran Pelea en {((event.data as MajorFight).location)} ({((event.data as MajorFight).totalKills)} muertes)
                    </p>
                    <p className="text-sm text-gray-400">
                      Desde {((event.data as MajorFight).timeStart)} hasta {((event.data as MajorFight).timeEnd)}
                    </p>
                    <div className="mt-2 space-y-1">
                      {((event.data as MajorFight).killsDetails).map((kill, killIdx) => (
                        <p key={killIdx} className="text-sm text-gray-300 flex items-center">
                          <GiDeadHead className="mr-1 text-red-400" />
                          <span className="font-semibold text-blue-300">{getSummonerNameByPuuid(kill.killerPuuid)}</span>{' '}
                          mató a{' '}
                          <span className="font-semibold text-red-300">{getSummonerNameByPuuid(kill.victimPuuid)}</span>
                          {kill.assists && kill.assists.length > 0 && (
                            <span className="ml-1 text-gray-400 text-xs">
                              (Asistencias: {kill.assists.map(p => getSummonerNameByPuuid(p)).join(', ')})
                            </span>
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Log;