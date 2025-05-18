// src/features/teams/types/TeamInvitations.ts

export interface TeamInvitationDTO {
  idInvitation: number;
  idTeam: number;
  teamName: string;
  invitedBy: number;
  invitedByUsername: string;
  status: number; // 0: pendiente, 1: aceptado, 2: rechazado
  sentDate: string;
  message?: string;
}

export const mockInvitations: TeamInvitationDTO[] = [
  {
    idInvitation: 1,
    idTeam: 10,
    teamName: "Dragons Reign",
    invitedBy: 2,
    invitedByUsername: "Stigma26",
    status: 0,
    sentDate: "2025-05-18T19:30:00Z",
    message: "¡Únete a nuestro equipo! Necesitamos un mid laner fuerte.",
  },
  {
    idInvitation: 2,
    idTeam: 12,
    teamName: "Shadow Wolves",
    invitedBy: 3,
    invitedByUsername: "ZedMain01",
    status: 0,
    sentDate: "2025-05-17T15:10:00Z",
    message: "Jugamos todos los días por la tarde, ¿te interesa?",
  },
];
