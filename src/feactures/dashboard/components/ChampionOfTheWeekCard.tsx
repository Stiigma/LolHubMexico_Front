import React from 'react';
import Card from '../../../components/ui/Card';

const ChampionOfTheWeekCard: React.FC = () => {
  return (
    <Card title="Campeón de la Semana" image="/images/champion.jpg">
      Esta semana destacamos a <strong>Ahri</strong>. Aprende sus mejores combos y tips de rotación.
    </Card>
  );
};

export default ChampionOfTheWeekCard;


