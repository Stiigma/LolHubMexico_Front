export interface PlayerStats {
  userName: string;
  idUser: number;
  summonerName: string;
  profilePicture: string;
  championName: string;
  carril: string;
  nivel: number;
  kills: number;
  deaths: number;
  assists: number;
  goldEarned: number;
  farm: number;
  visionScore: number;
  teamDamagePercentage: string;
  items: string; // lista de ítems como texto o JSON, lo parseamos
}
