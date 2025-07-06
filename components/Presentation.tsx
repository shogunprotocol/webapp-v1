'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    type: 'hero',
    title: 'Shōgun',
    subtitle: 'AI-Powered DeFi Yield Optimization',
    logo: '/logo/shogunLogo.png'
  },
  {
    id: 2,
    type: 'problem-intro',
    title: 'Drowning in protocols?',
    subtitle: 'We get it.',
    protocols: ['AAVE', 'MORPHO', 'TRADER JOE', 'COMPOUND', 'MAKER', 'UNISWAP', 'CURVE', 'BALANCER', 'SUSHI', 'YIELD', 'SPARK', 'FRAX', 'LIDO', 'RADIO', 'PENDLE', 'CONVEX', 'YFI', 'SNAPSHOT']
  },
  {
    id: 3,
    type: 'problems',
    title: 'The Problem',
    items: [
      'Inefficient yield discovery',
      'DeFi is STILL too complex',
      'Idle capital everywhere'
    ]
  },
  {
    id: 4,
    type: 'solution',
    title: 'The Solution',
    items: [
      'User deposit into specialized SuperVaults',
      'Our algorithms continuously scan the market to identify optimal yield opportunities while evaluating risk',
      'Shogun automatically rebalances assets across protocols to capture the highest yield within set risk parameters'
    ]
  },
  {
    id: 5,
    type: 'security-architecture',
    title: 'So Shogun is just an AI agent?',
    subtitle: 'What\'s the difference?'
  },
  {
    id: 6,
    type: 'networks',
    title: 'Multi-Chain Support',
    subtitle: 'Deploying on the most innovative networks',
    networks: [
      { name: 'Filecoin', icon: '🌐', description: 'Decentralized storage network' },
      { name: 'Flow', icon: '⚡', description: 'Fast and developer-friendly blockchain' }
    ]
  }
];

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (currentSlide < slides.length - 1) {
          setDirection(1);
          setCurrentSlide(prev => prev + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentSlide > 0) {
          setDirection(-1);
          setCurrentSlide(prev => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const renderSlide = (slide: typeof slides[0]) => {
    switch (slide.type) {
      case 'hero':
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-radial from-[#020409] to-[#0E141F]">
            <div className="text-center">
              <div className="mb-8">
                <Image 
                  src={slide.logo} 
                  alt="Shogun Logo" 
                  width={200} 
                  height={200}
                  className="mx-auto mb-6"
                />
              </div>
              <h1 className="text-6xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-basement)' }}>
                {slide.title}
              </h1>
              <p className="text-xl text-[#5FFBF1] font-aeonik tracking-wider">
                {slide.subtitle}
              </p>
            </div>
          </div>
        );

      case 'problem-intro':
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-radial from-[#020409] to-[#0E141F]">
            <div className="text-center max-w-4xl">
              <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-basement)' }}>
                {slide.title}
              </h1>
              <p className="text-2xl text-[#5FFBF1] mb-12 font-aeonik">
                {slide.subtitle}
              </p>
              <div className="grid grid-cols-6 gap-4">
                {slide.protocols?.map((protocol, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#181D23] border border-[#1C2431] rounded-lg p-4 text-center hover:border-[#5FFBF1] transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-sm text-white font-aeonik">{protocol}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'problems':
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-radial from-[#020409] to-[#0E141F]">
            <div className="text-center max-w-2xl">
              <h1 className="text-5xl font-bold text-white mb-12" style={{ fontFamily: 'var(--font-basement)' }}>
                {slide.title}
              </h1>
              <div className="space-y-8">
                {slide.items?.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.3 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                      <span className="text-red-400 font-bold text-xl">{index + 1}</span>
                    </div>
                    <span className="text-xl text-[#B6C2D6] font-aeonik text-left">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'solution':
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-radial from-[#020409] to-[#0E141F]">
            <div className="text-center max-w-4xl">
              <h1 className="text-5xl font-bold text-white mb-12" style={{ fontFamily: 'var(--font-basement)' }}>
                {slide.title}
              </h1>
              <div className="space-y-8">
                {slide.items?.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.3 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#5FFBF1]/20 border border-[#5FFBF1]/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#5FFBF1] text-2xl">⚔️</span>
                    </div>
                    <p className="text-lg text-[#B6C2D6] font-aeonik text-left leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'security-architecture':
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-radial from-[#020409] to-[#0E141F] p-8">
            <div className="text-center max-w-6xl">
              <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-basement)' }}>
                {slide.title}
              </h1>
              <p className="text-2xl text-[#5FFBF1] mb-12 font-aeonik">
                {slide.subtitle}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* User and Vault */}
                <div className="space-y-4">
                  <div className="bg-[#181D23] border border-[#1C2431] rounded-xl p-6">
                    <div className="text-[#5FFBF1] text-2xl mb-2">👤</div>
                    <h3 className="text-white font-bold mb-2 font-basement">User</h3>
                    <p className="text-[#B6C2D6] text-sm font-aeonik">Deposits funds into secure vault</p>
                  </div>
                  <div className="bg-[#181D23] border border-[#1C2431] rounded-xl p-6">
                    <div className="text-[#5FFBF1] text-2xl mb-2">🔒</div>
                    <h3 className="text-white font-bold mb-2 font-basement">Secure Vault</h3>
                    <p className="text-[#B6C2D6] text-sm font-aeonik">Funds never leave this vault</p>
                  </div>
                </div>

                {/* Security Layer */}
                <div className="bg-[#232A36] border border-[#5FFBF1]/30 rounded-xl p-6">
                  <div className="text-[#5FFBF1] text-2xl mb-4">🛡️</div>
                  <h3 className="text-white font-bold mb-4 font-basement">Security Layer</h3>
                  <div className="space-y-2 text-left">
                    <p className="text-[#B6C2D6] text-sm font-aeonik">• Whitelisted strategies only</p>
                    <p className="text-[#B6C2D6] text-sm font-aeonik">• Curated smart contracts</p>
                    <p className="text-[#B6C2D6] text-sm font-aeonik">• Pre-approved addresses</p>
                  </div>
                </div>

                {/* AI Agent and DeFi */}
                <div className="space-y-4">
                  <div className="bg-[#181D23] border border-[#1C2431] rounded-xl p-6">
                    <div className="text-[#5FFBF1] text-2xl mb-2">🤖</div>
                    <h3 className="text-white font-bold mb-2 font-basement">AI Agent</h3>
                    <p className="text-[#B6C2D6] text-sm font-aeonik">Executes strategies, no fund access</p>
                  </div>
                  <div className="bg-[#181D23] border border-[#1C2431] rounded-xl p-6">
                    <div className="text-[#5FFBF1] text-2xl mb-2">🌊</div>
                    <h3 className="text-white font-bold mb-2 font-basement">DeFi Protocols</h3>
                    <p className="text-[#B6C2D6] text-sm font-aeonik">Whitelisted yield opportunities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'networks':
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-radial from-[#020409] to-[#0E141F]">
            <div className="text-center max-w-4xl">
              <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-basement)' }}>
                {slide.title}
              </h1>
              <p className="text-2xl text-[#5FFBF1] mb-12 font-aeonik">
                {slide.subtitle}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {slide.networks?.map((network, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#181D23] border border-[#1C2431] rounded-xl p-8 hover:border-[#5FFBF1] transition-all duration-300"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 }}
                  >
                    <div className="text-4xl mb-4">{network.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-4 font-basement">{network.name}</h3>
                    <p className="text-[#B6C2D6] font-aeonik">{network.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div ref={containerRef}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            {renderSlide(slides[currentSlide])}
          </motion.div>
        </AnimatePresence>

        {/* Navigation indicators */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-[#5FFBF1]' 
                      : 'bg-[#8FA5B3] hover:bg-[#B6C2D6]'
                  }`}
                  onClick={() => {
                    setDirection(index > currentSlide ? 1 : -1);
                    setCurrentSlide(index);
                  }}
                />
              ))}
            </div>
            
            <div className="text-[#8FA5B3] text-sm font-aeonik">
              <span className="mr-4">Use ← → arrow keys to navigate</span>
              <span className="text-[#5FFBF1]">
                {currentSlide + 1} / {slides.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation; 