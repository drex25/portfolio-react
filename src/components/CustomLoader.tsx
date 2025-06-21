import React from 'react';
import { motion } from 'framer-motion';

const CustomLoader: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
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

      {/* Efectos de fondo dinámicos */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Ondas de energía */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full rounded-full border border-cyan-400/20 animate-pulse" />
        </motion.div>
        
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1.2, 0.8, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full rounded-full border border-blue-400/30" />
        </motion.div>
      </div>

      {/* Contenido principal del loader */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Logo central con efectos espectaculares */}
        <motion.div
          className="relative mb-12"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            duration: 1.2 
          }}
        >
          {/* Anillos orbitales múltiples */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-40 h-40 rounded-full border-2 border-cyan-400/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-56 h-56 rounded-full border border-blue-400/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-72 h-72 rounded-full border border-purple-400/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          {/* Logo central con glow dinámico */}
          <motion.div
            className="relative w-32 h-32 rounded-3xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center text-white text-5xl font-black shadow-2xl"
            animate={{ 
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 30px rgba(34, 211, 238, 0.4), 0 0 60px rgba(59, 130, 246, 0.3)",
                "0 0 50px rgba(34, 211, 238, 0.8), 0 0 100px rgba(59, 130, 246, 0.6)",
                "0 0 30px rgba(34, 211, 238, 0.4), 0 0 60px rgba(59, 130, 246, 0.3)"
              ]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 10px rgba(255,255,255,0.8)",
                  "0 0 20px rgba(34, 211, 238, 1)",
                  "0 0 10px rgba(255,255,255,0.8)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              D
            </motion.span>
          </motion.div>

          {/* Partículas orbitales */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: `${60 + i * 15}px 0px`,
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Texto principal "itsdrex.dev" con efectos increíbles */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-4"
            style={{
              background: "linear-gradient(45deg, #ffffff, #06b6d4, #3b82f6, #8b5cf6, #06b6d4, #ffffff)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            {"itsdrex.dev".split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ 
                  opacity: 0, 
                  y: 50,
                  rotateX: -90
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  rotateX: 0
                }}
                transition={{
                  delay: 1.2 + index * 0.08,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200,
                  damping: 12
                }}
                whileHover={{
                  scale: 1.1,
                  textShadow: "0 0 20px rgba(34, 211, 238, 0.8)"
                }}
                className="inline-block"
                style={{
                  textShadow: char === '.' ? "0 0 15px rgba(34, 211, 238, 0.8)" : "none"
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1 max-w-32"
              animate={{
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.p
              className="text-cyan-400 text-lg md:text-xl font-bold tracking-[0.3em] px-4"
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [0.98, 1, 0.98]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              FULL STACK DEVELOPER
            </motion.p>
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1 max-w-32"
              animate={{
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            />
          </motion.div>
        </motion.div>

        {/* Barra de progreso futurista */}
        <motion.div
          className="relative w-80 h-2 bg-white/10 rounded-full mx-auto overflow-hidden border border-cyan-400/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          {/* Fondo con efecto de ondas */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20"
            animate={{
              x: ["-100%", "100%"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Barra de progreso principal */}
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full relative overflow-hidden"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              delay: 3, 
              duration: 2.5, 
              ease: "easeOut" 
            }}
          >
            {/* Efecto de brillo que se mueve */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{
                x: ["-100%", "100%"]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3
              }}
            />
          </motion.div>
        </motion.div>

        {/* Texto de estado con efectos */}
        <motion.div
          className="mt-8 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.8 }}
        >
          <motion.p
            className="text-gray-300 text-sm font-medium"
            animate={{ 
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            Inicializando experiencia digital...
          </motion.p>
          
          <motion.div
            className="flex justify-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 0.5 }}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-cyan-400 rounded-full"
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Partículas de fondo mejoradas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? "#06b6d4" : i % 3 === 1 ? "#3b82f6" : "#8b5cf6"
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 3,
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