// ContactSection.jsx

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/mgodjajv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        setErrors({ submit: "Failed to send message. Please try again." });
      }
    } catch (error) {
      setErrors({ submit: "Error sending message. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-gradient-to-b  from-[#080808] to-[#080C0D] overflow-hidden ">

      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">

        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-[#A68A64]/10 blur-[180px]" />

        <div className="absolute bottom-[-10%] right-[5%] w-[450px] h-[450px] bg-white/[0.03] blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 py-12 md:py-30">

        {/* Top Intro */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="max-w-6xl"
        >

          <p className="text-[11px] uppercase tracking-[0.35em] text-white/40 mb-8">
            CONTACT
          </p>

          <h2 className="google-sans-flex text-[#F5F1EB] text-[4rem] md:text-[6rem] lg:text-[6rem] leading-[0.92] tracking-[-0.02em]">
            Interested in
            <br />
            meaningful work,
            <br />
            good systems,
            <br />
            and thoughtful people.
          </h2>

          <p className="mt-8 max-w-2xl text-white/55 text-lg leading-[1.9]">
            Interested in product-focused web experiences, modern frontend systems, automation workflows, and thoughtful digital products.
          </p>
        </motion.div>

        {/* Contact Layout */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-20">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >

            {/* Small Heading */}
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/35 mb-10">
              CONNECT
            </p>

            {/* Links */}
            <div className="space-y-8">

              <a
                href="mailto:adityashrivas95@gmail.com"
                className="group flex items-center justify-between border-b border-white/[0.06] pb-5"
              >
                <span className="text-[#F5F1EB] text-lg">
                  Email
                  <p className="text-white/40 text-sm">adityashrivas95@gmail.com</p>
                </span>

                <span className="text-white/35 transition-transform duration-500 group-hover:translate-x-2">
                  →
                </span>
              </a>

              <a
                href="https://github.com/Aditya-2003"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-white/[0.06] pb-5"
              >
                <span className="text-[#F5F1EB] text-lg">
                  GitHub
                  <p className="text-white/40 text-sm">github.com/Aditya-2003</p>
                </span>

                <span className="text-white/35 transition-transform duration-500 group-hover:translate-x-2">
                  →
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/aditya-shrivas-29b111256/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-white/[0.06] pb-5"
              >
                <span className="text-[#F5F1EB] text-lg">
                  LinkedIn
                  <p className="text-white/40 text-sm">linkedin.com/in/aditya-shrivas-29b111256/</p>
                </span>

                <span className="text-white/35 transition-transform duration-500 group-hover:translate-x-2">
                  →
                </span>
              </a>


            </div>

            {/* Reflection */}
            <div className="mt-16 max-w-sm">

              <p className="text-white/30 leading-[1.9] text-[15px]">

                I care about building products that feel clear, usable, and technically reliable without sacrificing interaction quality.

              </p>
            </div>
          </motion.div>

          {/* Right Side Form */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >

            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Submit Error Message */}
              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                >
                  {errors.submit}
                </motion.div>
              )}

              {/* Name */}
              <div>

                <label className="block text-[11px] uppercase tracking-[0.25em] text-white/35 mb-5">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`
                    w-full
                    bg-transparent
                    border-b
                    pb-5
                    text-[#F5F1EB]
                    text-[1.4rem]
                    outline-none
                    placeholder:text-white/20
                    transition-colors
                    duration-500
                    ${errors.name
                      ? "border-red-500/50 focus:border-red-500/70"
                      : "border-white/[0.08] focus:border-[#A68A64]/50"
                    }
                  `}
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-2"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </div>

              {/* Email */}
              <div>

                <label className="block text-[11px] uppercase tracking-[0.25em] text-white/35 mb-5">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`
                    w-full
                    bg-transparent
                    border-b
                    pb-5
                    text-[#F5F1EB]
                    text-[1.4rem]
                    outline-none
                    placeholder:text-white/20
                    transition-colors
                    duration-500
                    ${errors.email
                      ? "border-red-500/50 focus:border-red-500/70"
                      : "border-white/[0.08] focus:border-[#A68A64]/50"
                    }
                  `}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-2"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Message */}
              <div>

                <label className="block text-[11px] uppercase tracking-[0.25em] text-white/35 mb-5">
                  Message
                </label>

                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className={`
                    w-full
                    bg-transparent
                    border-b
                    pb-5
                    text-[#F5F1EB]
                    text-[1.4rem]
                    outline-none
                    resize-none
                    placeholder:text-white/20
                    transition-colors
                    duration-500
                    ${errors.message
                      ? "border-red-500/50 focus:border-red-500/70"
                      : "border-white/[0.08] focus:border-[#A68A64]/50"
                    }
                  `}
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-2"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                  group
                  mt-10
                  inline-flex
                  items-center
                  gap-6
                  border
                  border-white/[0.08]
                  px-10
                  py-5
                  text-[11px]
                  uppercase
                  tracking-[0.3em]
                  text-white/70
                  hover:text-white
                  hover:border-[#A68A64]/30
                  transition-all
                  duration-500
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >

                <span>{loading ? "Sending..." : "Send Message"}</span>

                <span className="transition-transform duration-500 group-hover:translate-x-2">
                  {loading ? "..." : "→"}
                </span>
              </button>
            </form>

            {/* Success Modal */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-[#0A0E0F] border border-[#A68A64]/30 rounded-2xl px-8 py-8 max-w-md text-center shadow-2xl pointer-events-auto"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="w-12 h-12 bg-[#A68A64]/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <svg
                      className="w-6 h-6 text-[#A68A64]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>

                  <h3 className="text-[#F5F1EB] text-2xl font-semibold mb-3">
                    Message Sent Successfully!
                  </h3>

                  <p className="text-white/50 text-sm leading-relaxed">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 3, duration: 2 }}
                    className="mt-6 h-1 bg-gradient-to-r from-transparent via-[#A68A64]/50 to-transparent origin-left"
                  />
                </motion.div>

                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10"
                  onClick={() => setSubmitted(false)}
                />
              </motion.div>
            )}
          </motion.div>
        </div>

      </div>
    </section>
  );
}