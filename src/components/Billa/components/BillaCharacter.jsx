import { motion } from "framer-motion";

/**
 * Billa Character Component
 *
 * Visual representation: floating, minimal, ambient.
 * Motion is subtle and physically believable.
 * Idle animation is soft, not distracting.
 */

const BillaCharacter = ({ onClick }) => {
  return (
    <motion.div
      animate={{
        y: [0, -1.5, 0],
      }}
      transition={{
        duration: 4.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative select-none"
    >
      {/* Soft background glow - very subtle */}
      <div
        className="
          absolute
          inset-0
          rounded-full
          blur-3xl
          opacity-[0.12]
          bg-white
          -z-10
        "
      />

      {/* Character Image */}
      <motion.div
        whileHover={{
          scale: 1.04,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        className="cursor-pointer"
        onClick={onClick}
      >
        <img
          src="/billa.png"
          alt="Billa"
          className="
            w-24
            md:w-28
            select-none
            opacity-85
            drop-shadow-[0_0_0.5px_rgba(255,255,255,0.001)]
            transition-opacity
            duration-300
          "
          draggable="false"
        />
      </motion.div>

      {/* Hover indicator - minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="
          absolute
          inset-0
          rounded-full
          border
          border-white/[0.08]
          pointer-events-none
        "
      />
    </motion.div>
  );
};

export default BillaCharacter;
