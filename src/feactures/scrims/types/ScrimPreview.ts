import type { ScrimEnriched } from "./ScrimEnriched";

export interface IScrimPreview{
    scrimEnriched: ScrimEnriched;
    isOpen: boolean;
    onClose: () => void;
}