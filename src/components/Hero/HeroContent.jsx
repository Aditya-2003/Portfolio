import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

export default function HeroContent() {
  return (
    <div className="relative z-20 h-screen flex items-center px-6 md:px-16">
      <div className="max-w-4xl mt-20">
        <motion.h1
          initial={{ opacity: 0, y: 50, filter:"blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter:"blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="hero-title"
        >
          Aditya Shrivas
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 , filter:"blur(2px)"}}
          animate={{ opacity: 1, filter:"blur(0px)" }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-6"
        >
          <p className="google-sans-flex uppercase tracking-[0.35em] text-xs text-white/75 leading-relaxed">
            Creative Technologist &
            <br />
            Software Engineer
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 ,filter:"blur(2px)" }}
          animate={{ opacity: 1, y: 0, filter:"blur(0px)" }}
          transition={{ delay: 0.7, duration: 1 }}
          className="mt-10"
        >
          <div className="w-20 h-[1px] bg-[#A68A64] mb-8" />

          <p className="google-sans-flex max-w-xl text-base md:text-lg leading-[1.7] text-white/80 font-light">
            Designing modern digital systems, business websites, and AI-assisted experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-14"
        >
          <MagneticButton key="Work" href="#work" >
            View Selected Work
          </MagneticButton>

        </motion.div>
      </div>
    </div>
  );
}