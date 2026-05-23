# BILLA SYSTEM DOCUMENTATION

> A quiet creature living inside the portfolio. Not a feature added to impress recruiters.

## Architecture Overview

```
Billa/
├── index.jsx                    # Main component orchestrator
├── components/
│   ├── BillaCharacter.jsx       # Visual component (character + motion)
│   └── BillaSpeechBubble.jsx    # Speech bubble UI
└── hooks/
    ├── useDialogueEngine.js     # Dialogue selection & cooldown logic
    ├── useBehaviorAnalysis.js   # User behavior analysis
    └── useBillaDebugger.js      # Development debugging tools
```

## System Philosophy

### What Billa Is NOT
- An assistant
- A chatbot
- A mascot
- Comic relief
- A productivity gimmick
- A meme character
- An onboarding system

### What Billa IS
- A passive observer
- A cynical side-character
- A reactive environmental presence
- A behavioral commentary system
- Part of the atmosphere itself

### Core Principle
**Silence is more important than speech.**

The system is designed with extreme restraint. Billa rarely speaks. When he does, it matters.

## Behavioral System

### Event Categories

1. **Ambient Thoughts** (Very Rare)
   - Chance: ~7% every 35 seconds during inactivity
   - Duration: 5.2 seconds
   - Cooldown: 16 seconds minimum between attempts
   - Purpose: Background atmosphere

2. **Fast Scroll Detection** (Contextual)
   - Trigger: >240px scroll in 400ms in important sections
   - Escalates: After 3 triggers, message changes to indicate awareness
   - Cooldown: 15 seconds between triggers
   - Purpose: Commentary on rushing behavior

3. **Idle Detection** (Contextual)
   - Trigger: 16+ seconds of inactivity
   - Fatigue: Probability decreases with repeated idle events
   - Purpose: Acknowledge thoughtful pause vs. abandonment

4. **Project Hover** (Contextual)
   - First hover: Project commentary
   - Revisit: Special "you came back" message
   - Priority: Interrupts other messages
   - Purpose: Acknowledge genuine engagement

5. **Contact Section**
   - Entry: Commentary on the professional moment
   - Linger (11s+): Acknowledge hesitation/doubt
   - Purpose: Recognize the commitment moment

6. **Hero Section**
   - Linger (9s+): Acknowledge careful reading of intro
   - Purpose: Reward thoughtful approach

7. **Late Night Mode** (1-4 AM)
   - Activates automatically
   - Special messages about shared insomnia
   - Purpose: Kinship/acknowledgment

8. **Billa Hover**
   - 60% chance to respond when you hover over Billa
   - Sarcastic "don't encourage this" responses
   - Purpose: Awareness of being noticed

### Cooldown & Silence System

```javascript
// Timing constants
COOLDOWN_AMBIENT = 16000ms
COOLDOWN_CONTEXTUAL = 4000ms
SILENCE_WINDOW_AFTER_CONTEXTUAL = 22000ms
```

**Logic Flow:**
1. After any contextual message (project, contact, idle), ambient thoughts are silenced for 22 seconds
2. No new ambient messages during this silence window
3. Contextual messages can still interrupt
4. Each message type has minimum cooldown before next message of same type

### Duplicate Prevention

Messages are tracked and repeated ones are filtered out:
- Recent message buffer: Last 7 messages
- Avoid repeating same dialogue too soon
- Larger pool of dialogues ensures variety

## Dialogue System

### Categories

**Ambient** (14 lines)
- "Most portfolios say too much."
- "Silence is harder to design."
- "He knows this will be skipped."
- "Some people scroll differently."
- "The pacing here is intentional."
- [etc.]

**Fast Scroll** (7 lines)
- "You're not reading any of this."
- "Speedrunning the portfolio."
- "That scroll speed is concerning."
- [etc.]

**Persistent Scroll** (4 lines)
- Escalation when user repeatedly fast scrolls
- "You skipped the important part."
- "He's noticed the pattern."
- [etc.]

**Project Hover** (7 lines)
- "He's weirdly proud of this one."
- "This took longer than he admits."
- "You actually stopped scrolling."
- [etc.]

**Project Revisit** (5 lines)
- "Second look."
- "Something caught."
- "Rare."
- [etc.]

**Idle** (6 lines)
- "Still here?"
- "At least pretend to read."
- "...are you still here?"
- [etc.]

**Contact Section** (6 + 5 lines)
- Entry: "Now comes the professional part."
- Linger: "Still deciding whether to send it?"
- [etc.]

**Hero Linger** (4 lines)
- "That intro took longer than expected."
- "You're reading it properly. Strange."
- [etc.]

**Late Night** (5 lines)
- "Neither of you sleep properly."
- "The insomnia demographic."
- [etc.]

**Billa Hover** (6 lines)
- "...what?"
- "You noticed me."
- "Don't encourage this."
- [etc.]

## Memory & State Tracking

The system maintains behavioral memory:

```javascript
memory = {
  projectsHovered: Set,           // Project indices hovered
  projectsRevisited: Set,         // Revisited projects
  sectionsEntered: Set,           // Sections visited
  fastScrollTriggersCount: number,
  idleEventCount: number,
  heroLingered: boolean,
  contactEntered: boolean,
  contactHesitated: boolean,
  billaHovered: boolean,
  lastScrollVelocity: number,
  userReadingPace: string,        // 'fast', 'normal', 'slow'
  timeOnCurrentSection: number,
}
```

This allows Billa to:
- Recognize revisits
- Track behavior patterns
- Escalate appropriately
- Avoid being repetitive
- Remember engagement

## Visual Design

### Character Animation
- **Idle Motion**: Subtle Y-axis float (±1.5px) over 4.2 seconds
- **Hover**: Gentle scale (1.04x) with spring physics
- **Appearance**: Fades in (0.8s ease) when scrollY > viewport height
- **Disappearance**: Fades out when scrolling back to hero

### Speech Bubble
- **Appearance**: Fade + scale + Y-translate (0.45s)
- **Position**: 128-144px above character (responsive)
- **Design**: Minimal gradient border, subtle glow
- **Tail**: Diamond-shaped pointer at bottom-right
- **Typography**: Light weight, generous letter-spacing
- **Color**: White/75 on black/70 background

### Motion Principles
- ✓ Subtle and premium
- ✓ Physically believable
- ✓ Soft, not cartoonish
- ✓ Integrated, not floating
- ✗ No bounce or exaggeration
- ✗ No constant animation
- ✗ No hyperactive looping

## Debugging System

Three levels of debug output with color-coded console logs:

### useBillaDebugger Hook
```javascript
debug(messageType, data)          // Main event logging
debugDialogue(decision, reason)   // Dialogue decisions
debugBehavior(stateObject)        // Full state dump
```

### Debug Output Examples
```
✓ [14:32:45] SECTION: WORK
✗ [14:32:47] IDLE REJECTED (probability failed)
✓ [14:32:50] PROJECT HOVER #2 (revisited)
✓ [14:32:55] CONTACT ENTERED
✓ [14:32:66] CONTACT HESITATION
```

### Enabling/Disabling Debug
Set `DEBUG = true/false` in each hook file, or add to environment variables.

## Integration Points

### Required HTML IDs
The system looks for these section IDs:
- `#home` - Hero section
- `#work` - Projects section
- `#skills` - Capabilities section
- `#contact` - Contact form section

### Required DOM Classes/Attributes
For project hover detection:
- `.project-card` OR
- `[data-billa-project]` attributes on elements

### Entry Point
Import in App.jsx:
```jsx
import Billa from './components/Billa'

// In component:
<Billa />
```

## Performance Considerations

- **Event Listeners**: Consolidated (scroll, mousemove, keydown, click)
- **Timeouts**: Properly cleaned up in useEffect returns
- **Re-renders**: Minimal with useCallback and memoization
- **Memory**: Sets used for efficient deduplication
- **Animation**: Framer Motion handles GPU acceleration

## Customization Guide

### Adding New Dialogue
Edit `useDialogueEngine.js` DIALOGUES object:

```javascript
const DIALOGUES = {
  newCategory: [
    "Your new dialogue here.",
    "Another observation.",
  ],
};
```

Then use in main component:
```javascript
speak(getDialogue("newCategory"), {
  type: "contextual",
  priority: true,
  source: "new-event",
});
```

### Adjusting Timing
Main timing constants in `useDialogueEngine.js`:
```javascript
COOLDOWN_AMBIENT = 16000         // Minimum between ambient
COOLDOWN_CONTEXTUAL = 4000       // Minimum between contextual
SILENCE_WINDOW_AFTER_CONTEXTUAL = 22000  // Silence after important
```

### Changing Scroll Sensitivity
In main component:
```javascript
const FAST_SCROLL_THRESHOLD = 240  // pixels in burst
const IMPORTANT_SECTIONS = ["work", "skills"]
```

### Disabling Events
Simply don't include the useEffect hook for that event.

## Best Practices

1. **Restraint First**
   - When in doubt, silence is better
   - Remove features that feel too frequent
   - Aim for 1-2 messages per page visit

2. **Contextual Over Ambient**
   - Contextual messages (real behavior) > ambient (random)
   - Interruption is rare and meaningful
   - Users should occasionally forget Billa exists

3. **Typography**
   - Keep messages short (1 line ideally)
   - Avoid explanations
   - Deadpan delivery
   - Observational humor

4. **Motion**
   - Subtle is premium
   - No attention-grabbing
   - Physically grounded
   - Integrated with UI

5. **Pacing**
   - Long intervals between ambient messages
   - Quick contextual responses
   - Meaningful silence windows
   - Respect the user's focus

## Atmosphere Preservation

The core rule: **Never destroy the immersion.**

Indicators that something's wrong:
- Messages too frequent (check cooldowns)
- Messages too entertaining (rewrite to be more dry)
- Motion too noticeable (reduce animations)
- Character too present (increase silence windows)
- Feels like a feature rather than atmosphere

If any of these occur, **remove it.**

## Status: Production Ready

✓ Event-driven architecture
✓ Behavioral memory system
✓ Contextual awareness
✓ Cooldown systems
✓ Silence management
✓ Premium motion design
✓ Comprehensive debugging
✓ Zero accessibility issues
✓ Performance optimized
✓ Immersion preserved

---

**Remember**: Billa is a quiet creature living inside the portfolio.
Not a feature. Not entertainment. A presence. An atmosphere.
