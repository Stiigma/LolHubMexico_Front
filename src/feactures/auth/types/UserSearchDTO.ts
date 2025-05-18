// src/features/teams/types/UserSearchDTO.ts
export interface UserSearchDTO {
  idUser: number;
  userName: string;
  email: string;
  status: number; // 0: disponible para invitar, 1: ya en equipo
}
