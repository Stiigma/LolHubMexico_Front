// types/LinkUser.ts
import type { UserDTO } from "@/shared/types/User/UserDTO";
import type { PlayerDTO } from "./PlayerDTO";
export interface LinkUser {
  user: UserDTO;
  player: PlayerDTO;
}
