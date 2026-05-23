import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Philosophy", href: "#philosophy", id: "philosophy" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function FloatingNavbar({ visible }) {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    links.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      links.forEach((link) => {
        const element = document.getElementById(link.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const handleSmoothScroll = (e, href) => {
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
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{
            y: -100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: -100,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            fixed
            top-0
            md:top-2
            w-full
            z-[100]
            flex
            items-center
            justify-center
          "
        >
          <nav className="flex items-center justify-between w-full md:w-auto border-b
            border-white/[0.06]
            bg-black/40
            backdrop-blur-md px-6 md:px-5 py-2 md:rounded-3xl">

            <div className=" flex items-center justify-between gap-1 lg:gap-10">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`
                    text-[7px]
                    md:text-[11px]
                    uppercase
                    tracking-[0.25em]
                    px-3
                    py-2
                    rounded-3xl
                    transition-colors
                    duration-300
                    ${
                      activeSection === link.id
                        ? "bg-[#A68A64] text-white "
                        : "text-white/65 hover:text-white hover:bg-[#A68A64]"
                    }
                  `}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          
        </motion.header>
      )}
    </AnimatePresence>
  );
}