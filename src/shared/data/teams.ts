// src/data/teams.ts
export type Team = {
  id: number;
  name: string;
  logo: string;
  banner: string;
  description: string;
  createdAT: string;
  stats: { games: number; wins: number; losses: number; draws: number };
  socials: { name: 'youtube' | 'twitch' | 'chat'; url: string }[];
  players: { id: number; name: string; role: string; avatar: string }[];
};

export const teams: Team[] = [
  {
    id: 1,
    name: 'Dark Passage',
    logo: new URL('../../assets/teamsassets/team1.png', import.meta.url).href,
    banner: new URL('../../assets/teamassets/banner.png', import.meta.url).href,
    description:
      'Enim et faucibus maximus, nulla massa finibus arcu, ornare euismod…',
    createdAT: '12-12-2024',
    stats: { games: 12, wins: 8, losses: 2, draws: 2 },
    socials: [
      { name: 'youtube', url: '#' },
      { name: 'twitch', url: '#' },
      { name: 'chat', url: '#' },
    ],
    players: [
      { id: 1, name: 'Stiigma', role: 'Top', avatar: '../../assets/teamsassets/team1.png' },
      { id: 2, name: 'Flaeyy', role: 'Jungle', avatar: '../../assets/teamsassets/team1.png' },
      { id: 3, name: 'Zonet', role: 'Mid', avatar: '../../assets/teamsassets/team1.png' },
      // …
    ],
  },
  {
    id: 2,
    name: 'Force of Nature',
    logo: new URL('../../assets/teamsassets/team1.png', import.meta.url).href,
    banner: new URL('../../assets/teamassets/banner.png', import.meta.url).href,
    description:
      'Enim et faucibus maximus, nulla massa finibus arcu, ornare euismod…',
    createdAT: '12-12-2024',
    stats: { games: 12, wins: 8, losses: 2, draws: 2 },
    socials: [
      { name: 'youtube', url: '#' },
      { name: 'twitch', url: '#' },
      { name: 'chat', url: '#' },
    ],
    players: [
      { id: 1, name: 'Shadow', role: 'Top', avatar: '/assets/teams/team2.png' },
      { id: 2, name: 'Viper', role: 'Jungle', avatar: '/assets/teams/team2.png' },
      // …
    ],
  },
  {
    id: 3,
    name: 'Attax',
    logo: new URL('../../assets/teamsassets/team1.png', import.meta.url).href,
    banner: new URL('../../assets/teamassets/banner.png', import.meta.url).href,
    description:
      'Enim et faucibus maximus, nulla massa finibus arcu, ornare euismod…',
    createdAT: '12-12-2024',
    stats: { games: 12, wins: 8, losses: 2, draws: 2 },
    socials: [
      { name: 'youtube', url: '#' },
      { name: 'twitch', url: '#' },
      { name: 'chat', url: '#' },
    ],
    players: [
      { id: 1, name: 'Shadow', role: 'Top', avatar: '/assets/teams/team3.png' },
      { id: 2, name: 'Viper', role: 'Jungle', avatar: '/assets/teams/team3.png' },
      // …
    ],
  },
  // más equipos…
];
