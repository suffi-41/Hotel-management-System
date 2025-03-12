import { motion } from "framer-motion";

// Loading dots animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const dotVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      y: {
        type: "spring",
        stiffness: 100,
        damping: 8,
        repeat: Infinity,
        repeatType: "reverse",
      },
      opacity: { duration: 0.2 },
    },
  },
};

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center space-y-8"
      >
        {/* Loading Text with Animated Dots */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl font-bold  flex justify-center items-center"
        >
          <span>Loading</span>
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              variants={dotVariants}
              custom={index}
              className="ml-1"
            >
              .
            </motion.span>
          ))}
        </motion.div>

        {/* Animated Instruction Text */}
        <motion.p className="text-gray-400 mt-8 text-sm">
          Please wait while we prepare your content...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingPage;
