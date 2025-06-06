// src/firebase/uploadTeamLogo.ts
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

export async function uploadTeamLogo(idTeam: number, file: File): Promise<string> {
  const storageRef = ref(storage, `Teams/${idTeam}/Logo/foto.png`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}
