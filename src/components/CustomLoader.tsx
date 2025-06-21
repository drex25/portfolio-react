import React from 'react';
import { motion } from 'framer-motion';

const CustomLoader: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Fondo con patrón igual al sitio */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} 
        />
      </div>

      {/* Contenido del loader */}
      <div className="relative z-10 text-center">
        {/* Logo animado */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            duration: 1 
          }}
        >
          {/* Anillos orbitales */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-32 h-32 rounded-full border-2 border-cyan-400/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-40 h-40 rounded-full border border-blue-400/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          {/* Logo central */}
          <motion.div
            className="relative w-24 h-24 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white text-3xl font-black shadow-2xl"
            animate={{ 
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 20px rgba(34, 211, 238, 0.3)",
                "0 0 40px rgba(34, 211, 238, 0.6)",
                "0 0 20px rgba(34, 211, 238, 0.3)"
              ]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            D
          </motion.div>
        </motion.div>

        {/* Texto animado "Drex" */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-black bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{
              backgroundSize: "200% 200%"
            }}
          >
            {"Drex".split('').map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.8 + index * 0.1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.p
            className="text-cyan-400 text-xl font-medium tracking-wider mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            DEVELOPER
          </motion.p>
        </motion.div>

        {/* Barra de progreso animada */}
        <motion.div
          className="w-64 h-1 bg-white/10 rounded-full mx-auto overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              delay: 1.8, 
              duration: 2, 
              ease: "easeInOut" 
            }}
          />
        </motion.div>

        {/* Texto de carga */}
        <motion.p
          className="text-gray-400 text-sm mt-6 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ 
            delay: 2, 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          Cargando experiencia digital...
        </motion.p>

        {/* Partículas de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CustomLoader;