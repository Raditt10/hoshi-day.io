import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CHARACTERS } from '../data/characters';
import Footer from '../components/ui/Footer';
import BackButton from '../components/ui/BackButton';

const CharacterRoster = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-900 text-white overflow-x-hidden">
      
      {/* GLOBAL BACK BUTTON */}
      <BackButton />

      {/* MAIN CONTENT */}
      <main className="pt-12 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        
        <div className="mb-8 text-center">
            <h2 className="font-['Bangers'] text-5xl md:text-7xl mb-2 text-transparent bg-clip-text bg-gradient-to-t from-zinc-500 to-white drop-shadow-sm">
                CHARACTERS ROSTER
            </h2>
            
            <div className="relative h-px w-64 mx-auto mt-6">
               {/* Glowing Line */}
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-80 shadow-[0_0_15px_white]"></div>
               {/* Tech Deco Elements */}
               <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-white/50"></div>
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-white/50"></div>
               <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-[2px] bg-white shadow-[0_0_10px_white]"></div>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CHARACTERS.map((char, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={char.id}
              className="group relative bg-black border-4 border-zinc-800 hover:border-white transition-colors duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                <div 
                   className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700" 
                   style={{ backgroundImage: `url('${char.img}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 w-full p-6">
                   <div className="text-yellow-400 font-mono text-xs mb-1 tracking-widest">
                      {char.universe}
                   </div>
                   <h3 className="font-['Bangers'] text-4xl leading-none mb-2 text-white drop-shadow-lg">
                      {char.name}
                   </h3>
                   <p className="font-mono text-xs text-zinc-300 border-l-2 border-yellow-400 pl-2">
                      {char.desc}
                   </p>
                </div>
              </div>

              {/* Stats Hover Reveal */}
              <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-8 pointer-events-none">
                 <div className="space-y-4">
                    {Object.entries(char.stats).map(([stat, val]) => (
                        <div key={stat}>
                           <div className="flex justify-between font-mono text-xs text-zinc-400 uppercase mb-1">
                              <span>{stat}</span>
                              <span className="text-yellow-400">{val}/100</span>
                           </div>
                           <div className="w-full h-1 bg-zinc-800">
                              <motion.div 
                                className="h-full bg-white" 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${val}%` }}
                                transition={{ duration: 0.5 }}
                              />
                           </div>
                        </div>
                    ))}
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CharacterRoster;