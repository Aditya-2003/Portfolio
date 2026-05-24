import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Contact", href: "#contact" },
];

export default function HeroNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    if (href && href.startsWith("#")) {
      const targetId = href.slice(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50 google-sans-flex ">
      <nav className="flex items-center justify-between px-6 md:px-18 py-7">
        <div className="hidden lg:flex items-center gap-10">
          {links.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e) => {  
                handleSmoothScroll(e, link.href);
              }}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              whileHover={{ scale: 1.05, fontWeight: "500" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="cursor-pointer text-[11px] uppercase tracking-[0.25em] text-white/70 font-light transition-colors hover:text-white/100"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <motion.a
          href="/Aditya_Shrivas_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="
            hidden lg:flex
            text-[#0A0A0A]
            bg-white/75
            px-6
            py-3
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.25em]
            hover:bg-[#0A0B0C]
            hover:text-white/80
            transition-all
            duration-500
          "
        >
          View Resume
        </motion.a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden  flex items-center text-white"
        >
          {menuOpen ? <X size={24} className="z-50"/> : <Menu size={24} className="z-50" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 100 + "vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden 
                      absolute
                      top-0
                      left-0
                      w-full
                      h-screen  
                       overflow-hidden
                     bg-[#06070A]/80
                       backdrop-blur-2xl
                       border-b 
                     border-white/[0.06]"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[-20%] right-[-10%] w-full h-full bg-[#A68A64]/10 blur-[120px]" />
            </div>
            <div className="flex flex-col items-center gap-4 px-6 py-6 mt-20">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(link.href)}
                  className="text-sm uppercase tracking-[0.2em] text-white/70 hover:text-[#A68A64] transition-colors text-left"
                >
                  {link.label}
                </a>
              ))}
              <motion.a
                href="/Aditya_Shrivas_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.1 }}
                className="mt-5 text-[#0A0A0A] bg-white/75 px-6 py-3 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#A68A64] hover:text-white transition-all duration-500 inline-block"
              >
                View Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}