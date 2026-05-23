// Footer.jsx

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-[#080C0D] overflow-hidden border-t border-white/[0.05]">

      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">

        <div className="absolute bottom-[-20%] left-[10%] w-[400px] h-[400px] bg-[#A68A64]/10 blur-[180px]" />

        <div className="absolute top-[-10%] right-[5%] w-[300px] h-[300px] bg-white/[0.03] blur-[140px]" />
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-soft-light pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "4px 4px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 py-16">

        {/* Top Row */}
        <div className="
          flex
          flex-col
          lg:flex-row
          items-start
          lg:items-end
          justify-between
          gap-16
        ">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
          >

            {/* Name */}
            <h2 className="
              bebas-neue
              text-[#F5F1EB]
              text-5xl
              md:text-7xl
              
              leading-[0.9]
            ">
              ADITYA SHRIVAS
            </h2>

            {/* Subtitle */}
            <p className="
              mt-6
              text-white/40
              max-w-md
              leading-[1.8]
              text-[15px]
            ">

              Creative Technologist & Software Engineer
              focused on immersive interfaces,
              interaction systems,
              and thoughtful digital experiences.

            </p>
          </motion.div>

          {/* Right Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="
              flex
              flex-col
              sm:flex-row
              gap-10
              sm:gap-20
            "
          >

            {/* Navigation */}
            <div>

              <p className="
                text-[11px]
                uppercase
                tracking-[0.3em]
                text-white/25
                mb-6
              ">
                Navigation
              </p>

              <div className="space-y-4">

                {[
                  { label: "Home", href: "#home" },
                  { label: "Work", href: "#work" },
                  { label: "Skills", href: "#skills" },
                  { label: "Philosophy", href: "#philosophy" },
                  { label: "Contact", href: "#contact" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="
                      block
                      text-white/55
                      hover:text-white
                      transition-colors
                      duration-300
                    "
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div>

              <p className="
                text-[11px]
                uppercase
                tracking-[0.3em]
                text-white/25
                mb-6
              ">
                Socials
              </p>

              <div className="space-y-4">

                {[
                  { label: "GitHub", url: "https://github.com/Aditya-2003" },
                  { label: "LinkedIn", url: "https://linkedin.com/in/aditya-shrivas-29b111256/" },
                  // { label: "Twitter", url: "https://twitter.com" },
                  { label: "Instagram", url: "https://instagram.com/adi_shrivas_12" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      block
                      text-white/55
                      hover:text-white
                      transition-colors
                      duration-300
                    "
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mt-20 border-t border-white/[0.06]" />

        {/* Bottom Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.2,
          }}
          viewport={{ once: true }}
          className="
            pt-8
            flex
            flex-col
            md:flex-row
            items-start
            md:items-center
            justify-between
            gap-6
          "
        >

          {/* Left */}
          <p className="text-white/20 text-sm">
            © 2026 Aadi. Built with intention.
          </p>

          {/* Center */}
          <p className="text-white/15 text-sm">
            React · Tailwind · Framer Motion · GSAP
          </p>

          {/* Right */}
          <p className="text-white/15 text-sm italic">
            “The more I build, the more I value simplicity.”
          </p>
        </motion.div>
      </div>
    </footer>
  );
}