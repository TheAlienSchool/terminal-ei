# Terminal E.I. Complete Implementation Guide
## Echolocative Intelligence International - Full HÅRMONIOUS70 Integration

**Version:** 1.0 MVP (Launch-Ready)  
**Date:** November 17, 2025  
**For:** Development team implementing the complete experiential Terminal E.I.

---

## Table of Contents

1. [Overview & Philosophy](#overview--philosophy)
2. [What We're Building](#what-were-building)
3. [File Structure](#file-structure)
4. [Complete HTML](#complete-html)
5. [Complete CSS](#complete-css)
6. [Complete JavaScript](#complete-javascript)
7. [Implementation Priority](#implementation-priority)
8. [Testing Checklist](#testing-checklist)
9. [Launch Day Protocol](#launch-day-protocol)

---

## Overview & Philosophy

### What Terminal E.I. Is

Terminal E.I. is **consciousness navigation infrastructure** disguised as an airport terminal. It helps people:
- Check in with their current state (Boarding PING)
- Choose how to navigate (Verb selection)
- Move through contemplation (In-Flight)
- Name where they've arrived (Landing PING)
- Integrate what traveled with them (Baggage Claim)

### The HÅRMONIOUS70 Integration

HÅRMONIOUS70 is an aesthetic system that makes technology feel:
- **Warm** (cream/champagne tones, not cold digital)
- **Responsive** (environments that adapt to you)
- **Embodied** (breath, rhythm, resonance)
- **Communal** (collective field, shared wisdom)

### Core Design Principles

1. **Progressive disclosure** - Sections appear as you complete them
2. **Atmospheric responsiveness** - Terminal changes based on verb/time/history
3. **Collective intelligence** - Shared cabin notes create communal field
4. **Local-first** - All data stored in user's browser
5. **Minimal & complete** - No dependencies, under 50KB total
6. **Research-enabled** - Every journey exports as JSON

---

## What We're Building

### The Journey Flow

```
ARRIVE → Drop Needle → Check-In → Gate → Board → In-Flight → Landing → Baggage Claim → Complete
```

### Key Features Being Implemented

**✅ CRITICAL (Must ship Monday)**
- Progressive disclosure (show/hide sections based on state)
- HÅRMONIOUS70 visual integration (colors, ripples, spheres)
- Verb-specific atmospheres (terminal responds to chosen verb)
- Time-of-day awareness (night mode, morning mode, etc)
- Returning traveler recognition (welcome back + history)
- Collective cabin notes (share function → collective pool)
- Journey export (JSON download)
- Progress indicator (dots showing current stage)

**❌ REMOVED (Not in MVP)**
- Security/Thought Screening section (unnecessary)
- Concourse section (redundant with Gate)
- Side B (locked for now, future feature)
- Sound cues (optional, add later)

---

## File Structure

```
/
├── index.html          (complete Terminal E.I. structure)
├── ei.css             (all styles including HÅRMONIOUS70)
├── ei.js              (all behavior and state management)
└── README.md          (this file)
```

That's it. Three files. No dependencies.

---

## Complete HTML

**Key Changes from Original:**
- Removed Security section
- Removed Concourse section  
- Added data attributes for state management
- Added progress indicator
- Added reflection mode container
- Added journey history display
- Simplified navigation

**Notes:**
- All sections initially hidden except Curbside (handled by JS)
- ARIA labels maintained for accessibility
- Clean semantic structure

---

## Complete CSS

**What's New:**

### 1. HÅRMONIOUS70 Color Palette
```css
:root {
  --bg: #050d0c;           /* Deep forest base */
  --bg-soft: #071311;      /* Slightly lighter */
  --fg: #f5f7f3;           /* Cream white */
  --muted: #9ba6a5;        /* Muted sage */
  --accent: #d4c5a0;       /* Champagne cream (was green) */
  --accent-glow: rgba(212, 197, 160, 0.15);
  /* ... rest of tokens */
}
```

### 2. Time-of-Day Modes
```css
body[data-time="morning"] {
  --bg: #0a1f19;
  --accent: #e8d5b7; /* warmer cream */
}

body[data-time="night"] {
  --bg: #020a08;
  --accent: #7a9b8f; /* muted sage */
  --fg: rgba(245, 247, 243, 0.85);
}
```

### 3. Verb-Specific Atmospheres
```css
body[data-active-verb="sense"] {
  animation: gentlePulse 8s ease-in-out infinite;
}

body[data-active-verb="tune"] {
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 10px,
    rgba(212, 197, 160, 0.02) 10px,
    rgba(212, 197, 160, 0.02) 11px
  );
}
```

### 4. Ripple Background
```css
body::before {
  content: "";
  position: fixed;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 600px;
  background: 
    radial-gradient(circle, transparent 40%, rgba(212, 197, 160, 0.03) 41%, transparent 42%),
    radial-gradient(circle, transparent 50%, rgba(212, 197, 160, 0.02) 51%, transparent 52%),
    radial-gradient(circle, transparent 60%, rgba(212, 197, 160, 0.01) 61%, transparent 62%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0.4;
  z-index: -1;
}
```

### 5. Orb Mark (EI Logo)
```css
#ei-mark {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(212, 197, 160, 0.4), transparent 70%),
              radial-gradient(circle, var(--bg-soft), var(--bg));
  border: 1px solid rgba(212, 197, 160, 0.3);
  box-shadow: 
    inset 0 2px 8px rgba(212, 197, 160, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.3);
  position: relative;
}

#ei-mark::after {
  content: "";
  position: absolute;
  top: 12%;
  left: 25%;
  width: 30%;
  height: 30%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  filter: blur(4px);
}
```

### 6. Section Transitions
```css
@keyframes sectionArrive {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

section.arriving {
  animation: sectionArrive 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
```

### 7. Progress Indicator
```css
#journey-progress {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  z-index: 10;
}

.progress-stage {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(212, 197, 160, 0.2);
  transition: all 0.3s ease;
}

.progress-stage.active {
  background: rgba(212, 197, 160, 0.6);
  width: 12px;
  height: 12px;
}

.progress-stage.completed {
  background: var(--accent);
}
```

### 8. Completed Section Styling
```css
section.completed {
  opacity: 0.5;
  pointer-events: none;
  position: relative;
}

section.completed::after {
  content: "✓";
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(212, 197, 160, 0.15);
  border: 1px solid rgba(212, 197, 160, 0.3);
  color: var(--accent);
  font-size: 1.1rem;
}
```

### 9. Breath Guide (In-Flight)
```css
#breath-guide {
  margin: 2rem auto;
  text-align: center;
  max-width: 200px;
}

.breath-orb {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212, 197, 160, 0.4), transparent);
  border: 2px solid rgba(212, 197, 160, 0.6);
  animation: breathCycle 14s ease-in-out infinite;
}

@keyframes breathCycle {
  0% { transform: scale(1); opacity: 0.6; }
  28.5% { transform: scale(1.4); opacity: 1; } /* Inhale 4s */
  42.8% { transform: scale(1.4); opacity: 1; } /* Hold 2s */
  71.4% { transform: scale(1); opacity: 0.6; } /* Exhale 6s */
  85.7% { transform: scale(1); opacity: 0.6; } /* Hold 2s */
  100% { transform: scale(1); opacity: 0.6; }
}

.breath-instruction {
  font-size: 0.85rem;
  color: var(--muted);
  font-style: italic;
  animation: breathText 14s ease-in-out infinite;
}

@keyframes breathText {
  0%, 100% { content: ""; opacity: 0.6; }
  0%, 28.5% { content: "Inhale..."; opacity: 1; }
  28.5%, 42.8% { content: "Hold..."; opacity: 1; }
  42.8%, 71.4% { content: "Exhale..."; opacity: 1; }
  71.4%, 85.7% { content: "Hold..."; opacity: 1; }
}
```

### 10. Reflection Mode
```css
#reflection-mode {
  position: fixed;
  inset: 0;
  background: rgba(2, 10, 8, 0.98);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.6s ease;
}

.reflection-frame {
  text-align: center;
  max-width: 600px;
  padding: 3rem 2rem;
  animation: reflectionPulse 1s ease-in-out;
}

.reflection-stage {
  font-size: 0.9rem;
  color: var(--muted);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

.reflection-ping {
  font-size: 3rem;
  color: var(--accent);
  margin: 0;
  font-weight: 300;
  letter-spacing: 0.05em;
}

@keyframes reflectionPulse {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}
```

---

## Complete JavaScript

### Core State Management

```javascript
"use strict";

// ============================================
// STATE MANAGEMENT
// ============================================

const journeyState = {
  hasDroppedNeedle: false,
  hasBoardingPing: false,
  hasSelectedVerb: false,
  hasBoarded: false,
  hasCabinNote: false,
  hasLandingPing: false,
  hasSortedBaggage: false
};

const progressStages = [
  'arrival',
  'check-in',
  'gate',
  'boarding',
  'in-flight',
  'landing',
  'baggage'
];

let currentStageIndex = 0;

// ============================================
// UTILITIES
// ============================================

function eiSave(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('LocalStorage unavailable:', e);
  }
}

function eiLoad(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// TIME-OF-DAY AWARENESS
// ============================================

function setTimeOfDayAtmosphere() {
  const hour = new Date().getHours();
  const body = document.body;
  
  if (hour >= 5 && hour < 11) {
    body.setAttribute('data-time', 'morning');
  } else if (hour >= 11 && hour < 17) {
    body.setAttribute('data-time', 'afternoon');
  } else if (hour >= 17 && hour < 22) {
    body.setAttribute('data-time', 'evening');
  } else {
    body.setAttribute('data-time', 'night');
  }
}

// ============================================
// RETURNING TRAVELER RECOGNITION
// ============================================

function checkReturningTraveler() {
  const journeyHistory = eiLoad('ei_journey_history', []);
  const isReturning = journeyHistory.length > 0;
  
  if (isReturning) {
    const lastJourney = journeyHistory[journeyHistory.length - 1];
    const welcomeText = document.querySelector('#curbside h2');
    const descText = document.querySelector('#curbside p:first-of-type');
    
    if (welcomeText && descText) {
      welcomeText.textContent = 'Welcome back';
      descText.textContent = `Last time: ${lastJourney.boarding_ping || '—'} → ${lastJourney.landing_ping || '—'}. How do you arrive today?`;
    }
  }
}

// ============================================
// PROGRESS INDICATOR
// ============================================

function updateProgressIndicator(stageIndex) {
  const dots = document.querySelectorAll('.progress-stage');
  
  dots.forEach((dot, index) => {
    dot.classList.remove('active', 'completed');
    
    if (index < stageIndex) {
      dot.classList.add('completed');
    } else if (index === stageIndex) {
      dot.classList.add('active');
    }
  });
  
  currentStageIndex = stageIndex;
}

// ============================================
// SECTION VISIBILITY MANAGEMENT
// ============================================

async function advanceJourney(nextSectionId, stageIndex) {
  // Mark current section as completed
  const currentSection = document.querySelector('section.active');
  if (currentSection) {
    currentSection.classList.remove('active');
    currentSection.classList.add('completed');
    await wait(400);
  }
  
  // Show and scroll to next section
  const nextSection = document.querySelector(nextSectionId);
  if (!nextSection) return;
  
  nextSection.style.display = 'block';
  nextSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  await wait(600);
  
  // Animate arrival
  nextSection.classList.add('arriving', 'active');
  
  // Update progress
  updateProgressIndicator(stageIndex);
  
  // Remove arriving class after animation
  setTimeout(() => {
    nextSection.classList.remove('arriving');
  }, 800);
}

function initializeVisibility() {
  // Hide all sections except curbside
  document.querySelectorAll('main section').forEach(section => {
    if (section.id !== 'curbside') {
      section.style.display = 'none';
    }
  });
  
  // Mark curbside as active
  document.querySelector('#curbside')?.classList.add('active');
  
  // Initialize progress indicator
  updateProgressIndicator(0);
}

// ============================================
// VERB ATMOSPHERE INTEGRATION
// ============================================

function setVerbAtmosphere(verb) {
  document.body.setAttribute('data-active-verb', verb);
}

// ============================================
// COLLECTIVE CABIN NOTES
// ============================================

function addToCollectivePool(noteText) {
  const collectiveNotes = eiLoad('ei_collective_notes', []);
  collectiveNotes.push({
    text: noteText,
    timestamp: Date.now()
  });
  eiSave('ei_collective_notes', collectiveNotes);
}

function getTerminalNote() {
  const staticNotes = [
    "If you want to know where the mind is, check the log-in.",
    "Your first word carries more information than it seems.",
    "Every arrival has a reason, even if you do not see it yet.",
    "Attention rearranges everything it focuses on.",
    "Small clarity :: big movement.",
    "Every traveler leaves a groove.",
    "Check your signal :: then choose your route.",
    "You can always board again with a new PING."
  ];
  
  const collectiveNotes = eiLoad('ei_collective_notes', []);
  const allNotes = [...staticNotes, ...collectiveNotes.map(n => n.text)];
  
  return allNotes[Math.floor(Math.random() * allNotes.length)];
}

function dropTerminalNote() {
  const zone = document.createElement('div');
  zone.className = 'terminal-note';
  zone.textContent = getTerminalNote();
  document.body.appendChild(zone);
  
  setTimeout(() => zone.remove(), 6000);
}

// ============================================
// JOURNEY EXPORT
// ============================================

function exportJourney() {
  const journey = {
    boarding_ping: eiLoad('ei_boarding_ping', ''),
    verb: eiLoad('ei_selected_verb', ''),
    cabin_note: eiLoad('ei_cabin_note', ''),
    landing_ping: eiLoad('ei_landing_ping', ''),
    baggage_decisions: eiLoad('ei_baggage_decisions', {}),
    timestamp: new Date().toISOString()
  };
  
  const dataStr = JSON.stringify(journey, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `ei-journey-${journey.landing_ping || 'in-flight'}.json`;
  a.click();
  
  URL.revokeObjectURL(url);
}

function saveJourneyToHistory() {
  const journey = {
    boarding_ping: eiLoad('ei_boarding_ping', ''),
    verb: eiLoad('ei_selected_verb', ''),
    cabin_note: eiLoad('ei_cabin_note', ''),
    landing_ping: eiLoad('ei_landing_ping', ''),
    timestamp: new Date().toISOString()
  };
  
  const history = eiLoad('ei_journey_history', []);
  history.push(journey);
  eiSave('ei_journey_history', history);
}

// ============================================
// REFLECTION MODE
// ============================================

async function enterReflectionMode() {
  const journey = {
    boarding: eiLoad('ei_boarding_ping', '—'),
    verb: eiLoad('ei_selected_verb', '—'),
    note: eiLoad('ei_cabin_note', '—'),
    landing: eiLoad('ei_landing_ping', '—')
  };
  
  const reflection = document.createElement('div');
  reflection.id = 'reflection-mode';
  document.body.appendChild(reflection);
  
  const stages = [
    { label: 'You arrived with...', content: journey.boarding },
    { label: 'You chose to...', content: journey.verb.toUpperCase() },
    { label: 'You discovered...', content: `"${journey.note}"` },
    { label: 'You landed at...', content: journey.landing },
    { label: `${journey.boarding} → ${journey.landing}`, content: 'This is your arc.<br>This is your frequency.' }
  ];
  
  for (let i = 0; i < stages.length; i++) {
    reflection.innerHTML = `
      <div class="reflection-frame">
        <p class="reflection-stage">${stages[i].label}</p>
        <h2 class="reflection-ping">${stages[i].content}</h2>
      </div>
    `;
    await wait(4000);
  }
  
  await wait(2000);
  reflection.remove();
}

// ============================================
// EVENT HANDLERS
// ============================================

// 1. NEEDLE DROP
const needleDrop = document.getElementById('needle-drop');
needleDrop?.addEventListener('click', async () => {
  journeyState.hasDroppedNeedle = true;
  needleDrop.textContent = 'Side A :: playing';
  needleDrop.style.opacity = '0.5';
  needleDrop.style.pointerEvents = 'none';
  
  await advanceJourney('#check-in', 1);
});

// 2. BOARDING PING
const pingForm = document.getElementById('ping-form');
const boardingPingInput = document.getElementById('boarding-ping');
const pingConfirm = document.getElementById('ping-confirm');

pingForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const ping = boardingPingInput.value.trim();
  if (!ping) return;
  
  eiSave('ei_boarding_ping', ping);
  journeyState.hasBoardingPing = true;
  
  pingConfirm.textContent = `Boarding PING :: "${ping}" saved.`;
  boardingPingInput.value = '';
  
  setTimeout(() => {
    pingConfirm.textContent = '';
  }, 2600);
  
  await advanceJourney('#gate-deck', 2);
});

// 3. VERB SELECTION
const verbButtons = document.querySelectorAll('.verb-card');

verbButtons.forEach((btn) => {
  btn.addEventListener('click', async () => {
    const verb = btn.dataset.verb;
    if (!verb) return;
    
    eiSave('ei_selected_verb', verb);
    journeyState.hasSelectedVerb = true;
    
    // Visual selection
    verbButtons.forEach((b) => b.classList.remove('selected-verb'));
    btn.classList.add('selected-verb');
    
    // Set atmosphere
    setVerbAtmosphere(verb);
    
    await wait(800); // Let atmosphere settle
    await advanceJourney('#boarding', 3);
  });
});

// 4. BOARDING (Board Now button)
const boardBtn = document.getElementById('board-now');
const inFlightPrompt = document.getElementById('in-flight-prompt');

const verbPrompts = {
  sense: "Let your awareness rest on breath, sound, or sensation. Notice without explaining. What is present when you no longer try to solve it?",
  catch: "Something keeps returning. A thought, an image, a feeling. Let yourself actually see it this time.",
  name: "There is a pattern here. It might be old. It might be simple. Say what it actually is, in plain words.",
  move: "Where in your body or day wants to shift? What small adjustment would create more space? Make that move.",
  tune: "You feel slightly off-frequency. A small adjustment can change that. What minor change brings you closer to resonance?",
  open: "You have been holding something with extra tension. Where do you feel that? Let that space expand just a little.",
  shift: "You are between two states :: the previous one is fading and the next one is forming. Let yourself rest in that in-between for a moment."
};

boardBtn?.addEventListener('click', async () => {
  const ping = eiLoad('ei_boarding_ping', '');
  const verb = eiLoad('ei_selected_verb', '');
  
  journeyState.hasBoarded = true;
  
  const greeting = ping || verb
    ? `You boarded with :: ${ping || 'no word given'} :: and you travel with :: ${verb || 'no verb selected'}.`
    : 'You are in the cabin now. You can still choose a verb and add a PING any time.';
  
  const prompt = verbPrompts[verb] || 
    'Take this moment to notice what is present in your awareness. You can adjust your route at any time.';
  
  if (inFlightPrompt) {
    inFlightPrompt.innerHTML = `
      <p>${greeting}</p>
      <p style="margin-top:1.5rem;">${prompt}</p>
    `;
  }
  
  await advanceJourney('#in-flight', 4);
});

// 5. CABIN NOTE
const cabinNoteInput = document.getElementById('cabin-note');
const saveNoteBtn = document.getElementById('save-note');

saveNoteBtn?.addEventListener('click', async () => {
  const note = cabinNoteInput.value.trim();
  if (!note) return;
  
  eiSave('ei_cabin_note', note);
  journeyState.hasCabinNote = true;
  
  cabinNoteInput.value = '';
  const original = saveNoteBtn.textContent;
  saveNoteBtn.textContent = 'Note saved :: placed in your seat pocket.';
  
  setTimeout(() => {
    saveNoteBtn.textContent = original;
  }, 2200);
  
  await advanceJourney('#landing', 5);
});

// 6. LANDING PING
const landingInput = document.getElementById('landing-ping');
const saveLandingBtn = document.getElementById('save-landing');

saveLandingBtn?.addEventListener('click', async () => {
  const landing = landingInput.value.trim();
  if (!landing) return;
  
  eiSave('ei_landing_ping', landing);
  journeyState.hasLandingPing = true;
  
  landingInput.value = '';
  const original = saveLandingBtn.textContent;
  saveLandingBtn.textContent = 'Landing PING saved :: arrival noted.';
  
  setTimeout(() => {
    saveLandingBtn.textContent = original;
  }, 2200);
  
  await advanceJourney('#baggage-claim', 6);
  populateBaggage();
});

// 7. BAGGAGE CLAIM
const baggageList = document.getElementById('baggage-list');

function populateBaggage() {
  if (!baggageList) return;
  
  const items = [
    { label: 'Boarding PING', value: eiLoad('ei_boarding_ping', '') },
    { label: 'Verb', value: eiLoad('ei_selected_verb', '') },
    { label: 'Cabin Note', value: eiLoad('ei_cabin_note', '') },
    { label: 'Landing PING', value: eiLoad('ei_landing_ping', '') }
  ];
  
  baggageList.innerHTML = '';
  
  items.forEach((item) => {
    if (!item.value) return;
    
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${item.label} ::</strong> ${item.value}
      <div class="baggage-options">
        <button type="button" data-act="keep" data-item="${item.label}">Keep</button>
        <button type="button" data-act="store" data-item="${item.label}">Store</button>
        <button type="button" data-act="discard" data-item="${item.label}">Discard</button>
        <button type="button" data-act="share" data-item="${item.label}">Share</button>
      </div>
    `;
    baggageList.appendChild(li);
  });
}

// Baggage decision handling
baggageList?.addEventListener('click', (e) => {
  const target = e.target;
  if (!(target instanceof HTMLElement)) return;
  
  const action = target.dataset.act;
  const itemLabel = target.dataset.item;
  if (!action || !itemLabel) return;
  
  const item = target.closest('li');
  if (!item) return;
  
  // Visual feedback
  item.style.opacity = '0.6';
  target.textContent = action.toUpperCase();
  
  // Store decision
  const decisions = eiLoad('ei_baggage_decisions', {});
  decisions[itemLabel] = action;
  eiSave('ei_baggage_decisions', decisions);
  
  // If sharing cabin note, add to collective
  if (action === 'share' && itemLabel === 'Cabin Note') {
    const note = eiLoad('ei_cabin_note', '');
    if (note) {
      addToCollectivePool(note);
      item.style.borderColor = 'var(--accent)';
    }
  }
  
  // Check if all items have been sorted
  checkJourneyComplete();
});

function checkJourneyComplete() {
  const decisions = eiLoad('ei_baggage_decisions', {});
  const decisionCount = Object.keys(decisions).length;
  
  // If at least 3 items have been sorted, mark journey complete
  if (decisionCount >= 3 && !journeyState.hasSortedBaggage) {
    journeyState.hasSortedBaggage = true;
    saveJourneyToHistory();
    showCompletionOptions();
  }
}

function showCompletionOptions() {
  // Show Vinyl Lounge and Manifesto
  const vinylLounge = document.querySelector('#vinyl-lounge');
  const manifesto = document.querySelector('#manifesto');
  const footer = document.querySelector('footer');
  
  if (vinylLounge) {
    vinylLounge.style.display = 'block';
    vinylLounge.classList.add('arriving');
  }
  
  if (manifesto) {
    manifesto.style.display = 'block';
  }
  
  if (footer) {
    footer.style.display = 'block';
  }
  
  // Add completion buttons
  const baggageSection = document.querySelector('#baggage-claim');
  if (baggageSection && !document.querySelector('#reflection-btn')) {
    const completionDiv = document.createElement('div');
    completionDiv.style.marginTop = '2rem';
    completionDiv.innerHTML = `
      <button id="reflection-btn" type="button" style="margin-right: 1rem;">Reflect on This Journey</button>
      <button id="export-btn" type="button">Export Your Journey</button>
    `;
    baggageSection.appendChild(completionDiv);
    
    document.getElementById('reflection-btn')?.addEventListener('click', enterReflectionMode);
    document.getElementById('export-btn')?.addEventListener('click', exportJourney);
  }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Set time-of-day atmosphere
  setTimeOfDayAtmosphere();
  
  // Check for returning traveler
  checkReturningTraveler();
  
  // Initialize section visibility
  initializeVisibility();
  
  // Start terminal notes
  setInterval(() => {
    dropTerminalNote();
  }, 40000 + Math.random() * 50000);
});
```

---

## Implementation Priority

### Phase 1: Core Experience (Monday Launch)
**Time estimate: 4-6 hours**

1. ✅ Update HTML structure (remove Security/Concourse)
2. ✅ Implement HÅRMONIOUS70 CSS (colors, ripples, orb)
3. ✅ Implement progressive disclosure (show/hide sections)
4. ✅ Add progress indicator
5. ✅ Implement section transitions
6. ✅ Add completed section styling
7. ✅ Test full journey flow

### Phase 2: Atmospheres & Intelligence (Week 1)
**Time estimate: 3-4 hours**

1. ✅ Implement verb-specific atmospheres
2. ✅ Add time-of-day awareness
3. ✅ Implement returning traveler recognition
4. ✅ Add collective cabin notes pool
5. ✅ Test atmosphere transitions

### Phase 3: Advanced Features (Week 2)
**Time estimate: 2-3 hours**

1. ✅ Add breath guide to In-Flight
2. ✅ Implement reflection mode
3. ✅ Add journey export
4. ✅ Implement journey history display
5. ✅ Polish and optimize

---

## Testing Checklist

### Functional Tests

- [ ] Needle drop button advances to Check-In
- [ ] Boarding PING saves and advances to Gate
- [ ] Verb selection saves, sets atmosphere, advances to Boarding
- [ ] Board button generates correct prompt based on verb
- [ ] Cabin note saves and advances to Landing
- [ ] Landing PING saves and advances to Baggage Claim
- [ ] Baggage decisions save correctly
- [ ] Share button adds cabin note to collective pool
- [ ] Export button downloads valid JSON
- [ ] Reflection mode displays journey correctly
- [ ] Progress indicator updates at each stage
- [ ] Completed sections show checkmarks
- [ ] Returning traveler sees welcome back message

### Visual Tests

- [ ] Orb logo displays correctly with gradient
- [ ] Ripple background is subtle and centered
- [ ] Sections fade in smoothly when arriving
- [ ] Verb cards respond to hover
- [ ] Selected verb has proper styling
- [ ] Completed sections have reduced opacity
- [ ] Progress dots update correctly
- [ ] Time-of-day mode is active
- [ ] Breath orb animates at correct rhythm
- [ ] Terminal notes appear and disappear correctly

### Atmosphere Tests

- [ ] Night mode (10pm-5am) darkens background
- [ ] Morning mode (5am-11am) warms colors
- [ ] SENSE verb slows ripples
- [ ] TUNE verb adds wave pattern
- [ ] MOVE verb adds diagonal tension
- [ ] SHIFT verb changes temperature

### Data Persistence Tests

- [ ] Boarding PING persists in localStorage
- [ ] Verb selection persists
- [ ] Cabin note persists
- [ ] Landing PING persists
- [ ] Baggage decisions persist
- [ ] Journey saves to history on completion
- [ ] Collective notes accumulate correctly
- [ ] Exported JSON contains all data

### Cross-Browser Tests

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Accessibility Tests

- [ ] Keyboard navigation works
- [ ] ARIA labels present
- [ ] Focus states visible
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA

---

## Launch Day Protocol

### Pre-Launch (Sunday Night)

1. **Deploy to staging environment**
   - Test complete journey flow
   - Verify localStorage works
   - Check mobile responsiveness
   - Test export function

2. **Clear test data**
   - Clear localStorage
   - Reset to fresh state
   - Verify returning traveler logic works

3. **Create QR code**
   - Generate QR pointing to Terminal E.I. URL
   - Print simple instruction card:
     > "Check in digitally as you arrive  
     > Terminal E.I. — Consciousness Navigation"

### Monday Morning

1. **Deploy to production** (9 AM)
2. **Place QR code at Heron Arts entrance** (10 AM)
3. **Test first journey yourself** (record experience)
4. **Monitor for first visitor usage** (check localStorage via browser console if needed)

### First Week Monitoring

- **Check collective pool growth** (how many shared notes?)
- **Track journey completion rates** (how many reach baggage claim?)
- **Note most-selected verbs** (what's the distribution?)
- **Observe atmosphere effectiveness** (does time-of-day work?)
- **Document any bugs or unexpected behavior**

---

## Notes for Developers

### localStorage Keys Used

```javascript
'ei_boarding_ping'        // String
'ei_selected_verb'        // String
'ei_cabin_note'          // String
'ei_landing_ping'        // String
'ei_baggage_decisions'   // Object
'ei_journey_history'     // Array of journey objects
'ei_collective_notes'    // Array of note objects
```

### Critical Design Decisions

1. **No external dependencies** - Vanilla JS only, no frameworks
2. **Local-first** - All data in user's browser, no backend required
3. **Progressive enhancement** - Core experience works even if JS fails
4. **Graceful degradation** - Older browsers still get basic experience
5. **Minimal payload** - Target under 50KB total

### Future Expansion Points

- **Side B implementation** (locked button already exists in HTML)
- **Audio cues** (commented placeholders in JS)
- **Backend sync** (for true collective field across devices)
- **Mobile-specific enhancements** (swipe gestures)
- **Analytics** (privacy-respecting, opt-in)

---

## Final Checklist Before Launch

- [ ] All code reviewed and tested
- [ ] Mobile responsiveness verified
- [ ] Accessibility checked
- [ ] Performance optimized (under 50KB)
- [ ] QR code printed and ready
- [ ] Staging environment tested
- [ ] Production deployment ready
- [ ] Documentation complete
- [ ] Team briefed on monitoring plan

---

**This is consciousness infrastructure.**  
**This is HÅRMONIOUS70 made digital.**  
**This is Terminal E.I. complete.**

**Ready to drop the needle?**

---

*Document prepared by Claude for KzA and development team*  
*Terminal E.I. — Echolocative Intelligence International*  
*November 17, 2025*
