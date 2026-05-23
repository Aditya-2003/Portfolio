import { motion } from "framer-motion";
import heroImage from "../../assets/hero-image3.png";
import useMouseParallax from "../../hooks/useMouseParallax";

export default function HeroBackground() {
  const { x, y } = useMouseParallax(15);

  return (
    <motion.div
      style={{ x, y }}
      className="absolute h-screen inset-0 scale-101 overflow-hidden"
    >
      <img
        src={heroImage}
        alt="Hero"
        className="w-full h-screen object-cover object-[65%] lg:object-center brightness-300"
      />
    </motion.div>
  );
}