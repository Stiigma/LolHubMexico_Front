export interface CreateTeamInvitationDTO {
  idTeam: number;
  idUser: number;
  invitedBy: number;
  message: string;
}