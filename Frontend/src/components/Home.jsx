import React from 'react';
import background from '../assets/background.jpg';

const Home = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans">
      {/* Fullscreen Background Image */}
      <div className="absolute inset-0">
        <img
          src={background}
          alt="children"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/40 to-yellow-600/10 z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
          <span className="text-yellow-400 drop-shadow-lg block">Every Child Deserves</span>
          <span className="text-white">a Childhood</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-yellow-100 max-w-2xl mx-auto leading-relaxed">
          Join CRY – Child Rights and You – in creating brighter futures for India’s children through education, healthcare, and protection from injustice.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-yellow-300 transform hover:scale-105 transition-all">
            Donate Now
          </button>
          <button className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-400 hover:text-black transform transition-all">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;