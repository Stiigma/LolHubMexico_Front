import type { ScrimPDTO } from "./ScrimPDTO";
export interface ScrimEnriched{
    scrimPDTO: ScrimPDTO;
    teamName1: string;
    teamName2: string;
    statusString: string;
    logoTeam1: string;
    createdby: string;
    descripcion: string;
}