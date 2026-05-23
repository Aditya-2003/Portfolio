# BILLA - SCENARIO TESTING CHECKLIST

## Rebalanced Parameters
✓ Cooldown Ambient: 8s (was 16s)
✓ Cooldown Contextual: 2.5s (was 4s)  
✓ Silence Window: 12s (was 22s)
✓ Ambient Rejection: 72% (was 92%)
✓ Ambient Interval: 18s (was 35s)
✓ Idle Threshold: 12s (was 16s)
✓ Idle Base Prob: 75% (was 65%)
✓ Contact Linger: 6s (was 11s)
✓ Hero Linger: 5s (was 9s)
✓ Fast Scroll Escalation: After 2 triggers (was 3)
✓ First Billa Hover: 100% (always responds)
✓ Repeat Billa Hover: 65% chance

---

## Test Scenarios (20-30 Second Visit)

### ✓ SCENARIO 1: Careful Reading
**User Profile:** Reads intro, scrolls slowly through sections

**Expected Behavior:**
1. Page loads → Nothing (waiting for scroll)
2. Scroll past hero (0-3s) → Billa appears (no message yet)
3. Stay on hero 5s → "That intro took longer than expected."
4. Scroll to projects (5-8s) → Scroll detected (normal pace, no message)
5. Hover project #1 (8-10s) → "He's weirdly proud of this one."
6. Continue reading (10-15s) → Message fades naturally
7. Idle for 12s+ (15-27s) → "Still here?"
8. Hover Billa (27-28s) → "You noticed me."

**Count:** 4 comments ✓

---

### ✓ SCENARIO 2: Fast Scroll Through
**User Profile:** Quickly scrolls through without engaging

**Expected Behavior:**
1. Page loads → Nothing
2. Scroll past hero (0-3s) → Billa appears
3. Fast scroll (>240px in 400ms) through projects (3-8s) → "You're not reading any of this."
4. Continue fast scrolling (8-10s) → Cooldown active (2.5s)
5. Another fast scroll (10-12s) → Escalation: "You skipped the important part."
6. Ambient message during silence break (12-18s) → Random observation
7. Contact section (18-22s) → "Now comes the professional part."

**Count:** 5 comments ✓

---

### ✓ SCENARIO 3: Project Exploration
**User Profile:** Hovers multiple projects, revisits one

**Expected Behavior:**
1. Scroll to projects (0-5s) → Billa appears
2. Hover project #1 (5-7s) → "This took longer than he admits."
3. Hover project #2 (9-11s) → "You actually stopped scrolling."
4. Hover project #1 again (13-15s) → "You came back to this."
5. Hero lingering reward (5s+ on hero) → "You're reading it properly."
6. Idle period (15-27s) → "At least pretend to read."
7. Billa hover (27-28s) → "...what?"

**Count:** 6+ comments ✓

---

### ✓ SCENARIO 4: Contact Section Focus
**User Profile:** Reaches contact, hesitates before submitting

**Expected Behavior:**
1. Scroll to contact (0-5s) → Billa appears
2. Contact enters (3-5s) → "Now comes the professional part."
3. User types/hovers (3-6s) → Message fades
4. Contact hesitation (6-8s) → Linger message: "Still deciding whether to send it?"
5. Idle while viewing form (8-18s) → "Most people hesitate here."
6. Ambient thought (18-24s) → Random observation
7. Submit or leave (24-30s) → Dialogue end

**Count:** 4-5 comments ✓

---

### ✓ SCENARIO 5: Late Night Visit (1-4 AM)
**User Profile:** Visit between 1-4 AM

**Expected Behavior:**
1. All normal scenarios trigger
2. At 5-8s mark → Late night mode activates
3. Late night message: "Neither of you sleep properly."
4. Continues with normal behavior

**Count:** Normal + 1 special ✓

---

## Key Assertions

### Message Frequency
- [ ] ~4-5 messages in typical 20-30 second visit
- [ ] Not more than 1 message per 2.5 seconds (contextual cooldown)
- [ ] Ambient messages appear 1-2 times during silence breaks
- [ ] No message spam (cooldown/silence respected)

### Event Triggers
- [ ] **Hero Linger** → Triggers at 5 seconds on hero
- [ ] **Fast Scroll** → Triggers immediately (>240px in 400ms)
- [ ] **Fast Scroll Escalation** → After 2 triggers, message changes
- [ ] **Project Hover** → First hover triggers immediately
- [ ] **Project Revisit** → Second hover shows "You came back"
- [ ] **Contact Entry** → Triggers when contact section visible
- [ ] **Contact Linger** → Triggers at 6 seconds in contact
- [ ] **Idle** → Triggers after 12 seconds no movement (75% base chance)
- [ ] **Billa Hover** → First hover 100%, repeat 65%
- [ ] **Ambient** → Appears ~1-2 times per visit (18s interval, 72% rejection)

### Message Quality
- [ ] No motivational messages
- [ ] No emojis
- [ ] Dry, observational tone
- [ ] Sarcastic/deadpan delivery
- [ ] Short (1-3 words ideal)
- [ ] Context-aware

### Silence Behavior
- [ ] After contextual message → 12s ambient silence
- [ ] Contextual messages override ambient
- [ ] Ambient messages never stack
- [ ] Messages never overlap

### Motion
- [ ] Character floats smoothly (±1.5px over 4.2s)
- [ ] Speech bubble fades in elegantly (0.45s)
- [ ] Speech bubble fades out naturally (0.5-1s)
- [ ] No jarring animations
- [ ] Hover effect is responsive but subtle

---

## Testing Method

1. **Open Portfolio**
2. **Open DevTools** → Console tab
3. **Look for:**
   - `[HH:MM:SS AM/PM]` timestamps
   - Color-coded messages (green ✓, orange ✗)
   - Section changes logged
   - Event triggers logged

4. **Test Each Scenario:**
   - Follow the user profile exactly
   - Note each message that appears
   - Verify count matches expectation
   - Check timing (should align with description)

5. **Verify Console Output:**
   - `SECTION: HOME/WORK/SKILLS/CONTACT` logs appear
   - `FAST_SCROLL_DETECTED` or `IDLE_DETECTED` logs appear
   - `PROJECT_HOVER` logs appear
   - `CONTACT_SECTION_ENTERED` logs appear
   - No errors in console

---

## Debugging Tips

### Billa Not Appearing
- Check: `window.scrollY > viewport height`
- Check console for `showBilla` state changes
- Check: Is character image loading? (/billa.png)

### Messages Not Triggering
- Check cooldown times: `[HH:MM:SS] elapsed since last message`
- Check silence window: `AMBIENT_SILENCED_UNTIL` timestamp
- Check probability: Look for `REJECTED → probability failed`
- Verify section IDs exist in HTML: `#home`, `#work`, `#skills`, `#contact`

### Too Many Messages
- Increase rejection rates in hooks (72% → 85%)
- Increase cooldown times
- Extend silence window
- Reduce ambient interval

### Too Few Messages
- Decrease rejection rates (72% → 55%)
- Decrease cooldown times
- Shorten silence window
- Lower idle threshold

---

## Expected Behavior Pattern

Over a typical 30-second first-time visit:

```
0s   → User lands, scrolls past hero
5s   → Billa appears, hero linger triggers
     → Message: "That intro took longer than expected."
8s   → Idle or scroll detected
12s  → Ambient silence active
15s  → Hovers project
     → Message: "He's weirdly proud of this one."
18s  → Scroll to contact section
20s  → Contact entry message: "Now comes the professional part."
26s  → Contact linger (6s later)
     → Message: "Still deciding whether to send it?"
28s  → Hovers Billa
     → Message: "...what?"

TOTAL: 5 messages ✓
TIMING: Roughly one every 5-6 seconds ✓
CONTEXT: All messages match behavior ✓
```

---

## Status After Rebalancing

**Now:** Noticeably present but still restrained
**Not:** Chatbot-like or spammy
**Still:** Atmospheric and intentional
**Result:** 4-5 quality messages per 30s visit

---

## Performance Check

Build size should remain unchanged:
- Before: 392.62 KB JS (121.25 KB gzip)
- After: ~398 KB JS (123 KB gzip) - minimal addition
- No performance impact (event listener consolidation)

---

Run through these scenarios and verify each point. Billa should now be **noticeably present** while maintaining the **quiet observer** aesthetic.
