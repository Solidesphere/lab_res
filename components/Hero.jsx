import React from "react";

function Hero() {
  return (
    <header className="flex justify-center items-center py-10 px-4">
      <div className="max-w-3xl w-full rounded-2xl bg-white/30 backdrop-blur-md shadow-xl ring-1 ring-black/10 p-8 space-y-5 text-center animate-fade-in transition-all duration-500 ease-in-out">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          LABORATOIRE D'ANALYSES MÉDICALES EL-THIKA
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-blue-700 dark:text-blue-400">
          (Dr. BOUCHAREF Ep. Mounis)
        </h2>
        <p className="text-lg text-gray-800 dark:text-gray-300">
          Analyses médicales générales et spécialisées
        </p>
        <p className="text-lg text-gray-800 dark:text-gray-300">
          Analyses d'autoimmunité
        </p>
      </div>
    </header>
  );
}

export default Hero;
