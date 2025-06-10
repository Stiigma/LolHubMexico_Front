// Importamos la interfaz de GeminiAnalysis, ya que se anidará aquí
import type { GeminiAnalysis } from "./gemini-analysis";

export interface ScrimLog {
  idLogScm: number;
  idScrim: number;
  matchId: string;
  geminiAnalysisJson: string; // Aquí guardamos la cadena JSON original
  geminiAnalysis?: GeminiAnalysis; // Este campo será opcional y contendrá el objeto deserializado
  logDate: string; // Podrías usar Date si quieres procesarlo como objeto Date
}