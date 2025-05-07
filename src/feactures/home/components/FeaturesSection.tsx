import React from 'react';
import rankImg from '../../../assets/rank.png';
import torneoImg from '../../../assets/torneo.png';
import worldsImg from '../../../assets/worlds.png';

const features = [
  {
    title: 'Empieza a rankear y alcanza los top globales en nuestra plataforma',
    image: rankImg,
  },
  {
    title: 'Únete a torneos diarios y gana reconocimiento competitivo',
    image: torneoImg,
  },
  {
    title: 'Destaca y recibe ofertas reales para ingresar a un eSports profesional',
    image: worldsImg,
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 px-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="w-80 bg-gray-800 rounded-xl shadow-xl overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
