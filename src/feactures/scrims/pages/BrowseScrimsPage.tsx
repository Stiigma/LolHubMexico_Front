// import React, { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import { useUser } from "@/context/UserContext";
// import type { ScrimPDTO } from "../types/ScrimPDTO";
// import { getScrimPending } from "../services/ScrimService";
// const BrowseScrimsPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [Scrims, setScrims] = useState<ScrimPDTO[]>([]);
//   const { user } = useUser();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   useEffect(() => {
//     if (!user?.idUser) return;
  
//       getScrimPending()
//         .then(async (fetchedScrim) => {
//           setScrims(fetchedScrim);
//       console.log(fetchedScrim);
        
//       })
//       .catch(() => setError("Error al obtener tu equipo"))
//       .finally(() => setLoading(false));
//   }, [user]);
//   // Lista estática de scrims
 

//   return (
//     <div className="text-white px-8 py-6 space-y-6">
//       <h1 className="text-3xl font-bold">Explorar Scrims Disponibles</h1>

//       {/* {Scrims.map((scrim) => (
//         <ScrimCard
//           key={scrim.idScrim}
//           teamName={scrim.idTeam1.toString()}
//           playerIcons={scrim.playerIcons}
//           gamestyle={scrim.gamestyle}
//           scalingLevel={scrim.scalingLevel as 'low' | 'medium' | 'high'}
//           onClick={() => navigate(`/scrims/${scrim.id}`)}
//         />
//       ))} */}
//     </div>
//   );
// };

// export default BrowseScrimsPage;
