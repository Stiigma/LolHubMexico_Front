import React from 'react';

const features = [
  {
    title: 'Empieza a rankear para llegar a los top globales de nuestra plataforma',
    image: '/assets//rank.png', // ubicado en public/images/rank.png
  },
  {
    title: 'Únete a torneos diarios que se hacen para ser reconocido',
    image: '/assets/torneo.png',
  },
  {
    title: 'Sé reconocido para ser reclutado en un eSports profesional',
    image: '/assets/worlds.png',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-br from-gray-900 to-blue-950 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl hover:scale-105 transition-transform"
          >
            <img src={feature.image} alt={feature.title} className="w-full h-60 object-cover" />
            <div className="p-4">
              <h3 className="text-md font-semibold">{feature.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;

