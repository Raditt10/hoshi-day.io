import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MangaLayout from '../components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from '../components/ui/LoadingScreen';
import SearchBar from '../components/ui/SearchBar';
import Footer from '../components/ui/Footer';
import CustomToast from '../components/ui/Warning';
import DatePicker from '../components/ui/DatePicker';
import { CHARACTERS } from '../data/characters';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ name: '', day: '', month: '', character: 'gojo' });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('GENERATE...');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    if (location.state?.selectedCharacter) {
      setFormData(prev => ({
        ...prev,
        character: location.state.selectedCharacter
      }));
    }
  }, [location.state]);

  const filteredCharacters = CHARACTERS.filter(char => 
    char.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    char.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Validate Fields
    if (!formData.name.trim()) {
        showToast("TARGET NAME IS REQUIRED!");
        return;
    }
    if (!formData.day) {
        showToast("MISSING DAY PARAMETER (DD)!");
        return;
    }
    if (!formData.month) {
        showToast("MISSING MONTH PARAMETER (MM)!");
        return;
    }
    
    // 2. Validate Date Logic
    const day = parseInt(formData.day);
    const month = parseInt(formData.month);

    if (day < 1 || day > 31) {
        showToast("INVALID DAY! (1-31)");
        return;
    }
    if (month < 1 || month > 12) {
        showToast("INVALID MONTH! (1-12)");
        return;
    }

    // 3. Initiate Load
    setLoadingText('GENERATE...');
    setIsLoading(true);
    
    setTimeout(() => {
      navigate(`/mission/${formData.name}/${formData.day}/${formData.month}/${formData.character}`, { state: { fromLoading: true } });
    }, 2000);
  };

  const handleDisplayAll = () => {
    setLoadingText('LOADING DATA...');
    setIsLoading(true);
    setTimeout(() => {
        navigate('/characters');
    }, 2000);
  }

  const comicVariants = {
    initial: { x: '50%', opacity: 0, scale: 0.9 },
    animate: { 
      x: '0%', 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.4, 0.0, 0.2, 1] } 
    },
    exit: { 
      x: isLoading ? '0%' : '-50%', 
      opacity: isLoading ? 1 : 0, 
      transition: { duration: isLoading ? 0 : 0.4, ease: [0.4, 0.0, 1, 1] } 
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div
      variants={comicVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-screen bg-zinc-900 overflow-x-hidden" // Added overflow-x-hidden
    >
      <MangaLayout 
        sidePanelContent={
          <div className="text-white text-center rotate-[-5deg] px-4 w-full relative z-20 mt-8 md:mt-0">
            <motion.div 
               initial={{ scale: 0.8, opacity: 0 }} 
               animate={{ scale: 1, opacity: 1, rotate: [0, -2, 2, 0] }}
               transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Responsive Text Size for Mobile Title */}
              <h1 className="font-['Bangers'] text-6xl sm:text-7xl md:text-9xl drop-shadow-[6px_6px_0_#000] leading-none mb-2 break-words text-white stroke-black">
                BIRTHDAY<br/>MAKER
              </h1>
              <p className="font-mono bg-yellow-400 text-black font-bold text-[10px] sm:text-xs md:text-lg inline-block px-4 py-1 transform skew-x-[-10deg] border-2 border-black shadow-[4px_4px_0_#000]">
                v0.1.0 // INITIALIZE SEQUENCE
              </p>
            </motion.div>
          </div>
        }
      >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg mx-auto relative px-3 sm:px-2 pb-20" // Adjusted padding
      >
        {/* Background Decor */}
        <div className="absolute top-0 right-0 -z-10 opacity-20 pointer-events-none select-none">
           <div className="font-['Bangers'] text-8xl md:text-9xl text-gray-200 leading-none">01</div>
        </div>
        
        {/* Manga Grid Texture */}
        <div className="absolute inset-0 -z-20 opacity-[0.08] pointer-events-none" 
             style={{ 
               backgroundImage: `linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)`, 
               backgroundSize: '40px 40px' 
             }}
        />

        {/* Dynamic Action Lines (Hidden on tiny screens to reduce clutter) */}
        <div className="hidden sm:block absolute top-20 left-[-10%] w-[120%] h-[3px] bg-black/10 -rotate-2 pointer-events-none -z-10" />
        <div className="hidden sm:block absolute bottom-40 left-[-10%] w-[120%] h-[2px] bg-black/10 rotate-3 pointer-events-none -z-10" />

        <motion.div variants={itemVariants} className="mb-8 md:mb-10 border-l-[8px] md:border-l-[12px] border-black pl-4 md:pl-6 relative mt-4">
           <span className="absolute -top-6 -left-2 text-[10px] font-mono font-bold bg-black text-white px-2 py-0.5">Make Your Own Version.</span>
           <h2 className="font-['Bangers'] text-5xl md:text-8xl mb-2 leading-[0.85] text-black drop-shadow-[2px_2px_0_rgba(0,0,0,0.1)]">
             FILL OUT<br/>THE FORM
           </h2>
           <p className="font-mono text-[10px] md:text-xs bg-black text-white inline-block px-3 py-1 transform -skew-x-12 shadow-[3px_3px_0_rgba(0,0,0,0.2)]">
             // Congratulate your lover Fiction Character! //
           </p>
        </motion.div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6 md:space-y-8">
          <motion.div variants={itemVariants} className="group relative">
            <label className="block font-['Bangers'] text-xl md:text-2xl mb-1 ml-1">TARGET NAME</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ex: Abdul Hussain"
                className="w-full bg-white border-3 border-black p-3 md:p-4 font-bold text-lg md:text-2xl focus:border-black focus:shadow-[6px_6px_0px_rgba(0,0,0,0.8)] focus:outline-none transition-all placeholder:text-gray-400 rounded-lg appearance-none shadow-[4px_4px_0px_rgba(0,0,0,0.6)] active:-translate-y-1 active:-translate-x-1 active:shadow-[2px_2px_0px_rgba(0,0,0,0.6)]"
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] md:text-xs text-gray-300 pointer-events-none">[REQ]</div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="group">
            <label className="block font-['Bangers'] text-xl md:text-2xl mb-1 ml-1">BIRTHDAY DATE</label>
            <DatePicker 
              day={parseInt(formData.day) || ''}
              month={parseInt(formData.month) || ''}
              onDateChange={(dateObj) => setFormData({...formData, day: dateObj.day, month: dateObj.month})}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="group">
            <label className="block font-['Bangers'] text-xl md:text-2xl mb-2 ml-1">SELECT CHARACTER</label>
            
            <SearchBar 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
            
            <AnimatePresence>
            {searchQuery && filteredCharacters.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-2 pl-1"
                >
                    <span className="bg-yellow-400 text-black border-2 border-black text-[10px] font-mono font-bold px-2 py-1 inline-block shadow-[2px_2px_0_#000]">
                        {'>>'} SYSTEM MATCH FOUND
                    </span>
                </motion.div>
            )}
            </AnimatePresence>

            {/* MOBILE FRIENDLY GRID: 2 Columns on Mobile, 3 on Tablet/Desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mt-2">
              {filteredCharacters.map((char) => (
                <div 
                  key={char.id}
                  onClick={() => setFormData({...formData, character: char.id})}
                  className={`
                    cursor-pointer border-4 p-2 relative overflow-hidden transition-all group/char
                    ${formData.character === char.id ? 'border-black bg-black text-white transform -translate-y-1 shadow-[4px_4px_0_#000]' : 'border-gray-200 bg-gray-50 text-gray-400 active:border-zinc-400 sm:hover:border-black sm:hover:text-black'}
                  `}
                >
                  {char.img ? (
                    <div 
                      className="w-full h-14 md:h-16 mb-2 bg-cover bg-center grayscale group-hover/char:grayscale-0 transition-all"
                      style={{ backgroundImage: `url('${char.img}')` }}
                    />
                  ) : (
                    <div className={`w-full h-14 md:h-16 mb-2 ${char.color} opacity-80 group-hover/char:opacity-100 transition-opacity`} />
                  )}
                  
                  <div className="font-['Bangers'] text-lg md:text-xl leading-none truncate pr-4">{char.name}</div>
                  <div className="font-mono text-[9px] md:text-[10px] uppercase truncate">{char.desc}</div>
                  
                  {formData.character === char.id && (
                    <div className="absolute top-1 right-1 text-yellow-400 text-xs font-bold">★</div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-center relative z-10">
                <button
                   type="button"
                   onClick={handleDisplayAll}
                   className="w-full sm:w-auto text-[10px] sm:text-sm font-mono font-bold text-zinc-500 hover:text-white hover:bg-black border-2 border-zinc-200 hover:border-black flex items-center justify-center gap-2 transition-all px-4 py-3 sm:py-2 uppercase tracking-widest shadow-sm active:scale-95 sm:hover:shadow-[4px_4px_0_#000] sm:hover:-translate-y-1 cursor-pointer"
                >
                   <span>+ VIEW ALL PERSONNEL +</span>
                </button>
            </div>
          </motion.div>

          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.02, backgroundColor: "#000", color: "#fff" }}
            whileTap={{ scale: 0.95 }}
            type="submit" 
            className="w-full bg-black text-white font-['Bangers'] text-2xl md:text-4xl py-4 md:py-5 border-4 border-black hover:bg-red-600 hover:border-black shadow-[6px_6px_0_#999] hover:shadow-[8px_8px_0_#000] active:shadow-[2px_2px_0_#000] active:translate-y-1 transition-all relative overflow-hidden group whitespace-normal h-auto"
          >
            <span className="relative z-10 flex flex-wrap items-center justify-center gap-2 leading-none text-center">
              <span>INITIATE LAUNCH</span> 
              <span className="text-sm">{'>>'}</span>
            </span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 transform skew-y-12"></div>
          </motion.button>
        </form>

        <motion.div variants={itemVariants} className="mt-8 pb-8 text-center opacity-30">
             <p className="font-mono text-[10px]">/// SECURE FORM v0.1.0 ///</p>
        </motion.div>
        
        <AnimatePresence>
            {isLoading && <LoadingScreen text={loadingText} />}
        </AnimatePresence>

        <CustomToast 
            isVisible={toast.show} 
            message={toast.message} 
            onClose={() => setToast({...toast, show: false})} 
        />
      </motion.div>
      </MangaLayout>
      
      <Footer />
    </motion.div>
  );
};

export default Home;