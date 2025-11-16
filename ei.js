/**
 * Terminal E.I. Complete JavaScript
 * Echolocative Intelligence International
 * 
 * Features:
 * - Progressive disclosure (sections appear as you complete them)
 * - HÅRMONIOUS70 atmospheric responsiveness
 * - Collective cabin notes pool
 * - Returning traveler recognition
 * - Journey export and history
 * - Reflection mode
 * - Time-of-day awareness
 * - Verb-specific atmospheres
 */

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
    const welcomeHeading = document.querySelector('#curbside h2');
    const firstPara = document.querySelector('#curbside p:first-of-type');
    
    if (welcomeHeading && firstPara) {
      welcomeHeading.textContent = 'Welcome back';
      firstPara.textContent = `Last time: ${lastJourney.boarding_ping || '—'} → ${lastJourney.landing_ping || '—'}. How do you arrive today?`;
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
  
  // Hide footer initially
  const footer = document.querySelector('footer');
  if (footer) {
    footer.style.display = 'none';
  }
  
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
  const about = document.querySelector('#about');
  const footer = document.querySelector('footer');
  
  if (vinylLounge) {
    vinylLounge.style.display = 'block';
    vinylLounge.classList.add('arriving');
  }
  
  if (manifesto) {
    manifesto.style.display = 'block';
  }
  
  if (about) {
    about.style.display = 'block';
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
  
  // Start terminal notes (first one appears after 40-90 seconds)
  setTimeout(() => {
    dropTerminalNote();
    
    // Then continue at intervals
    setInterval(() => {
      dropTerminalNote();
    }, 40000 + Math.random() * 50000);
  }, 40000 + Math.random() * 50000);
});

// ============================================
// OPTIONAL: Clear Journey (for testing)
// ============================================

// Uncomment this to add a "Start Over" function
// You can call this from browser console: window.eiReset()

window.eiReset = function() {
  const confirmReset = confirm('This will clear your current journey. Are you sure?');
  if (confirmReset) {
    localStorage.removeItem('ei_boarding_ping');
    localStorage.removeItem('ei_selected_verb');
    localStorage.removeItem('ei_cabin_note');
    localStorage.removeItem('ei_landing_ping');
    localStorage.removeItem('ei_baggage_decisions');
    // Note: This does NOT clear journey_history or collective_notes
    location.reload();
  }
};

// ============================================
// DEBUG MODE
// ============================================

// Uncomment to enable debug logging
// const DEBUG = true;

// function debug(...args) {
//   if (DEBUG) {
//     console.log('[E.I. Terminal]', ...args);
//   }
// }
