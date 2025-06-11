export interface Tournament {
  nombre: string;
  descripcion?: string;
  fechaInicio: string;  // formato ISO string, ej. '2025-06-10T10:00:00'
  fechaFin?: string;
  idCreador: number;
}

export interface TournamentEnriched {
  idTorneo: number;
  nombre: string;
  descripcion?: string;
  fechaInicio: string;
  fechaFin?: string;
  estado: number; // 0: Pendiente, 1: En curso, 2: Finalizado
  idCreador: number;
  fechaCreacion: string;
}