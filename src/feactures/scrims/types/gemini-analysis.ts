export interface KeyObjective {
  time: string;
  team: number; // Suponiendo que el ID del equipo es un número (100 o 200)
  type?: string; // Para el tipo de dragón
  lane?: string; // Para la línea de la torre
}

export interface DragonEvent {
  time: string;
  team: number;
  type: string;
}

export interface KillDetail {
  killerId: number;
  killerPuuid: string; // Puede que necesites esto si mapeas en el frontend
  victimId: number;
  victimPuuid: string; // Puede que necesites esto
  assists: string[]; // Nombres de invocador de los asistentes
  victimPosition: { x: number; y: number; };
}

export interface MajorFight {
  id: string;
  timestampMillisStart: number;
  timestampMillisEnd: number;
  timeStart: string;
  timeEnd: string;
  location: string;
  totalKills: number;
  killsDetails: KillDetail[];
}

export interface GeminiAnalysis {
  keyEvents: {
    firstDragon: KeyObjective | null;
    firstBaron: KeyObjective | null;
    firstHerald: KeyObjective | null;
    firstTower: KeyObjective | null;
  };
  allDragons?: DragonEvent[]; // Hice este opcional y con un nombre más descriptivo
  majorFights: MajorFight[];
}