import React, { useEffect } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Book, Lightbulb, Rocket, Sparkles } from 'lucide-react';

const QwizzMagicalLander = () => {
  const controls = useAnimation();
  // const { scrollY } = useScroll();
  // const y = useTransform(scrollY, [0, 300], [0, -50]);

  // useEffect(() => {
  //   controls.start({ opacity: 1, y: 0 });
  // }, [controls]);

  return (

    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-indigo-500 via-purple to-blue-500">
      {/* <div className="absolute inset-0 bg-white/10 backdrop-blur-[120px] z-0"></div> */}
      {/* Magical particle background that i messed the hell up on */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
          {[...Array(100)].map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 100 + "%"}
              cy={Math.random() * 100 + "%"}
              r="1"
              fill="url(#glowGradient)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </svg>
      </div>

      {/* Hero?? */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between min-h-screen px-8 max-w-7xl mx-auto">
      <motion.div
          className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0"
          // initial={{ opacity: 0, x: -50 }}
          // animate={controls}
        >
      <motion.div className="flex items-center mb-4"
      // style={{ y }}
      >
          <Sparkles className="text-yellow-400 mr-2" size={32} />
          <h2 className="text-2xl font-semibold text-yellow-400">Welcome to</h2>
        </motion.div>
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
          // style={{ y }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-blue-600">
            Qwizz
          </span>
        </motion.h1>
      <motion.p
        className="text-xl text-gray-200 mb-8 max-w-2xl"
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // transition={{ delay: 0.2 }}
      >
        Unlock the magic of learning with your intelligent study companion
      </motion.p>
        <motion.button
          className="px-8 py-3 bg-white text-purple-700 font-bold rounded-full text-lg shadow-lg hover:bg-purple-100 transition duration-300"
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.5)" }}
          whileTap={{ scale: 0.95 }}
          // initial={{ opacity: 0, y: 20 }}
          // animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => { window.location.href = "/auth/login"; }}
        >
          Begin Your Journey
        </motion.button>

        <div className="mt-12 grid grid-cols-2 gap-4">
            <FeatureItem icon={Book} text="Personalized Learning" />
            <FeatureItem icon={Lightbulb} text="Adaptive Quizzes" />
            <FeatureItem icon={Rocket} text="Progress Tracking" />
            <FeatureItem icon={Sparkles} text="AI-Powered Insights" />
          </div>


        </motion.div>
        {/* image on the right */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center md:justify-end"
          // initial={{ opacity: 0, x: 50 }}
          // animate={{ opacity: 1, x: 0 }}
          // transition={{ delay: 0.6 }}
        >
          <div className="relative w-full max-w-md h-[400px] md:h-[500px]">
            <Image
              src="/home-background.png"
              alt="Qwizz Learning Experience"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-900/20 to-transparent rounded-lg opacity-50"></div>
          </div>


        </motion.div>
      </div>

      {/* Floating books */}
      {/* <motion.div
        className="absolute bottom-10 left-10 w-20 h-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div> */}
      <FloatingElement className="bottom-10 left-20" icon={Book} />
      <FloatingElement className="top-20 left-20" icon={Lightbulb} />
      <FloatingElement className="top-1/2 left-20" icon={Rocket} />
    </div>

  );
};

const FeatureItem = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-2 text-white">
    <Icon className="text-blue-600" size={24} />
    <span>{text}</span>
  </div>
);

const FloatingElement = ({ className, icon: Icon }) => (
  <motion.div
    className={`absolute ${className} w-12 h-12 text-white/50`}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  >
    <Icon size={48} />
  </motion.div>
);

export default QwizzMagicalLander;
