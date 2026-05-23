import { motion } from "framer-motion";

/**
 * Billa Speech Bubble Component
 *
 * Elegant, minimal speech bubble design.
 * Appears and disappears gracefully.
 * Typography emphasizes restraint and intentionality.
 */

const BillaSpeechBubble = ({ message }) => {
  return (
    <motion.div
      key={message}
      initial={{
        opacity: 0,
        y: 6,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 4,
        scale: 0.97,
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        absolute
        bottom-32
        md:bottom-36
        right-2
        w-[280px]
        md:w-[300px]
        rounded-[20px]
        border
        border-white/[0.06]
        bg-gradient-to-br
        from-black/60
        via-black/70
        to-black/80
        backdrop-blur-xl
        px-5
        py-4
        shadow-[
          0_8px_32px_rgba(0,0,0,0.5),
          inset_0_1px_1px_rgba(255,255,255,0.05)
        ]
      "
    >
      {/* Label */}
      <div className="flex items-center gap-2 mb-2.5">
        <span
          className="
            text-[9px]
            uppercase
            tracking-[0.32em]
            text-[#A68A64]/60
            font-medium
          "
        >
          BILLA
        </span>
        <div className="flex-grow h-px bg-gradient-to-r from-[#A68A64]/20 to-transparent" />
      </div>

      {/* Message Text */}
      <p
        className="
          text-[13px]
          leading-[1.6]
          text-white/75
          font-light
          tracking-[0.3px]
        "
      >
        {message}
      </p>

      {/* Tail - pointing down and right */}
      <div
        className="
          absolute
          bottom-[-6px]
          right-6
          w-3
          h-3
          rotate-45
          bg-gradient-to-br
          from-black/70
          to-black/80
          border-r
          border-b
          border-white/[0.04]
          shadow-[-2px_2px_8px_rgba(0,0,0,0.3)]
          z-20
        "
      />

      {/* Subtle shimmer on top edge */}
      <div
        className="
          absolute
          top-0
          left-0
          right-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/[0.03]
          to-transparent
          rounded-t-[20px]
        "
      />
    </motion.div>
  );
};

export default BillaSpeechBubble;
