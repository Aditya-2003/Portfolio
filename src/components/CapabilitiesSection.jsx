// CapabilitiesSection.jsx

import { motion } from "framer-motion";
import { useState } from "react";

export default function CapabilitiesSection() {
  const [hoveredTech, setHoveredTech] = useState(null);

const capabilities = [
  {
    title: "Frontend Systems",

    stack: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Three.js",
    ],

    description:
      "Building responsive frontend systems, interaction-focused interfaces, and scalable user experiences with strong attention to usability and motion.",
  },

  {
    title: "Product Engineering",

    stack: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Authentication",
      "MongoDB",
      "Realtime Systems",
    ],

    description:
      "Focused on scalable backend systems, product-aware engineering decisions, API architecture, and reliable application flows.",
  },

  {
    title: "Interaction & Experience",

    stack: [
      "Interaction Design",
      "Motion Systems",
      "UX Thinking",
      "Creative Direction",
      "Spatial Interfaces",
      "Responsive Experiences",
    ],

    description:
      "Interested in how motion, pacing, interaction feedback, and visual rhythm influence digital behavior and usability.",
  },

  {
    title: "AI & Experimental Systems",

    stack: [
      "AI Interfaces",
      "Prompt Systems",
      "Conversational UX",
      "Automation",
      "Adaptive Flows",
      "Creative Engineering",
    ],

    description:
      "Exploring AI-assisted workflows, conversational systems, prompt-driven interfaces, and operational automation concepts.",
  },
];

  return (
    <section className="relative bg-gradient-to-b 
from-[#04030b] 
via-[#0B0D10] 
to-[#0A0A0A] py-24 overflow-hidden border-white/[0.05]">

      {/* Ambient Background with Enhanced Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-25">

        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-gradient-to-br from-[#A68A64]/15 to-transparent blur-[180px] animate-pulse" />

        <div className="absolute bottom-[0%] right-[5%] w-[400px] h-[400px] bg-gradient-to-tl from-white/[0.05] to-transparent blur-[160px]" />

        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-gradient-to-bl from-amber-900/10 to-transparent blur-[140px]" />
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.025] mix-blend-soft-light pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "4px 4px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="mb-24"
        >

          <p className="text-[11px] uppercase tracking-[0.35em] text-white/40 mb-10">
            CAPABILITIES
          </p>

          <h2 className="google-sans-flex text-[#F5F1EB] text-[4rem] md:text-[6rem] lg:text-[7rem] leading-[0.92] tracking-[-0.01em] max-w-5xl">
            Building systems
            <br />
            that balance
            <br />
            engineering
            <br />
            and experience.
          </h2>

          <p className="mt-10 max-w-2xl text-white/65 text-lg leading-[1.9]">
            My work sits between modern engineering,
            interaction design, motion systems,
            and product-focused development.
          </p>
        </motion.div>

        {/* Capability Blocks */}
        <div className="border-t border-white/[0.06]">

          {capabilities.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 80,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              className="
                group
                grid
                grid-cols-1
                lg:grid-cols-12
                gap-12
                py-20
                border-b
                border-white/[0.06]
                hover:border-white/[0.12]
                transition-colors
                duration-500
              "
            >

              {/* Left Side */}
              <div className="lg:col-span-4">

                <div className="flex items-center gap-5 mb-8">

                  <motion.div
                    className="w-12 h-[1px] bg-[#A68A64]/70 group-hover:bg-amber-400"
                    transition={{ duration: 0.3 }}
                  />

                  <p className="text-[11px] uppercase tracking-[0.25em] text-white/35 group-hover:text-white/60 transition-colors duration-300">
                    0{index + 1}
                  </p>
                </div>

                <h3 className="text-[#F5F1EB] text-3xl md:text-4xl tracking-[-0.04em] leading-[1.1] group-hover:text-amber-100 transition-colors duration-300">
                  {item.title}
                </h3>
              </div>

              {/* Right Side */}
              <div className="lg:col-span-8">

                {/* Stack */}
                <div className="flex flex-wrap gap-4">

                  {item.stack.map((tech, techIndex) => (
                    <motion.div
                      key={tech}
                      onHoverStart={() => setHoveredTech(tech)}
                      onHoverEnd={() => setHoveredTech(null)}
                      whileHover={{
                        scale: 1.05,
                        y: -4,
                      }}
                      className="
                        border
                        border-white/[0.08]
                        bg-gradient-to-br from-white/[0.03] to-white/[0.01]
                        px-5
                        py-3
                        text-[11px]
                        uppercase
                        tracking-[0.22em]
                        text-white/65
                        hover:border-amber-500/50
                        hover:text-white
                        hover:shadow-md
                        hover:shadow-amber-500/10
                        transition-all
                        duration-300
                        cursor-pointer
                        rounded-lg
                        backdrop-blur-sm
                      "
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0.6 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="mt-10 max-w-3xl text-white/65 text-[15px] leading-[1.9] group-hover:text-white/70 transition-colors duration-300"
                >
                  {item.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Reflection */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.2,
          }}
          viewport={{ once: true }}
          className="mt-20 max-w-3xl"
        >
          <p className="text-white/35 text-xl md:text-2xl leading-[1.8] font-light hover:text-white/50 transition-colors duration-500">
            I’m interested in building products where
            engineering decisions, interaction quality,
            and visual clarity support each other instead
            of competing for attention.

          </p>
        </motion.div>
      </div>
    </section>
  );
}