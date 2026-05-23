import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ======================================================
// DIALOGUES
// ======================================================

const dialogues = {
  random: [
    "Another animation. Groundbreaking.",
    "He spent an unreasonable amount of time adjusting spacing.",
    "Minimalism. Because making decisions is hard.",
    "This portfolio has more motion than his sleep schedule.",
    "Surprisingly, the projects are real.",
  ],

  reflective: [
    "Most portfolios say too much.",
    "Silence is harder to design.",
    "Interfaces reveal priorities.",
    "Some people scroll differently.",
  ],

  quiet: [
    "The pacing here is intentional.",
    "Some sections are quieter for a reason.",
    "He notices details most people skip.",
  ],

  idle: [
    "Still here?",
    "At least pretend to read.",
    "You scroll like you're decoding ancient scripture.",
  ],

  fastScroll: [
    "You’re not reading any of this.",
    "Speedrunning the portfolio?",
    "That scroll speed is concerning.",
  ],

  skippedProjects: [
    "That was the important section.",
    "You skipped the hard work.",
  ],

  project: [
    "He’s weirdly proud of this one.",
    "This took longer than he admits.",
    "One of the few things he didn’t abandon halfway.",
    "You actually stopped scrolling.",
  ],

  revisitProject: [
    "You came back to this one.",
    "Second look?",
  ],

  contact: [
    "Now comes the professional part.",
    "Go on. Send the dramatic startup idea.",
    "He rehearsed this section mentally.",
  ],

  contactLinger: [
    "Still deciding whether to type?",
    "Most people hesitate here.",
    "He overthought this form too.",
  ],

  hero: [
    "That intro took longer than expected.",
    "He rewrote that headline too many times.",
  ],

  hoverBilla: [
    "...what?",
    "You noticed me.",
    "Don’t encourage this.",
  ],

  silentReaction: ["..."],

  lateNight: [
    "Neither of you sleep properly.",
    "Late-night scrolling again.",
  ],
};

// ======================================================
// CONFIG
// ======================================================

const DEBUG = true;

const MESSAGE_DURATION = 5000;

// ======================================================
// DEBUG LOGGER
// ======================================================

const debug = (...args) => {
  if (!DEBUG) return;

  console.log(
    "%c[BILLA DEBUG]",
    "color:#A68A64;font-weight:bold;",
    ...args
  );
};

// ======================================================
// COMPONENT
// ======================================================

const Billa = () => {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [showBilla, setShowBilla] = useState(false);

  // ======================================================
  // REFS
  // ======================================================

  const hideTimeout = useRef(null);

  const recentMessages = useRef([]);

  const activeType = useRef(null);

  const lastMessageTime = useRef(0);

  const silenceUntil = useRef(0);

  const userActive = useRef(false);

  const activityTimeout = useRef(null);

  const currentSection = useRef("hero");

  // smooth scroll burst detection
  const accumulatedDelta = useRef(0);

  const burstTimeout = useRef(null);

  // ======================================================
  // MEMORY
  // ======================================================

  const memory = useRef({
    hoveredProjects: 0,
    revisitedProject: false,
    fastScrollCount: 0,
    idleCount: 0,
    visitedContact: 0,
    lingeredHero: false,
  });

  // ======================================================
  // USER ACTIVITY
  // ======================================================

  const markUserActive = () => {
    userActive.current = true;

    clearTimeout(activityTimeout.current);

    activityTimeout.current = setTimeout(() => {
      userActive.current = false;

      debug("USER INACTIVE");
    }, 4000);
  };

  // ======================================================
  // SPEAK ENGINE
  // ======================================================

  const speak = (
    lines,
    {
      priority = false,
      type = "ambient",
      interrupt = false,
      source = "unknown",
    } = {}
  ) => {
    const now = Date.now();

    debug("ATTEMPT", {
      source,
      type,
      priority,
      interrupt,
    });

    // ==================================================
    // SILENCE WINDOW
    // ==================================================

    if (
      type === "ambient" &&
      now < silenceUntil.current
    ) {
      debug(
        "REJECTED → ambient silence active"
      );

      return;
    }

    // ==================================================
    // COOLDOWN
    // ==================================================

    const cooldown =
      type === "ambient" ? 14000 : 3500;

    if (
      !priority &&
      now - lastMessageTime.current < cooldown
    ) {
      debug(
        "REJECTED → cooldown active"
      );

      return;
    }

    // ==================================================
    // CONTEXTUAL DOMINANCE
    // ==================================================

    if (
      activeType.current === "contextual" &&
      type === "ambient"
    ) {
      debug(
        "REJECTED → contextual active"
      );

      return;
    }

    // ==================================================
    // DUPLICATE FILTER
    // ==================================================

    const filtered = lines.filter(
      (line) =>
        !recentMessages.current.includes(line)
    );

    const available =
      filtered.length > 0 ? filtered : lines;

    const selected =
      available[
        Math.floor(Math.random() * available.length)
      ];

    debug("SELECTED", selected);

    // ==================================================
    // INTERRUPT
    // ==================================================

    if (interrupt) {
      clearTimeout(hideTimeout.current);

      debug("INTERRUPTING");
    }

    // ==================================================
    // CONTEXTUAL SILENCE
    // ==================================================

    if (type === "contextual") {
      silenceUntil.current =
        Date.now() + 25000;

      debug(
        "AMBIENT SILENCED UNTIL",
        silenceUntil.current
      );
    }

    // ==================================================
    // MEMORY BUFFER
    // ==================================================

    recentMessages.current.push(selected);

    if (recentMessages.current.length > 7) {
      recentMessages.current.shift();
    }

    // ==================================================
    // STATE
    // ==================================================

    activeType.current =
      type === "ambient"
        ? "ambient"
        : "contextual";

    lastMessageTime.current = now;

    setMessage(selected);

    setVisible(true);

    console.log(
      "%cBILLA SAYS:",
      "color:#A68A64;font-weight:bold;",
      selected
    );

    hideTimeout.current = setTimeout(() => {
      setVisible(false);

      debug("MESSAGE ENDED");

      setTimeout(() => {
        activeType.current = null;

        debug("ACTIVE TYPE RESET");
      }, 1000);
    }, MESSAGE_DURATION);
  };

  // ======================================================
  // APPEAR AFTER SCROLL
  // ======================================================

  useEffect(() => {
    const handleScroll = () => {
      markUserActive();

      const triggerPoint =
        window.innerHeight * 0.3;

      setShowBilla(
        window.scrollY > triggerPoint
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  // ======================================================
  // SECTION TRACKING
  // ======================================================

  useEffect(() => {
    const sections = [
      "hero",
      "projects",
      "philosophy",
      "contact",
    ];

    const observers = [];

    sections.forEach((id) => {
      const el =
        document.getElementById(id);

      if (!el) {
        debug("SECTION NOT FOUND", id);

        return;
      }

      const observer =
        new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              currentSection.current = id;

              debug(
                "SECTION ACTIVE",
                id
              );
            }
          },
          {
            threshold: 0.4,
          }
        );

      observer.observe(el);

      observers.push(observer);
    });

    return () => {
      observers.forEach((o) =>
        o.disconnect()
      );
    };
  }, []);

  // ======================================================
  // AMBIENT THOUGHTS
  // ======================================================

  useEffect(() => {
    const interval = setInterval(() => {
      debug("AMBIENT CHECK");

      if (userActive.current) {
        debug(
          "REJECTED → user active"
        );

        return;
      }

      const chance = Math.random();

      debug("AMBIENT CHANCE", chance);

      if (chance < 0.93) {
        debug(
          "REJECTED → random chance failed"
        );

        return;
      }

      const pool = [
        ...dialogues.random,
        ...dialogues.reflective,
        ...dialogues.quiet,
      ];

      speak(pool, {
        type: "ambient",
        source: "ambient-loop",
      });
    }, 28000);

    return () => clearInterval(interval);
  }, []);

  // ======================================================
  // FAST SCROLL DETECTION
  // ======================================================

  useEffect(() => {
    let lastScrollY = window.scrollY;

    let cooldown = false;

    const detectFastScroll = () => {
      markUserActive();

      const currentScrollY =
        window.scrollY;

      const deltaY = Math.abs(
        currentScrollY - lastScrollY
      );

      accumulatedDelta.current += deltaY;

      clearTimeout(burstTimeout.current);

      burstTimeout.current = setTimeout(() => {
        accumulatedDelta.current = 0;
      }, 300);

      // only meaningful logs
      if (
        accumulatedDelta.current > 120
      ) {
        debug("SCROLL BURST", {
          accumulated:
            accumulatedDelta.current,
          section:
            currentSection.current,
          cooldown,
        });
      }

      const validSections = [
        "projects",
        "philosophy",
      ];

      const insideImportantSection =
        validSections.includes(
          currentSection.current
        );

      // ==========================================
      // FAST SCROLL TRIGGER
      // ==========================================

      if (
        accumulatedDelta.current > 220 &&
        insideImportantSection &&
        !cooldown
      ) {
        cooldown = true;

        memory.current.fastScrollCount += 1;

        debug(
          "FAST SCROLL TRIGGERED",
          memory.current.fastScrollCount
        );

        if (
          memory.current.fastScrollCount >= 4
        ) {
          speak(dialogues.skippedProjects, {
            priority: true,
            type: "contextual",
            interrupt: true,
            source: "skipped-projects",
          });
        } else {
          speak(dialogues.fastScroll, {
            priority: true,
            type: "contextual",
            interrupt: true,
            source: "fast-scroll",
          });
        }

        accumulatedDelta.current = 0;

        setTimeout(() => {
          cooldown = false;

          debug(
            "FAST SCROLL COOLDOWN RESET"
          );
        }, 12000);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener(
      "scroll",
      detectFastScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        detectFastScroll
      );
  }, []);

  // ======================================================
  // IDLE DETECTION
  // ======================================================

  useEffect(() => {
    let idleTimer;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);

      markUserActive();

      idleTimer = setTimeout(() => {
        memory.current.idleCount += 1;

        debug(
          "IDLE COUNT",
          memory.current.idleCount
        );

        // fatigue system
        const idleChance = Math.max(
          0.15,
          0.75 -
            memory.current.idleCount *
            0.12
        );

        const roll = Math.random();

        debug("IDLE ROLL", {
          idleChance,
          roll,
        });

        if (roll > idleChance) {
          debug(
            "REJECTED → idle probability failed"
          );

          return;
        }

        speak(dialogues.idle, {
          type: "contextual",
          source: "idle",
        });
      }, 18000);
    };

    window.addEventListener(
      "mousemove",
      resetIdleTimer
    );

    window.addEventListener(
      "scroll",
      resetIdleTimer
    );

    window.addEventListener(
      "keydown",
      resetIdleTimer
    );

    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);

      window.removeEventListener(
        "mousemove",
        resetIdleTimer
      );

      window.removeEventListener(
        "scroll",
        resetIdleTimer
      );

      window.removeEventListener(
        "keydown",
        resetIdleTimer
      );
    };
  }, []);

  // ======================================================
  // PROJECT HOVER
  // ======================================================

  useEffect(() => {
    const cards =
      document.querySelectorAll(".project-card");

    const hoveredSet = new Set();

    const handleHover = (index) => {
      markUserActive();

      const revisited =
        hoveredSet.has(index);

      debug("PROJECT HOVER", {
        index,
        revisited,
      });

      if (revisited) {
        memory.current.revisitedProject =
          true;

        speak(dialogues.revisitProject, {
          priority: true,
          type: "contextual",
          interrupt: true,
          source: "revisit-project",
        });
      } else {
        hoveredSet.add(index);

        memory.current.hoveredProjects += 1;

        speak(dialogues.project, {
          priority: true,
          type: "contextual",
          interrupt: true,
          source: "project-hover",
        });
      }
    };

    cards.forEach((card, index) => {
      const handler = () =>
        handleHover(index);

      card.addEventListener(
        "mouseenter",
        handler
      );

      card.__billaHandler = handler;
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener(
          "mouseenter",
          card.__billaHandler
        );
      });
    };
  }, []);

  // ======================================================
  // CONTACT DETECTION
  // ======================================================

  useEffect(() => {
    const contact =
      document.getElementById("contact");

    if (!contact) {
      debug("CONTACT NOT FOUND");

      return;
    }

    let entered = false;

    let lingerTimer = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        debug("CONTACT OBSERVER", {
          isIntersecting:
            entry.isIntersecting,
          ratio:
            entry.intersectionRatio,
        });

        // ==========================================
        // ENTER CONTACT
        // ==========================================

        if (
          entry.isIntersecting &&
          !entered
        ) {
          entered = true;

          memory.current.visitedContact += 1;

          debug(
            "CONTACT ENTER",
            memory.current.visitedContact
          );

          speak(dialogues.contact, {
            priority: true,
            type: "contextual",
            interrupt: true,
            source: "contact-enter",
          });

          // ==========================================
          // LINGER
          // ==========================================

          lingerTimer = setTimeout(() => {
            debug("CONTACT LINGER");

            speak(
              dialogues.contactLinger,
              {
                priority: true,
                type: "contextual",
                source:
                  "contact-linger",
              }
            );
          }, 12000);
        }

        // ==========================================
        // EXIT
        // ==========================================

        if (!entry.isIntersecting) {
          entered = false;

          clearTimeout(lingerTimer);

          debug("CONTACT EXIT");
        }
      },
      {
        threshold: 0.55,
      }
    );

    observer.observe(contact);

    return () => {
      clearTimeout(lingerTimer);

      observer.disconnect();
    };
  }, []);

  // ======================================================
  // HERO LINGER
  // ======================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.scrollY < 200) {
        memory.current.lingeredHero = true;

        debug("HERO LINGER");

        speak(dialogues.hero, {
          priority: true,
          type: "contextual",
          source: "hero-linger",
        });
      }
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  // ======================================================
  // LATE NIGHT
  // ======================================================

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 1 && hour <= 4) {
      debug("LATE NIGHT MODE");

      setTimeout(() => {
        speak(dialogues.lateNight, {
          priority: true,
          type: "contextual",
          source: "late-night",
        });
      }, 9000);
    }
  }, []);

  // ======================================================
  // COMPONENT
  // ======================================================

  return (
    <AnimatePresence>
      {showBilla && (
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 8,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed bottom-3 right-3 z-[999]"
        >
          {/* SPEECH */}
          <AnimatePresence mode="wait">
            {visible && (
              <motion.div
                key={message}
                initial={{
                  opacity: 0,
                  y: 4,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 4,
                }}
                transition={{
                  duration: 0.45,
                }}
                className="
                  absolute
                  bottom-30
                  md:bottom-35
                  right-5
                  w-[260px]
                  rounded-[24px]
                  border
                  border-white/[0.05]
                  bg-black/70
                  backdrop-blur-md
                  px-5
                  py-4
                  shadow-[0_10px_40px_rgba(0,0,0,0.45)]
                "
              >
                <p
                  className="
                    mb-2
                    text-[10px]
                    uppercase
                    tracking-[0.24em]
                    text-[#A68A64]/70
                  "
                >
                  BILLA
                </p>

                <div
                  className="
                    absolute
                    bottom-[-8px]
                    right-8
                    w-4
                    h-4
                    rotate-45
                    bg-black/70
                    z-10
                    border-r
                    border-b
                    border-white/[0.06]
                  "
                />

                <p
                  className="
                    text-[13px]
                    leading-relaxed
                    text-white/72
                  "
                >
                  {message}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CHARACTER */}
          <motion.div
            onMouseEnter={() => {
              markUserActive();

              debug("BILLA HOVER");

              if (Math.random() > 0.6) {
                speak(dialogues.hoverBilla, {
                  priority: true,
                  type: "contextual",
                  source: "hover-billa",
                });
              }
            }}
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative cursor-default"
          >
            {/* glow */}
            <div
              className="
                absolute
                inset-0
                rounded-full
                blur-3xl
                opacity-20
                bg-white
              "
            />

            <motion.img
              whileHover={{
                scale: 1.06,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 14,
              }}
              src="/billa.png"
              alt="Billa"
              className="
                relative
                w-25
                md:w-30
                select-none
                opacity-90
                drop-shadow-[0_0_1px_rgba(255,255,255,0.002)]
              "
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Billa;