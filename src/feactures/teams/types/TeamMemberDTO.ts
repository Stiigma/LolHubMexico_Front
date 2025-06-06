import type { SrvRecord } from "dns";
import type { PlayerDTO } from "@/feactures/user/types/PlayerDTO";

export interface TeamMemberDTO {
  idTeamMembers: number;
  idUser: number;
  join_date: Date;
  userName: string;
  Status: number;
  role: string;
  email?: string;
  Username?: String;
  linkSummoner?: boolean;
  imagePath?: String;
  player?: PlayerDTO;
}
