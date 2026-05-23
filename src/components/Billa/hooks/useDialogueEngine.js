import { useCallback } from "react";

/**
 * Dialogue Engine
 *
 * Manages dialogue selection, cooldowns, silence windows,
 * and contextual priority logic.
 */

// Comprehensive dialogue library
const DIALOGUES = {
    // Ambient - Rare, background observations
    ambient: [
        "He spent too long aligning this.",
        "He changes fonts when stressed.",
        "You skipped straight to the projects.",
        "He deleted the better version.",
        "This used to be more complicated.",
        "He removed half the animations. Unfortunately.",
        "Minimalism. Because decisions are hard.",
        "He wanted this to feel quieter.",
        "He moved this button six pixels yesterday.",
        "I watched him overthink this for hours.",
        "He calls this restraint. I call it indecision.",
        "He tested this animation more than the actual code.",
    ],

    // Fast Scrolling
    fastScroll: [
        "You're not reading any of this.",
        "Speedrunning the portfolio.",
        "He'll never know you didn't read it."
    ],

    // Repeated fast scrolling
    persistentScroll: [
        "You skipped the important part.",
        "That section was the point.",
        "Most people stop here. You accelerate.",
    ],

    // Project engagement
    projectHover: [
        "He's weirdly proud of this one.",
        "This took longer than he admits.",
        "One of the few things he didn't abandon halfway.",
        "You actually stopped scrolling.",
        "He rehearsed explaining this.",
        "This is probably his best work.",
    ],

    // Project revisit
    projectRevisit: [
        "Second look.",
        "Something caught.",
        "You came back to this.",
        "The details matter more on revisit.",
    ],

    // Idle state
    idle: [
        "Still here?",
        "At least pretend to read.",
        "You're thinking about something else.",
        "He wonders what you're doing right now.",
    ],

    // Contact section entry
    contactEnter: [
        "He rehearsed this section mentally.",
        "This is where doubt happens.",
        "Most people overthink the first message.",
        "This part makes him nervous too.",
        "Nobody knows how to start these messages.",
        "He spent longer designing this than necessary.",
        "You either type immediately or stare at the form.",
        "This is usually where people hesitate.",
    ],

    // Contact hesitation
    contactLinger: [
        "Still deciding whether to send it?",
        "Most people hesitate here.",
        "He overthought this form too.",
        "Second thoughts already?",
        "You can still leave.",
        "The pause before action.",
    ],

    // Project section entry
    projectSectionEntry: [
        "Here's where the work speaks.",
        "The projects. The evidence.",
        "What actually got built.",
        "This is what matters.",
        "The tangible part.",
        "Where intention becomes reality.",
    ],

    // Late night
    lateNight: [
        "Neither of you sleep properly.",
        "Late-night scrolling again?",
        "The insomnia demographic.",
        "4 AM decisions aren't great ones.",
        "At least the portfolio keeps you company.",
    ],

    // Billa hover
    hoverBilla: [
        "...what ?",
        "I'm not interactive.",
        "Personal space.",
        "Don't encourage this.",
        "You again.",
        "That seems unnecessary.",
        "Please stop hovering.",
        "This is exactly why he added me.",
        "You're making this weird.",
        "I was ignoring you intentionally.",
    ],

    // Silent reactions
    silent: ["..."],
};

const COOLDOWN_AMBIENT = 8000; // Ambient messages - balanced frequency
const COOLDOWN_CONTEXTUAL = 2500; // Contextual reactions faster
const SILENCE_WINDOW_AFTER_CONTEXTUAL = 12000; // Shorter silence, more presence

export const useDialogueEngine = ({
    lastMessageTime,
    silenceUntil,
    activeMessageType,
    setMessage,
    setIsVisible,
    messageHideTimeout,
}) => {
    const DEBUG = true;

    const debug = (...args) => {
        if (!DEBUG) return;
        console.log(
            "%c[BILLA DIALOGUE]",
            "color:#A68A64;font-weight:bold;",
            ...args
        );
    };

    /**
     * Get dialogue pool by category
     */
    const getDialogue = useCallback((category) => {
        return DIALOGUES[category] || [];
    }, []);

    /**
     * Select random item from array, avoiding duplicates
     */
    const selectFromPool = useCallback((array, recentlyUsed = []) => {
        if (array.length === 0) return null;

        const available = array.filter(
            (item) => !recentlyUsed.includes(item)
        );

        const pool = available.length > 0 ? available : array;
        return pool[Math.floor(Math.random() * pool.length)];
    }, []);

    /**
     * Main dialogue system
     */
    const speak = useCallback(
        (
            dialogueArray,
            {
                type = "ambient",
                priority = false,
                interrupt = false,
                source = "unknown",
            } = {}
        ) => {
            const now = Date.now();

            debug("DIALOGUE_ATTEMPT", {
                source,
                type,
                priority,
                dialogueCount: dialogueArray.length,
            });

            // ==================================================
            // SILENCE WINDOW CHECK
            // ==================================================

            if (type === "ambient" && now < silenceUntil.current) {
                debug("REJECTED → Silence window active");
                return false;
            }

            // ==================================================
            // COOLDOWN CHECK
            // ==================================================

            const timeSinceLastMessage = now - lastMessageTime.current;
            const requiredCooldown =
                type === "ambient" ? COOLDOWN_AMBIENT : COOLDOWN_CONTEXTUAL;

            if (!priority && timeSinceLastMessage < requiredCooldown) {
                debug("REJECTED → Cooldown active", {
                    elapsed: timeSinceLastMessage,
                    required: requiredCooldown,
                });
                return false;
            }

            // ==================================================
            // CONTEXTUAL DOMINANCE
            // ==================================================

            if (
                activeMessageType.current === "contextual" &&
                type === "ambient"
            ) {
                debug(
                    "REJECTED → Contextual message active, ambient blocked"
                );
                return false;
            }

            // ==================================================
            // SELECT DIALOGUE
            // ==================================================

            if (dialogueArray.length === 0) {
                debug("REJECTED → Empty dialogue array");
                return false;
            }

            const selected =
                dialogueArray[
                Math.floor(Math.random() * dialogueArray.length)
                ];

            debug("DIALOGUE_SELECTED", selected);

            // ==================================================
            // INTERRUPT HANDLING
            // ==================================================

            if (interrupt && messageHideTimeout.current) {
                clearTimeout(messageHideTimeout.current);
                debug("MESSAGE INTERRUPTED");
            }

            // ==================================================
            // SET STATE
            // ==================================================

            activeMessageType.current = type;
            lastMessageTime.current = now;

            // Silence ambient after contextual
            if (type === "contextual") {
                silenceUntil.current = now + SILENCE_WINDOW_AFTER_CONTEXTUAL;
                debug("AMBIENT_SILENCED_UNTIL", silenceUntil.current);
            }

            setMessage(selected);
            setIsVisible(true);

            // ==================================================
            // MESSAGE HIDE TIMEOUT
            // ==================================================

            messageHideTimeout.current = setTimeout(() => {
                setIsVisible(false);

                setTimeout(() => {
                    activeMessageType.current = null;
                    debug("MESSAGE_TYPE_RESET");
                }, 800);
            }, 5200);

            return true;
        },
        [
            lastMessageTime,
            silenceUntil,
            activeMessageType,
            setMessage,
            setIsVisible,
            messageHideTimeout,
        ]
    );

    return {
        speak,
        getDialogue,
        selectFromPool,
    };
};
