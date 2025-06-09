//import type { SrvRecord } from "dns";
import type { PlayerDTO } from "@/feactures/user/types/PlayerDTO";

export interface TeamMemberDTO {
  idTeamMembers: number;
  idUser: number;
  join_date: Date;
  userName: string;
  Status: number;
  role: string;
  email?: string;
  Username?: string;
  linkSummoner?: boolean;
  imagePath?: string;
  player?: PlayerDTO;
}


export interface TeamMember {
  idTeamMembers: number;
  idTeam: number;
  idUser: number;
  join_date: string; // tipo `string` porque viene como string ISO
  status: number;
  role: string;
}