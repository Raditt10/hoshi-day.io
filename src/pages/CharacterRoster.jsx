import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CHARACTERS } from '../data/characters';
import Footer from '../components/ui/Footer';
import BackButton from '../components/ui/BackButton';
import SearchBar from '../components/ui/SearchBar';

const CharacterRoster = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCardClick = (id) => {
    setActiveCard(activeCard === id ? null : id);
  };

  const handleSelectCharacter = (characterId) => {
    navigate('/', { state: { selectedCharacter: characterId } });
  };

  // Filter characters based on search query
  const filteredCharacters = CHARACTERS.filter(char =>
    char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    char.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    char.universe.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-900 text-white overflow-x-hidden">
      
      {/* GLOBAL BACK BUTTON - Adjusted z-index & position for mobile */}
      <div className="relative z-50">
        <BackButton />
      </div>

      {/* MAIN CONTENT */}
      <main className="pt-20 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        
        <div className="mb-8 text-center">
            {/* Responsive Text Size */}
            <h2 className="font-['Bangers'] text-4xl sm:text-5xl md:text-7xl mb-2 text-transparent bg-clip-text bg-gradient-to-t from-zinc-500 to-white drop-shadow-sm tracking-wide">
                CHARACTERS ROSTER
            </h2>
            
            <div className="relative h-px w-48 md:w-64 mx-auto mt-6">
               {/* Glowing Line */}
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-80 shadow-[0_0_15px_white]"></div>
               <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-[2px] bg-white shadow-[0_0_10px_white]"></div>
            </div>
            
            {/* Mobile Hint Text */}
            <p className="md:hidden text-zinc-500 text-xs mt-4 font-mono animate-pulse">
              Tap card to view stats
            </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 w-full max-w-2xl mx-auto px-2 md:px-0">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SearchBar 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH CHARACTERS..."
            />
          </motion.div>
        </div>

        {/* No Results Message */}
        <AnimatePresence>
          {searchQuery && filteredCharacters.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <div className="inline-block bg-gradient-to-b from-zinc-800 to-black border-2 border-zinc-700 rounded-lg p-8 md:p-12 max-w-md mx-auto">
                <div className="mb-4 text-4xl">😔</div>
                <h3 className="font-['Bangers'] text-2xl md:text-3xl text-white mb-3">No Match Found</h3>
                <p className="text-zinc-400 text-sm md:text-base font-mono">
                  Sorry, it seems that character is not yet available here. Please wait for updates!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        {filteredCharacters.length > 0 || !searchQuery ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {(searchQuery === '' ? CHARACTERS : filteredCharacters).map((char, index) => {
              const isActive = activeCard === char.id;

              return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={char.id}
                onClick={() => handleCardClick(char.id)}
                className={`
                  group relative bg-black border-4 transition-colors duration-300 cursor-pointer overflow-hidden rounded-sm
                  ${isActive ? 'border-white' : 'border-zinc-800 hover:border-zinc-600 md:hover:border-white'}
                `}
              >
                {/* ASPECT RATIO CONTAINER 
                   Pada mobile, aspect ratio tetap dijaga agar gambar tidak gepeng.
                */}
                <div className="aspect-[3/4] relative overflow-hidden">
                  
                  {/* BACKGROUND IMAGE */}
                  {/* Note: Grayscale dihapus di mobile (grayscale-0) agar lebih vibrant, hanya aktif di desktop (md:grayscale) */}
                  <div 
                     className={`
                        absolute inset-0 bg-cover bg-center transition-all duration-700
                        ${isActive ? 'scale-110 grayscale-0' : 'scale-100 grayscale-0 md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-110'}
                     `}
                     style={{ backgroundImage: `url('${char.img}')` }}
                  />
                  
                  {/* GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                  
                  {/* CONTENT (Name, Desc) */}
                  <div className={`absolute bottom-0 left-0 w-full p-5 transition-opacity duration-300 ${isActive ? 'opacity-0 md:opacity-100' : 'opacity-100'}`}>
                     <div className="flex justify-between items-end">
                       <div>
                          <div className="text-yellow-400 font-mono text-[10px] md:text-xs mb-1 tracking-widest uppercase">
                            {char.universe}
                          </div>
                          <h3 className="font-['Bangers'] text-3xl md:text-4xl leading-none mb-2 text-white drop-shadow-lg">
                            {char.name}
                          </h3>
                          <p className="font-mono text-[10px] md:text-xs text-zinc-300 border-l-2 border-yellow-400 pl-2 line-clamp-2">
                            {char.desc}
                          </p>
                       </div>
                       
                       {/* Mobile explicit tap icon */}
                       <div className="md:hidden text-white/50 animate-bounce">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                       </div>
                     </div>
                  </div>

                  {/* STATS OVERLAY (Logic: Show on Hover (Desktop) OR Show on Active (Mobile)) */}
                  <div className={`
                    absolute inset-0 bg-black/90 flex flex-col justify-center p-6 md:p-8 transition-opacity duration-300
                    ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none md:group-hover:opacity-100'}
                  `}>
                     
                     {/* Close button for Mobile UX */}
                     <div className="absolute top-4 right-4 md:hidden text-zinc-500">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                     </div>

                     <h3 className="md:hidden font-['Bangers'] text-3xl text-white mb-6 text-center">{char.name} Stats</h3>

                     <div className="space-y-4 w-full">
                        {Object.entries(char.stats).map(([stat, val]) => (
                           <div key={stat}>
                              <div className="flex justify-between font-mono text-xs text-zinc-400 uppercase mb-1">
                                 <span>{stat}</span>
                                 <span className="text-yellow-400">{val}/100</span>
                              </div>
                              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                 <motion.div 
                                   className="h-full bg-yellow-400 shadow-[0_0_10px_#facc15]" 
                                   initial={{ width: 0 }}
                                   whileInView={{ width: isActive || window.innerWidth >= 768 ? `${val}%` : 0 }}
                                   transition={{ duration: 0.5, ease: "easeOut" }}
                                 />
                              </div>
                           </div>
                        ))}
                     </div>

                     {/* SELECT BUTTON */}
                     <motion.button
                       onClick={(e) => {
                         e.stopPropagation();
                         handleSelectCharacter(char.id);
                       }}
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                       className="w-full mt-6 bg-yellow-400 text-black border-2 border-black font-['Bangers'] text-lg px-4 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-all shadow-[4px_4px_0_rgba(0,0,0,0.6)]"
                     >
                       SELECT THIS CHARACTER
                     </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
          </div>
        ) : null}
      </main>
      
      <Footer />
    </div>
  );
};

export default CharacterRoster;