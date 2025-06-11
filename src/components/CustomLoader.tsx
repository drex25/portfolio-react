import { motion } from 'framer-motion';

const loaderVariants = {
  animate: {
    rotate: [0, 360],
    transition: {
      repeat: Infinity,
      duration: 1.2,
      ease: "linear"
    }
  }
};

const pulseVariants = {
  animate: {
    scale: [1, 1.15, 1],
    opacity: [1, 0.7, 1],
    transition: {
      repeat: Infinity,
      duration: 1.2,
      ease: "easeInOut"
    }
  }
};

const CustomLoader: React.FC = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900 bg-opacity-80">
    <motion.div
      className="relative flex items-center justify-center"
      variants={loaderVariants}
      animate="animate"
    >
      <motion.div
        className="absolute w-20 h-20 rounded-full bg-primary-500/20"
        variants={pulseVariants}
        animate="animate"
      />
      <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg border-4 border-primary-300">
        D
      </div>
    </motion.div>
  </div>
);

export default CustomLoader; 