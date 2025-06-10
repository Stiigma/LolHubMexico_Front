export interface MatchDetail {
  idMatchDetails: number;
  idScrim:       number;
  gameDuration:  number;
  gameMode:      string;
  gameVersion:   string;
  towersTeam1:   number;
  towersTeam2:   number;
  createdAt:     string;  // ISO-8601 timestamp
}