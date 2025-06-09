import React from "react";
import TournamentBracket from "../components/TournamentBracket";

const TournamentBracketPage: React.FC = () => {
  const staticTeams = [
    { name: "TTM", logo: "/assets/logos/ttm.png" },
    { name: "CHK", logo: "/assets/logos/chk.png" },
    { name: "THS", logo: "/assets/logos/ths.png" },
    { name: "LCS", logo: "/assets/logos/lcs.png" },
    { name: "WWW", logo: "/assets/logos/www.png" },
    { name: "DMT", logo: "/assets/logos/dmt.png" },
    { name: "POP", logo: "/assets/logos/pop.png" },
    { name: "III", logo: "/assets/logos/iii.png" },
  ];

  return <TournamentBracket teams={staticTeams} />;
};

export default TournamentBracketPage;











