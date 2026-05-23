# BILLA DEVELOPER REFERENCE

## Quick Start

Billa is already integrated. It appears automatically when you scroll past the hero section and starts observing user behavior.

## Understanding the Code

### Main Entry Point: `Billa/index.jsx`

```javascript
// State
const [message, setMessage] = useState("");
const [isVisible, setIsVisible] = useState(false);
const [showBilla, setShowBilla] = useState(false);

// This determines if Billa is visible on screen
```

**Key Logic Flow:**
1. Page loads → Billa hidden until scroll
2. User scrolls > viewport height → Billa appears
3. System begins tracking behavior
4. Events trigger dialogue through `speak()` function
5. Dialogue appears for 5.2 seconds then fades
6. Silent period enforced (22 seconds after important events)

### The `speak()` Function

This is the core dialogue dispatcher:

```javascript
speak(dialogueArray, {
  type: "ambient" | "contextual",
  priority: true | false,
  interrupt: true | false,
  source: "string identifier"
});
```

**Rules:**
- `type: "ambient"` → respects silence windows, low priority
- `type: "contextual"` → interrupts ambient, triggers silence
- `priority: true` → ignores cooldown (use sparingly)
- `interrupt: true` → stops current message and shows new one
- `source` → for debugging, shows where message came from

### Refs vs State

**State** (causes re-render):
- `message` - current dialogue text
- `isVisible` - is speech bubble showing?
- `showBilla` - is Billa character visible?

**Refs** (don't cause re-render, persistent):
- `lastMessageTime` - when was last message shown?
- `silenceUntil` - timestamp of next allowed ambient message
- `activeMessageType` - is "ambient" or "contextual" message active?
- `memory` - all behavioral tracking
- Scroll refs - for fast scroll detection

## Event System

### Adding a New Event

1. **Create the detection logic**
```javascript
useEffect(() => {
  const handleMyEvent = () => {
    debug("MY_EVENT_TRIGGERED");
    // Your detection logic here
  };
  
  window.addEventListener("appropriate-event", handleMyEvent);
  return () => window.removeEventListener("appropriate-event", handleMyEvent);
}, [speak, getDialogue, debug]);
```

2. **Add dialogue category**
```javascript
// In useDialogueEngine.js DIALOGUES object:
myEventCategory: [
  "Your observation here.",
  "Another comment.",
]
```

3. **Trigger dialogue**
```javascript
speak(getDialogue("myEventCategory"), {
  type: "contextual",
  priority: true,
  source: "my-event",
});
```

### Example: "User Scrolled to Bottom"

```javascript
useEffect(() => {
  const handleScrollToBottom = () => {
    const isNearBottom = 
      window.scrollY + window.innerHeight >= 
      document.documentElement.scrollHeight - 200;
    
    if (isNearBottom && !memory.current.reachedBottom) {
      memory.current.reachedBottom = true;
      
      speak(getDialogue("bottomReached"), {
        type: "contextual",
        priority: true,
        source: "scroll-bottom",
      });
    }
  };
  
  window.addEventListener("scroll", handleScrollToBottom);
  return () => window.removeEventListener("scroll", handleScrollToBottom);
}, [speak, getDialogue]);
```

## Debugging

### Enable Debug Output

Each hook has a DEBUG flag:

```javascript
const DEBUG = true;  // Set to true to see logs
```

### Debug Output Format

**Main Component Events:**
```
[14:32:45] SECTION: WORK
[14:32:47] FAST_SCROLL_DETECTED (count: 2, velocity: 280px)
[14:32:50] PROJECT_HOVER (index: 0, revisited: false)
```

**Dialogue Engine:**
```
DIALOGUE_ATTEMPT { source: "fast-scroll", type: "contextual" }
REJECTED → Cooldown active (elapsed: 2500, required: 4000)
DIALOGUE_SELECTED "You're not reading any of this."
```

**Behavior Analysis:**
```
EMOTIONAL_PROFILE { projectsHovered: 3, hasLingered: true }
```

### Common Debug Scenarios

**"Why didn't Billa respond to my action?"**
→ Check if message was REJECTED
→ Reasons: cooldown, silence window, contextual blocker, empty array

**"Why is Billa too silent?"**
→ Ambient probability is very high (93% rejection)
→ Check SILENCE_WINDOW (22 seconds after contextual)
→ Check if message was rejected by timing logic

**"Why does Billa repeat?"**
→ Recent message buffer only tracks 7 messages
→ Add more dialogue lines to the category
→ Increase cooldown times

## Common Modifications

### Make Billa More Verbose
```javascript
// Option 1: Reduce rejection rate
if (chance < 0.85) {  // Changed from 0.93
  return;  // Reject
}

// Option 2: Reduce silence window
SILENCE_WINDOW_AFTER_CONTEXTUAL = 12000;  // Was 22000

// Option 3: Reduce cooldowns
COOLDOWN_AMBIENT = 8000;  // Was 16000
```

### Make Billa More Silent
```javascript
// Option 1: Increase rejection rate
if (chance < 0.97) {  // Was 0.93
  return;
}

// Option 2: Increase silence window
SILENCE_WINDOW_AFTER_CONTEXTUAL = 35000;  // Was 22000

// Option 3: Increase cooldowns
COOLDOWN_AMBIENT = 25000;  // Was 16000
```

### Change Motion Speed
```javascript
// In BillaCharacter.jsx
animate={{
  y: [0, -1.5, 0],
}}
transition={{
  duration: 2.5,  // Was 4.2 - faster
  repeat: Infinity,
  ease: "easeInOut",
}}
```

### Change Speech Bubble Duration
```javascript
// In useDialogueEngine.js
const MESSAGE_DURATION = 3500;  // Was 5200ms
```

### Add More Project Classes
```javascript
// In main component useEffect
const projectCards = document.querySelectorAll(
  ".project-card, [data-billa-project], .work-item"  // Add here
);
```

## Troubleshooting

### Billa Not Appearing
✓ Check if `showBilla` state is true
✓ Check if CSS positioning is correct (fixed, bottom-4, right-4)
✓ Check if scrollY > viewport height

### Messages Not Showing
✓ Check if `speak()` returned false (rejected)
✓ Check console for debug logs
✓ Check if in silence window
✓ Check if cooldown active
✓ Verify dialogue array not empty

### Messages Too Frequent
✓ Increase COOLDOWN timings
✓ Increase SILENCE_WINDOW
✓ Increase ambient rejection rate (increase random threshold)
✓ Add more dialogue lines to dilute frequency

### Messages Repeating
✓ Add more unique dialogue lines
✓ Expand recent message buffer size
✓ Check duplicate filtering logic

### Performance Issues
✓ Check if too many event listeners
✓ Verify refs aren't causing re-renders
✓ Profile animation performance in DevTools
✓ Consider debouncing scroll events

## Best Practices

### DO
✓ Keep messages short (1 line ideally)
✓ Use dry, observational humor
✓ Avoid explanations or helpfulness
✓ Let silence be the dominant state
✓ Test with debug output on
✓ Respect the atmosphere
✓ Use priority sparingly
✓ Keep memory structured

### DON'T
✗ Make Billa talk constantly
✗ Add emojis or internet slang
✗ Create overly complex dialogue
✗ Use interrupt for non-critical events
✗ Add interactive elements
✗ Make Billa motivational or warm
✗ Add too many events
✗ Break the atmosphere for features

## File Reference

### `useDialogueEngine.js`
- **Purpose**: Dialogue selection and cooldown logic
- **Key Exports**: `speak()`, `getDialogue()`, `selectFromPool()`
- **Modify**: To add/edit dialogue or change cooldown timings

### `useBehaviorAnalysis.js`
- **Purpose**: User behavior pattern analysis
- **Key Exports**: `categorizeScroll()`, `detectReadingPattern()`, `analyzeEmotionalEngagement()`
- **Modify**: To change how behavior is interpreted

### `useBillaDebugger.js`
- **Purpose**: Development debugging output
- **Key Exports**: `debug()`, `debugDialogue()`, `debugBehavior()`
- **Modify**: To customize debug output format

### `BillaCharacter.jsx`
- **Purpose**: Character visual and idle animation
- **Contains**: Hover effects, motion, glow
- **Modify**: To change appearance or animation

### `BillaSpeechBubble.jsx`
- **Purpose**: Speech bubble UI and animations
- **Contains**: Gradient design, tail shape, typography
- **Modify**: To change bubble design or appearance

## Memory Structure

```javascript
memory = {
  // Sets for deduplication
  projectsHovered: Set(),      // Project indices
  projectsRevisited: Set(),    // Revisited indices
  sectionsEntered: Set(),      // Section IDs
  
  // Counters
  fastScrollTriggersCount: 0,
  idleEventCount: 0,
  
  // Booleans
  heroLingered: false,
  contactEntered: false,
  contactHesitated: false,
  billaHovered: false,
  
  // Analysis
  lastScrollVelocity: 0,
  userReadingPace: "unknown",  // 'fast', 'normal', 'slow'
  timeOnCurrentSection: 0,
}
```

### Adding Memory Fields

```javascript
// 1. Add to initial memory ref
const memory = useRef({
  // ... existing fields
  myNewField: false,  // or whatever type
});

// 2. Track it in relevant useEffect
memory.current.myNewField = newValue;

// 3. Use in dialogue decisions
if (memory.current.myNewField) {
  speak(...);
}
```

## Questions?

For full system documentation, see `BILLA_SYSTEM.md`
For implementation details, see `BILLA_IMPLEMENTATION.md`
