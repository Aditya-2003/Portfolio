// HowIThinkSection.jsx
import { motion } from "motion/react"

const thoughts = [
  {
    title: "Clarity over complexity",
    text: "Most systems become difficult because people keep adding before simplifying. I care more about reducing confusion than increasing features.",
  },

  {
    title: "Execution reveals reality",
    text: "Ideas usually sound intelligent in discussions. Real product thinking begins when constraints, behavior, and usage expose weak assumptions.",
  },

  {
    title: "Good systems reduce noise",
    text: "The more I build, the more I value restraint. Good interaction design rarely demands attention loudly.",
  },

  {
    title: "Interfaces influence decisions",
    text: "Systems shapes decisions quietly. Small friction points compound into hesitation, confusion, and abandonment.",
  },
];

export default function Philosophy() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
     className="relative bg-gradient-to-b from-[#0A0A0A] via-[#090B0E] to-[#080808] overflow-hidden py-20 border-t border-white/[0.04] ">

      {/* Ambient Gradient */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#A68A64]/10 blur-[180px]" />

        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-white/[0.03] blur-[160px]" />
      </div>

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "150px 150px",
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">

        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
            HOW I THINK
          </p>
        </motion.div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          {/* Left Massive Statement */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <h2 className="text-[#F5F1EB] text-[4rem] md:text-[6rem]  lg:text-[6.2rem] leading-[0.92] space-x-2 tracking-[-0.02em]">
              I build with
              <br />
              structure,
              <br />
              restraint,
              <br />
              and intention.
            </h2>

            {/* Small supporting line */}
            <p className="mt-10 max-w-md text-white/55 text-lg leading-[1.9]">
              I’m interested in systems that feel obvious to use,
              calm to experience, and reliable beneath the surface.
            </p>

            {/* Urdu Fragment */}
            <div className="mt-16 opacity-[0.35]">
              <p className="font-serif italic text-2xl text-[#F5F1EB]">
                “The more I build, the more I value simplicity.”
              </p>
            </div>
          </motion.div>

          {/* Right Thoughts Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-20">

            {thoughts.map((item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 60,
                  filter: "blur(12px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 1,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
                className="group"
              >

                {/* Tiny Accent Line */}
                <div className="w-12 h-[1px] bg-[#A68A64]/70 mb-8 transition-all duration-700 group-hover:w-20" />

                <h3 className="text-[#F5F1EB] text-2xl tracking-[-0.03em] mb-6">
                  {item.title}
                </h3>

                <p className="text-white/55 leading-[1.9] text-[15px]">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Noise Layer */}
      <div className="absolute inset-0 opacity-[0.025] mix-blend-soft-light pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "4px 4px",
          }}
        />
      </div>
    </motion.section>
  );
}