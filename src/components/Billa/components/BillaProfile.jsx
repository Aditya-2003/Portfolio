import React from 'react'
import { motion, AnimatePresence } from "framer-motion";

const BillaProfile = ({ onClose }) => {
    return (
        <AnimatePresence>
            <>
                {/* BACKDROP */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="
          fixed
          inset-0
          bg-black/70
          backdrop-blur-md
          z-[9998]
        "
                />

                {/* MODAL */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                        scale: 0.96,
                        filter: "blur(16px)",
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                    }}
                    exit={{
                        opacity: 0,
                        y: 20,
                        scale: 0.96,
                        filter: "blur(16px)",
                    }}
                    transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
    fixed
    left-1/2
    top-1/2
    -translate-x-1/2
    -translate-y-1/2
    w-[94vw]
    rounded-[28px]
    border
    border-white/[0.06]
    bg-[#0A0A0A]/96
    backdrop-blur-2xl
    max-w-[820px]
    px-4
    py-4
    md:px-6
    md:py-5
    shadow-[0_0_100px_rgba(0,0,0,0.75)]
    z-[9999]
  "
                >

                    {/* TOP */}
                    <div className="flex items-start justify-between gap-3">

                        <div className="flex items-center gap-3">

                            <div className="relative shrink-0">

                                <img
                                    src="/billa.png"
                                    alt="Billa"
                                    className="
          w-14
          sm:w-16
          md:w-20
          opacity-90
        "
                                />

                            </div>

                            <div>

                                <p className="text-[8px] uppercase tracking-[0.28em] text-[#A68A64]/60 mb-1">
                                    ENTITY FILE
                                </p>

                                <h2 className="text-xl sm:text-2xl md:text-3xl text-white/90 leading-none">
                                    BILLA
                                </h2>

                                <p className="text-[11px] sm:text-xs text-white/35 mt-1">
                                    emotionally unavailable creature
                                </p>

                            </div>

                        </div>

                        <button
                            onClick={onClose}
                            className="
                                      text-white/30
                                      hover:text-white/80
                                      text-[9px]
                                      uppercase
                                      tracking-[0.2em]
                                      transition-colors
    "
                        >
                            close
                        </button>

                    </div>


                    {/* DIVIDER */}
                    <div className="w-full h-px bg-white/[0.06] my-5 md:my-6" />


                    {/* CONTENT */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5">

                        {/* COLUMN 1 */}
                        <div className="space-y-6 md:space-y-8">

                            <div>
                                <p className="text-[10px] uppercase tracking-[0.28em] text-[#A68A64]/60 mb-2">
                                    Species
                                </p>

                                <p className="text-[13px] md:text-[13px] md:text-sm text-white/75 leading-relaxed">
                                    Cat.
                                    Probably.
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] uppercase tracking-[0.28em] text-[#A68A64]/60 mb-2">
                                    Occupation
                                </p>

                                <p className="text-[13px] md:text-sm text-white/75 leading-relaxed">
                                    Senior Director of <br /> unnecessary commentary.
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] uppercase tracking-[0.28em] text-[#A68A64]/60 mb-2">
                                    Status
                                </p>

                                <p className="text-[13px] md:text-sm text-white/75 leading-relaxed">
                                    Forced to live <br/> inside this portfolio.
                                </p>
                            </div>

                        </div>


                        {/* COLUMN 2 */}
                        <div className="space-y-8">

                            <div>
                                <p className="text-[10px] uppercase tracking-[0.28em] text-[#A68A64]/60 mb-2">
                                    Strengths
                                </p>

                                <ul className="space-y-1 text-[13px] md:text-sm text-white/75">
                                    <li>Judging silently</li>
                                    <li>Keyboard sabotage</li>
                                    <li>Emotional damage</li>
                                    <li>Sleeping professionally</li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-[10px] uppercase tracking-[0.28em] text-[#A68A64]/60 mb-2">
                                    Weaknesses
                                </p>

                                <ul className="space-y-1 text-[13px] md:text-sm text-white/75">
                                    <li>Accountability</li>
                                    <li>Eye contact</li>
                                    <li>Vacuum cleaners</li>
                                    <li>Low battery warnings</li>
                                </ul>
                            </div>

                        </div>


                        {/* COLUMN 3 */}
                        <div className="space-y-10">

                            <div className="hidden md:block">
                                <p className="text-[10px] uppercase tracking-[0.28em] text-[#A68A64]/60 mb-2">
                                    Criminal History
                                </p>

                                <p className=" w-auto text-[13px] md:text-sm text-white/75 leading-relaxed">
                                    Deleted production database once.
                                    Claimed it was “minimalism”.
                                </p>
                            </div>

                            <div className="hidden md:block">
                                <p className=" text-[10px] uppercase tracking-[0.28em] text-[#A68A64]/60 mb-2">
                                    Adoption Notice
                                </p>

                                <p className="text-[13px] md:text-sm text-white/75 leading-relaxed">
                                    Currently accepting adoption offers in exchange for:
                                    stable WiFi,
                                    expensive snacks,
                                    and zero expectations.
                                </p>
                            </div>

                        </div>

                    </div>
                </motion.div>
            </>
        </AnimatePresence>
    )
}

export default BillaProfile