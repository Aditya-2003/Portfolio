import { useCallback } from "react";

/**
 * Billa Debugger
 *
 * Development tool for understanding system decisions.
 * Explains WHY dialogue is accepted/rejected.
 * Provides visibility into behavioral state.
 */

export const useBillaDebugger = () => {
  const DEBUG = true;

  // Colors for different message types
  const colors = {
    action: "color:#A68A64;font-weight:bold;",
    event: "color:#8B7355;font-weight:bold;",
    rejection: "color:#D97706;font-weight:bold;",
    success: "color:#10B981;font-weight:bold;",
    info: "color:#6366F1;font-weight:bold;",
  };

  const debug = useCallback(
    (messageType, data = null) => {
      if (!DEBUG) return;

      const timestamp = new Date().toLocaleTimeString();
      const prefix = `[${timestamp}]`;

      // Format based on message type
      switch (messageType) {
        case "USER_BECAME_INACTIVE":
          console.log(
            `%c${prefix} USER INACTIVE`,
            colors.event
          );
          break;

        case "SECTION_CHANGED":
          console.log(
            `%c${prefix} SECTION: ${data?.to?.toUpperCase()}`,
            colors.action,
            data
          );
          break;

        case "FAST_SCROLL_DETECTED":
          console.log(
            `%c${prefix} FAST SCROLL #${data?.count}`,
            colors.action,
            `(${data?.velocity}px)`
          );
          break;

        case "IDLE_DETECTED":
          console.log(
            `%c${prefix} IDLE #${data?.count}`,
            colors.event,
            `@${data?.section}`
          );
          break;

        case "IDLE_REJECTED_BY_PROBABILITY":
          console.log(
            `%c${prefix} IDLE REJECTED`,
            colors.rejection,
            "probability failed"
          );
          break;

        case "PROJECT_HOVER":
          console.log(
            `%c${prefix} PROJECT HOVER #${data?.index}`,
            colors.action,
            data?.revisited ? "(revisited)" : "(new)"
          );
          break;

        case "CONTACT_SECTION_ENTERED":
          console.log(
            `%c${prefix} CONTACT ENTERED`,
            colors.action
          );
          break;

        case "CONTACT_HESITATION_DETECTED":
          console.log(
            `%c${prefix} CONTACT HESITATION`,
            colors.action
          );
          break;

        case "CONTACT_SECTION_EXITED":
          console.log(
            `%c${prefix} CONTACT EXITED`,
            colors.event
          );
          break;

        case "HERO_SECTION_LINGERED":
          console.log(
            `%c${prefix} HERO LINGERED`,
            colors.action
          );
          break;

        case "LATE_NIGHT_MODE_ACTIVATED":
          console.log(
            `%c${prefix} LATE NIGHT MODE`,
            colors.action
          );
          break;

        case "BILLA_HOVERED":
          console.log(
            `%c${prefix} BILLA HOVERED`,
            colors.action
          );
          break;

        default:
          console.log(
            `%c${prefix} ${messageType}`,
            colors.info,
            data
          );
      }
    },
    []
  );

  /**
   * Log dialogue decision
   */
  const debugDialogue = useCallback(
    (decision, reason, data) => {
      if (!DEBUG) return;

      const icon =
        decision === "ACCEPTED"
          ? "✓"
          : "✗";

      const color =
        decision === "ACCEPTED"
          ? colors.success
          : colors.rejection;

      const timestamp = new Date().toLocaleTimeString();

      console.log(
        `%c${icon} [${timestamp}] ${reason}`,
        color,
        data || ""
      );
    },
    []
  );

  /**
   * Log behavioral state
   */
  const debugBehavior = useCallback(
    (state) => {
      if (!DEBUG) return;

      console.group(
        "%cBILLA BEHAVIOR STATE",
        "color:#A68A64;font-weight:bold;font-size:14px;"
      );
      console.table(state);
      console.groupEnd();
    },
    []
  );

  return {
    debug,
    debugDialogue,
    debugBehavior,
  };
};
