import { motion } from "framer-motion";

export default function MagneticButton({ children, href }) {
  const handleSmoothScroll = (e) => {
    e.preventDefault();
    if (href && href.startsWith("#")) {
      const targetId = href.slice(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.button
      whileHover={{ y: -4, color: "#000" }}
      onClick={handleSmoothScroll}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden border border-[#A68A64]/40 px-8 py-5 uppercase tracking-[0.25em] text-sm"
    >
      <span className="relative z-10 flex items-center gap-5">
        {children}

        <span className="transition-transform duration-500 group-hover:translate-x-2">
          →
        </span>
      </span>

      <div className="absolute inset-0 bg-[#A68A64] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
    </motion.button>
  );
}