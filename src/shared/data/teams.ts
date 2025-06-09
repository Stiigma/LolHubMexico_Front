// src/shared/data/teams.ts

/**
 * Esta interfaz refleja sólo lo que tu UI necesita de momento.
 * Si en el futuro quieres mostrar banner, stats o jugadores,
 * debes descomentar y rellenar estas propiedades.
 */
export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  status: 'Abierto' | 'Cerrado';

  // Opcionales, para cuando los necesites:
  // bannerUrl?: string;
  description?: string;
  // creationDate?: string;
  // captainId?: number;
  // stats?: {
  //   games: number;
  //   wins: number;
  //   losses: number;
  //   draws: number;
  // };
  // socials?: { name: 'youtube' | 'twitch' | 'chat'; url: string }[];
  // players?: { id: number; name: string; role: string; avatar: string }[];
}

/**
 * Array de fallback (vacío porque ahora tiras de fetch).
 * Si quieres usar datos locales para pruebas,
 * copia aquí un ejemplo con el mismo shape:
 *
 * export const teams: Team[] = [
 *   {
 *     id: '1010',
 *     name: 'Team Heretics',
 *     logoUrl: 'https://...firebase.../LogoFoto.png',
 *     status: 'Abierto',
 *   },
 *   // ...
 * ];
 */
export const teams: Team[] = [];
