import { useEffect, useState, useRef } from "react";

export default function useScrollParallax(strength = 1) {
  const [offset, setOffset] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const windowCenter = window.innerHeight / 2;

      // Calculate parallax based on element position relative to viewport center
      const distance = windowCenter - elementCenter;
      const parallax = (distance * strength) / 100;

      setOffset(parallax);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [strength]);

  return { offset, ref };
}
