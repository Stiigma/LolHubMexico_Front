export interface CreateScrimDTO {
  created_by: number;
  idTeam1: number;
  idTeam2: number; // Puedes dejarlo como 0 inicialmente
  scheduled_date: string; // ISO string (ej. "2025-06-10T18:30:00")
  idsUsers: number[];
}
