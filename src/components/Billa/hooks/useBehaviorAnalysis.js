import { useCallback } from "react";

/**
 * Behavior Analysis Engine
 *
 * Analyzes user interactions to understand:
 * - Scroll velocity and patterns
 * - Reading pace
 * - Attention duration
 * - Sectional engagement
 */

export const useBehaviorAnalysis = ({
  memory,
  currentSection,
}) => {
  const DEBUG = true;

  const debug = (...args) => {
    if (!DEBUG) return;
    console.log(
      "%c[BILLA BEHAVIOR]",
      "color:#8B7355;font-weight:bold;",
      ...args
    );
  };

  /**
   * Categorize scroll behavior
   */
  const categorizeScroll = useCallback(
    (burstDelta, instantDelta, section) => {
      let category = "unknown";

      if (burstDelta > 300) {
        category = "aggressive";
      } else if (burstDelta > 150) {
        category = "fast";
      } else if (burstDelta > 50) {
        category = "normal";
      } else {
        category = "slow";
      }

      memory.current.lastScrollVelocity = burstDelta;

      return {
        category,
        velocity: burstDelta,
        section,
      };
    },
    [memory]
  );

  /**
   * Detect reading pattern
   */
  const detectReadingPattern = useCallback(
    (timeOnSection, scrollCount, hoverCount) => {
      // Multiple hovers + slow scrolling = careful reading
      if (hoverCount > 2 && scrollCount < 3) {
        return "careful";
      }

      // Long time, minimal scrolling = deep reading
      if (timeOnSection > 25000 && scrollCount < 5) {
        return "deep";
      }

      // High scroll velocity + low time = skimming
      if (memory.current.lastScrollVelocity > 200 && timeOnSection < 10000) {
        return "skimming";
      }

      // Normal engagement
      return "normal";
    },
    [memory]
  );

  /**
   * Analyze emotional engagement
   */
  const analyzeEmotionalEngagement = useCallback(() => {
    const behavior = {
      sectionsVisited: memory.current.sectionsEntered.size,
      projectsHovered: memory.current.projectsHovered.size,
      projectsRevisited: memory.current.projectsRevisited.size,
      hasLingeered: memory.current.heroLingered,
      hasHesitated: memory.current.contactHesitated,
      readingPace: memory.current.userReadingPace,
    };

    debug("EMOTIONAL_PROFILE", behavior);

    // Determine engagement level
    if (
      behavior.projectsRevisited > 0 &&
      behavior.hasLingeered &&
      behavior.projectsHovered > 2
    ) {
      return "deeply-engaged";
    }

    if (behavior.projectsHovered > 3) {
      return "engaged";
    }

    if (behavior.readingPace === "fast") {
      return "skimming";
    }

    return "exploring";
  }, [memory]);

  /**
   * Predict next likely behavior
   */
  const predictNextBehavior = useCallback(() => {
    const currentPace = memory.current.userReadingPace;
    const fastScrollCount = memory.current.fastScrollTriggersCount;
    const isInImportantSection = ["work", "skills"].includes(
      currentSection.current
    );

    if (fastScrollCount > 2 && isInImportantSection) {
      return "likely-to-skip";
    }

    if (currentPace === "slow" || currentPace === "normal") {
      return "likely-to-read";
    }

    return "unpredictable";
  }, [memory, currentSection]);

  return {
    categorizeScroll,
    detectReadingPattern,
    analyzeEmotionalEngagement,
    predictNextBehavior,
  };
};
