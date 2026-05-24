import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { useDialogueEngine } from "./hooks/useDialogueEngine";
import { useBehaviorAnalysis } from "./hooks/useBehaviorAnalysis";
import { useBillaDebugger } from "./hooks/useBillaDebugger";
import BillaCharacter from "./components/BillaCharacter";
import BillaSpeechBubble from "./components/BillaSpeechBubble";
import BillaProfile from "./components/BillaProfile";
/**
 * BILLA - A passive observer, cynical side-character
 *
 * Not an assistant, chatbot, mascot, or productivity gimmick.
 * A reactive environmental presence that reinforces atmosphere.
 *
 * Core values:
 * - Silence is more important than speech
 * - Timing matters more than frequency
 * - Restraint over entertainment
 * - Observation over participation
 */

const Billa = () => {
  // ======================================================
  // STATE
  // ======================================================

  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showBilla, setShowBilla] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // ======================================================
  // REFS - Behavioral State
  // ======================================================

  const messageHideTimeout = useRef(null);
  const lastMessageTime = useRef(0);
  const silenceUntil = useRef(0);
  const activeMessageType = useRef(null);
  const activityTimeout = useRef(null);
  const currentSection = useRef("hero");

  // ======================================================
  // REFS - Scroll Analysis
  // ======================================================

  const lastScrollY = useRef(0);
  const scrollBurstDelta = useRef(0);
  const scrollBurstTimeout = useRef(null);
  const scrollCooldown = useRef(false);

  // ======================================================
  // REFS - Interaction Memory
  // ======================================================

  const memory = useRef({
    projectsHovered: new Set(),
    projectsRevisited: new Set(),
    sectionsEntered: new Set(),
    fastScrollTriggersCount: 0,
    idleEventCount: 0,
    heroLingered: false,
    contactEntered: false,
    contactHesitated: false,
    billaHovered: false,
    lastScrollVelocity: 0,
    userReadingPace: "unknown", // 'fast', 'normal', 'slow'
    timeOnCurrentSection: 0,
  });

  // ======================================================
  // HOOKS
  // ======================================================

  const {
    speak,
    getDialogue,
    selectFromPool,
  } = useDialogueEngine({
    lastMessageTime,
    silenceUntil,
    activeMessageType,
    setMessage,
    setIsVisible,
    messageHideTimeout,
  });

  const {
    analyzeBehavior,
    categorizeScroll,
    detectReadingPattern,
  } = useBehaviorAnalysis({
    memory,
    currentSection,
  });

  const { debug } = useBillaDebugger();

  // ======================================================
  // EVENT: Mark User as Active
  // ======================================================

  const markUserActive = useCallback(() => {
    clearTimeout(activityTimeout.current);

    activityTimeout.current = setTimeout(() => {
      debug("USER_BECAME_INACTIVE");
    }, 6000);
  }, [debug]);

  // ======================================================
  // EFFECT: Appear After Scroll
  // ======================================================

  useEffect(() => {
    const handleScroll = () => {
      markUserActive();
      const triggerPoint = window.innerHeight * 0.35;
      setShowBilla(window.scrollY > triggerPoint);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [markUserActive]);

  // ======================================================
  // EFFECT: Section Tracking
  // ======================================================

  useEffect(() => {
    const sections = [
      "home",
      "work",
      "skills",
      "contact",
    ];

    const observers = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const wasNewSection = currentSection.current !== id;
            currentSection.current = id;

            if (wasNewSection) {
              memory.current.sectionsEntered.add(id);
              memory.current.timeOnCurrentSection = 0;
              debug("SECTION_CHANGED", { to: id });
            }
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [debug]);

  // ======================================================
  // EFFECT: Ambient Thoughts (Rare & Contextual)
  // ======================================================

  useEffect(() => {
    const ambientInterval = setInterval(() => {
      const now = Date.now();

      // Only attempt ambient dialogue during silence windows
      if (now < silenceUntil.current) return;

      // Higher rejection rate - more selective
      if (Math.random() > 0.75) return;

      const ambientPool = getDialogue("ambient");
      if (ambientPool.length === 0) return;

      speak(ambientPool, {
        type: "ambient",
        priority: false,
        source: "ambient-loop",
      });
    }, 24000); // Less frequent ambient thoughts

    return () => clearInterval(ambientInterval);
  }, [speak, getDialogue]);

  // ======================================================
  // EFFECT: Scroll Analysis & Fast Scroll Detection
  // ======================================================

  useEffect(() => {
    const handleScroll = () => {
      markUserActive();

      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY.current);

      scrollBurstDelta.current += delta;

      // Debounce burst detection
      clearTimeout(scrollBurstTimeout.current);
      scrollBurstTimeout.current = setTimeout(() => {
        scrollBurstDelta.current = 0;
      }, 400);

      // Categorize scroll behavior
      const scrollCategory = categorizeScroll(
        scrollBurstDelta.current,
        delta,
        currentSection.current
      );

      // Update reading pace
      if (scrollBurstDelta.current > 300) {
        memory.current.userReadingPace = "fast";
      } else if (scrollBurstDelta.current < 50) {
        memory.current.userReadingPace = "slow";
      } else {
        memory.current.userReadingPace = "normal";
      }

      // ==========================================
      // Fast Scroll in Important Sections
      // ==========================================

      const projectSections = ["work"];
      const isProjectSection = projectSections.includes(
        currentSection.current
      );

      if (
        scrollBurstDelta.current > 240 &&
        isProjectSection &&
        !scrollCooldown.current
      ) {
        scrollCooldown.current = true;
        memory.current.fastScrollTriggersCount += 1;

        debug("FAST_SCROLL_DETECTED", {
          count: memory.current.fastScrollTriggersCount,
          section: currentSection.current,
          velocity: scrollBurstDelta.current,
        });

        // Escalate if repeated behavior
        const dialogueKey =
          memory.current.fastScrollTriggersCount >= 2
            ? "persistentScroll"
            : "fastScroll";

        speak(getDialogue(dialogueKey), {
          type: "contextual",
          priority: true,
          interrupt: true,
          source: "fast-scroll",
        });

        scrollBurstDelta.current = 0;

        setTimeout(() => {
          scrollCooldown.current = false;
        }, 8000);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categorizeScroll, speak, getDialogue, markUserActive, debug]);

  // ======================================================
  // EFFECT: Idle Detection (Thoughtful Pause)
  // ======================================================

  useEffect(() => {
    let idleTimer;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      markUserActive();

      idleTimer = setTimeout(() => {
        memory.current.idleEventCount += 1;

        debug("IDLE_DETECTED", {
          count: memory.current.idleEventCount,
          section: currentSection.current,
        });

        // Fatigue system: longer idle = less likely to trigger
        const baseProbability = 0.80;
        const fatigueReduction =
          memory.current.idleEventCount * 0.06;
        const finalProbability = Math.max(
          0.25,
          baseProbability - fatigueReduction
        );

        if (Math.random() > finalProbability) {
          debug("IDLE_REJECTED_BY_PROBABILITY");
          return;
        }

        speak(getDialogue("idle"), {
          type: "contextual",
          priority: false,
          source: "idle-detection",
        });
      }, 12000); // Idle threshold - faster detection
    };

    ["mousemove", "scroll", "keydown", "click"].forEach((event) => {
      window.addEventListener(event, resetIdleTimer);
    });

    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      ["mousemove", "scroll", "keydown", "click"].forEach((event) => {
        window.removeEventListener(event, resetIdleTimer);
      });
    };
  }, [speak, getDialogue, markUserActive, debug]);

  // ======================================================
  // EFFECT: Project Hover Events
  // ======================================================

  useEffect(() => {
    const projectCards = document.querySelectorAll(
      ".project-card, [data-billa-project]"
    );

    let lastHoverTime = 0;
    const hoverCooldown = 2000; // Don't respond to every single hover

    const handleProjectHover = (index) => {
      markUserActive();

      const now = Date.now();
      if (now - lastHoverTime < hoverCooldown) {
        debug("PROJECT_HOVER (cooldown)", { index });
        return;
      }

      const wasRevisited = memory.current.projectsRevisited.has(
        index
      );
      const wasHoveredBefore = memory.current.projectsHovered.has(
        index
      );

      debug("PROJECT_HOVER", {
        index,
        revisited: wasRevisited,
      });

      if (wasRevisited) {
        // Only 50% chance to respond to revisit
        if (Math.random() > 0.5) {
          return;
        }

        speak(getDialogue("projectRevisit"), {
          type: "contextual",
          priority: true,
          interrupt: true,
          source: "project-revisit",
        });
        lastHoverTime = now;
      } else if (wasHoveredBefore) {
        memory.current.projectsRevisited.add(index);
      } else {
        // Only 70% chance to respond to first hover
        if (Math.random() > 0.7) {
          memory.current.projectsHovered.add(index);
          return;
        }

        memory.current.projectsHovered.add(index);

        speak(getDialogue("projectHover"), {
          type: "contextual",
          priority: true,
          interrupt: true,
          source: "project-hover",
        });
        lastHoverTime = now;
      }
    };

    const handlers = new Map();

    projectCards.forEach((card, index) => {
      const handler = () => handleProjectHover(index);
      handlers.set(card, handler);
      card.addEventListener("mouseenter", handler);
    });

    return () => {
      projectCards.forEach((card) => {
        const handler = handlers.get(card);
        if (handler) {
          card.removeEventListener("mouseenter", handler);
        }
      });
    };
  }, [speak, getDialogue, markUserActive, debug]);

  // ======================================================
  // EFFECT: Contact Section Detection
  // ======================================================

  useEffect(() => {
    const contactElement = document.getElementById("contact");
    if (!contactElement) {
      debug("CONTACT_ELEMENT_NOT_FOUND");
      return;
    }

    let hasEntered = false;
    let lingerTimeout = null;
    let contactEnteredTime = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // ==========================================
        // Enter Contact Section
        // ==========================================

        if (entry.isIntersecting && !hasEntered) {
          hasEntered = true;
          contactEnteredTime = Date.now();
          memory.current.contactEntered = true;

          debug("CONTACT_SECTION_ENTERED", {
            ratio: entry.intersectionRatio,
          });

          speak(getDialogue("contactEnter"), {
            type: "contextual",
            priority: true,
            interrupt: true,
            source: "contact-enter",
          });

          // ==========================================
          // Contact Hesitation
          // ==========================================

          lingerTimeout = setTimeout(() => {
            if (hasEntered) {
              memory.current.contactHesitated = true;

              debug("CONTACT_HESITATION_DETECTED");

              speak(getDialogue("contactLinger"), {
                type: "contextual",
                priority: true,
                source: "contact-linger",
              });
            }
          }, 6000);
        }

        // ==========================================
        // Exit Contact Section
        // ==========================================

        if (!entry.isIntersecting && hasEntered) {
          hasEntered = false;
          clearTimeout(lingerTimeout);

          debug("CONTACT_SECTION_EXITED");
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(contactElement);

    return () => {
      clearTimeout(lingerTimeout);
      observer.disconnect();
    };
  }, [speak, getDialogue, debug]);

  // ======================================================
  // EFFECT: Project Section Entry
  // ======================================================

  useEffect(() => {
    const projectElement = document.getElementById("work");
    if (!projectElement) return;

    let hasEntered = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEntered) {
          hasEntered = true;
          memory.current.sectionsEntered.add("work");

          debug("PROJECT_SECTION_ENTERED");

          speak(getDialogue("projectSectionEntry"), {
            type: "contextual",
            priority: true,
            source: "project-section-enter",
          });
        }

        if (!entry.isIntersecting) {
          hasEntered = false;
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(projectElement);

    return () => observer.disconnect();
  }, [speak, getDialogue, debug]);

  // ======================================================
  // EFFECT: Late Night Awareness
  // ======================================================

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 1 && hour <= 4) {
      const lateNightTimer = setTimeout(() => {
        debug("LATE_NIGHT_MODE_ACTIVATED");

        speak(getDialogue("lateNight"), {
          type: "contextual",
          priority: true,
          source: "late-night",
        });
      }, 8000);

      return () => clearTimeout(lateNightTimer);
    }
  }, [speak, getDialogue, debug]);

  // ======================================================
  // EVENT: Billa Hover Interaction
  // ======================================================

  const handleBillaHover = useCallback(() => {
    markUserActive();

    if (memory.current.billaHovered) {
      // Already hovered, 40% chance to respond again
      if (Math.random() > 0.4) {
        return;
      }

      speak(getDialogue("hoverBilla"), {
        type: "contextual",
        priority: true,
        source: "hover-billa-repeat",
      });
    } else {
      // First hover - 70% chance to respond
      if (Math.random() > 0.7) {
        memory.current.billaHovered = true;
        return;
      }

      memory.current.billaHovered = true;

      speak(getDialogue("hoverBilla"), {
        type: "contextual",
        priority: true,
        source: "hover-billa",
      });
    }

    debug("BILLA_HOVERED");
  }, [speak, getDialogue, markUserActive, debug]);

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <AnimatePresence>
      {showBilla && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed bottom-4 right-4 z-[999] pointer-events-none"
        >
          {/* Speech Bubble */}
          <AnimatePresence mode="wait">
            {isVisible && !showProfile && (
              <BillaSpeechBubble message={message} />
            )}
          </AnimatePresence>

          {/* Character */}
          <div
            className="pointer-events-auto"
            onMouseEnter={handleBillaHover}
          >
            <BillaCharacter onClick={() => setShowProfile(true)} />
          </div>
        </motion.div>
      )}

      {/* Profile Modal */}
      {showProfile && <BillaProfile onClose={() => setShowProfile(false)} />}
    </AnimatePresence>
  );
};

export default Billa;
