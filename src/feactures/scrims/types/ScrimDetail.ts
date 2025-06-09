import type { ScrimPDTO } from "./ScrimPDTO";
import type { PlayerStats } from "@/feactures/user/types/PlayerStats";

export interface ScrimDetail {
  scrim: ScrimPDTO;
  team1Name: string;
  team1Logo: string;
  team1Players: PlayerStats[];

  team2Name: string;
  team2Logo: string;
  team2Players: PlayerStats[];
}