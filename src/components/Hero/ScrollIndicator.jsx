import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <div className="opacity-0 lg:opacity-100 absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center">
      <p className="text-[11px] tracking-[0.35em] uppercase text-white/60 mb-6">
        Scroll To Explore
      </p>

      <div className="relative h-24 w-[1px] bg-white/20 overflow-hidden">
        <motion.div
          animate={{ y: ["-100%", "100%"] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "linear",
          }}
          className="absolute top-0 left-0 w-full h-10 bg-white"
        />
      </div>
    </div>
  );
}