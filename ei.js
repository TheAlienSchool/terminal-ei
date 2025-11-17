/**
 * 1000 Ways to Arrive :: Complete JavaScript
 * An Echo-locative Insights Survey in a Sonic Sanctuary
 *
 * Features:
 * - Progressive disclosure (sections appear as you complete them)
 * - Sonic atmosphere responsiveness
 * - Collective Sonic Notes pool
 * - Returning guest recognition
 * - Journey export and history
 * - Reflection mode
 * - Time-of-day awareness
 * - Verbration-specific atmospheres
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
  'sensing',
  'verbration',
  'explore',
  'sanctuary',
  'departure',
  'artifacts'
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
      welcomeHeading.textContent = 'Welcome back to 1000 Ways to Sit';
      firstPara.textContent = `Last visit: ${lastJourney.boarding_ping || '—'} → ${lastJourney.landing_ping || '—'}. What vibration arrives with you today?`;
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
    "Your arrival vibration carries more information than it seems.",
    "Every guest enters with their own frequency.",
    "The Gamelatron responds to collective presence.",
    "Sound Infused Air reveals what silence contains.",
    "Small shifts in resonance :: large shifts in awareness.",
    "Every sitting position is a portal.",
    "Sense your vibration :: choose your verbration.",
    "You can always return with a new arrival state.",
    "The spaces between tones hold wisdom.",
    "You are inside the instrument.",
    "Bronze sings at frequencies that invite your presence.",
    "The sanctuary welcomes whatever vibration you bring.",
    "Listening and being listened to happen simultaneously.",
    "Every surface becomes a resonating body.",
    "Your departure resonance shapes what comes next.",
    "Scattered. Calm. Anxious. Open. All frequencies belong here.",
    "We are concentric :: rippling outward from presence.",
    "Take the time to comprehend your senses.",
    "Echo-locative intelligence is activated by your arrival.",
    "The silence between sounds holds its own intelligence.",
    "You are instrument, artist, and art simultaneously.",
    "Empirically connective frequencies encourage your resonance.",
    "Navigate by echo :: sense the spaces between tones.",
    "We are glad that you arrived as you.",
    "Your note becomes part of the field.",
    "Where bronze sings, you listen. Where silence opens, you enter.",
    "Sound Infused Air is intelligent and responsive.",
    "The cognitive companion completes the somatic practice.",
    "Reflection integrates what embodiment initiates.",
    "You are learning to move through the invisible architecture of awareness."
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
  reflection.innerHTML = `
    <div class="reflection-frame">
      <p class="reflection-stage"></p>
      <h2 class="reflection-ping"></h2>
    </div>
  `;
  document.body.appendChild(reflection);

  const stageEl = reflection.querySelector('.reflection-stage');
  const pingEl = reflection.querySelector('.reflection-ping');

  const stages = [
    { label: 'You arrived...', content: journey.boarding, delay: 800 },
    { label: 'Your verbration was...', content: journey.verb.toUpperCase(), delay: 600 },
    { label: 'You sensed...', content: `"${journey.note}"`, delay: 900 },
    { label: 'You departed...', content: journey.landing, delay: 800 },
    { label: `${journey.boarding} → ${journey.landing}`, content: 'This is your resonance.<br>This is your frequency.', delay: 1200 }
  ];

  // Fade in container
  await wait(100);
  reflection.classList.add('visible');

  for (let i = 0; i < stages.length; i++) {
    // Fade out previous
    stageEl.classList.remove('visible');
    pingEl.classList.remove('visible');
    await wait(400);

    // Update content
    stageEl.textContent = stages[i].label;
    pingEl.innerHTML = stages[i].content;

    // Staggered fade in
    await wait(200);
    stageEl.classList.add('visible');
    await wait(stages[i].delay);
    pingEl.classList.add('visible');
    await wait(3000);
  }

  // Final hold and fade out
  await wait(2000);
  reflection.classList.remove('visible');
  await wait(600);
  reflection.remove();
}

// ============================================
// EVENT HANDLERS
// ============================================

// 1. PRESENCE ACTIVATION
const needleDrop = document.getElementById('needle-drop');
needleDrop?.addEventListener('click', async () => {
  journeyState.hasDroppedNeedle = true;
  needleDrop.textContent = 'You Are Here';
  needleDrop.style.opacity = '0.7';
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

  pingConfirm.textContent = `Arrival Vibration :: "${ping}" sensed and saved.`;
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

// BREATH GUIDE with Timer
let breathInterval = null;

function startBreathGuide() {
  const breathGuide = document.getElementById('breath-guide');
  const breathOrb = breathGuide?.querySelector('.breath-orb');
  const breathInstruction = breathGuide?.querySelector('.breath-instruction');
  const breathTimer = breathGuide?.querySelector('.breath-timer');

  if (!breathGuide || !breathOrb || !breathInstruction || !breathTimer) return;

  breathGuide.style.display = 'block';

  // Box Breath: 4 seconds in, 4 seconds hold, 4 seconds out, 4 seconds hold = 16 seconds total
  const breathCycle = [
    { duration: 4, instruction: 'Breathe in through your nose...', phase: 'inhale' },
    { duration: 4, instruction: 'Hold gently...', phase: 'hold' },
    { duration: 4, instruction: 'Breathe out slowly...', phase: 'exhale' },
    { duration: 4, instruction: 'Hold in the emptiness...', phase: 'pause' }
  ];

  let cycleIndex = 0;
  let secondsRemaining = breathCycle[0].duration;

  function updateBreath() {
    const currentPhase = breathCycle[cycleIndex];
    breathInstruction.textContent = currentPhase.instruction;
    breathTimer.textContent = `${secondsRemaining}`;
    breathOrb.setAttribute('data-phase', currentPhase.phase);

    secondsRemaining--;

    if (secondsRemaining < 0) {
      cycleIndex = (cycleIndex + 1) % breathCycle.length;
      secondsRemaining = breathCycle[cycleIndex].duration - 1;
    }
  }

  // Start immediately
  updateBreath();

  // Clear any existing interval
  if (breathInterval) clearInterval(breathInterval);

  // Update every second
  breathInterval = setInterval(updateBreath, 1000);
}

// 4. BOARDING (Board Now button)
const boardBtn = document.getElementById('board-now');
const inFlightPrompt = document.getElementById('in-flight-prompt');

const verbWhispers = {
  sense: "attune to subtle frequencies",
  see: "witness inner landscapes",
  hear: "listen to silence between tones",
  move: "let vibration guide motion",
  tune: "calibrate to resonance",
  open: "expand into spaciousness",
  shift: "allow transformation"
};

const verbPrompts = {
  sense: "Let your awareness rest in the Sound Infused Air. Notice the frequencies moving through the space and through your body. What is present when you stop trying to understand and simply sense?",
  see: "Close your eyes and witness the inner landscapes that emerge. What colors, shapes, or visions arise as the Gamelatron frequencies ripple through you? Let yourself see without judgment.",
  hear: "Listen for the spaces between the bronze tones. The silence between sounds holds its own intelligence. What do you hear in the pauses, the echoes, the resonance fading?",
  move: "Let the vibrations guide your body's micro-movements. Where does the sound want to move you? What subtle shifts in position change your relationship with the frequencies?",
  tune: "You are an instrument being tuned by Sound Infused Air. What small internal adjustment brings you into resonance with the Gamelatron's frequency? Notice when you align.",
  open: "The sonic field invites expansion. Where in your body, mind, or awareness can you create more space? Let the sound open what has been held closed.",
  shift: "You are between frequencies :: the arrival state is dissolving and something new is forming. Rest in this liminal sonic space. Let the transformation happen without forcing."
};

boardBtn?.addEventListener('click', async () => {
  const ping = eiLoad('ei_boarding_ping', '');
  const verb = eiLoad('ei_selected_verb', '');

  journeyState.hasBoarded = true;

  const verbCapitalized = verb ? verb.charAt(0).toUpperCase() + verb.slice(1) : '';
  const whisper = verbWhispers[verb] || '';

  const greeting = ping && verb
    ? `You entered the sanctuary ${ping} :: and you are exploring the sanctuary to ${verbCapitalized} and to ${whisper}.`
    : ping && !verb
    ? `You entered the sanctuary ${ping}. You can choose a verbration to guide your exploration.`
    : !ping && verb
    ? `You are exploring the sanctuary to ${verbCapitalized} and to ${whisper}. You can name your arrival vibration any time.`
    : 'You are in the sanctuary now. You can choose a verbration and name your arrival vibration any time.';

  const prompt = verbPrompts[verb] ||
    'Take this moment to notice what is present in the Sound Infused Air around you. You can adjust your exploration at any time.';

  if (inFlightPrompt) {
    inFlightPrompt.innerHTML = `
      <p>${greeting}</p>
      <p style="margin-top:1.5rem;">${prompt}</p>
    `;
  }

  // Start breath guide
  startBreathGuide();

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
  saveNoteBtn.textContent = 'Sonic Note saved :: resonance captured.';

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
  saveLandingBtn.textContent = 'Departure Resonance saved :: frequency noted.';

  setTimeout(() => {
    saveLandingBtn.textContent = original;
  }, 2200);
  
  await advanceJourney('#baggage-claim', 6);
  populateBaggage();
});

// 7. BAGGAGE CLAIM
const journeySummary = document.getElementById('journey-summary');

function populateBaggage() {
  if (!journeySummary) return;

  const arrival = eiLoad('ei_boarding_ping', '');
  const verb = eiLoad('ei_selected_verb', '');
  const note = eiLoad('ei_cabin_note', '');
  const departure = eiLoad('ei_landing_ping', '');

  journeySummary.innerHTML = `
    <div class="journey-item">
      <span class="journey-label">Arrival Vibration</span>
      <span class="journey-value">${arrival || '—'}</span>
    </div>
    <div class="journey-item">
      <span class="journey-label">Chosen Verbration</span>
      <span class="journey-value">${verb ? verb.toUpperCase() : '—'}</span>
    </div>
    <div class="journey-item">
      <span class="journey-label">Sonic Note</span>
      <span class="journey-value">"${note || '—'}"</span>
    </div>
    <div class="journey-item">
      <span class="journey-label">Departure Resonance</span>
      <span class="journey-value">${departure || '—'}</span>
    </div>
  `;

  // Mark journey as sorted and save to history
  if (!journeyState.hasSortedBaggage && arrival && verb && note && departure) {
    journeyState.hasSortedBaggage = true;
    updateProgressIndicator(6);
    saveJourneyToHistory();
    showCompletionOptions();
  }
}

function showCompletionOptions() {
  // Show Sitting Room and Manifesto
  const sittingRoom = document.querySelector('#sitting-room');
  const manifesto = document.querySelector('#manifesto');
  const about = document.querySelector('#about');
  const footer = document.querySelector('footer');

  if (sittingRoom) {
    sittingRoom.style.display = 'block';
    sittingRoom.classList.add('arriving');
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
}

// Wire up journey action buttons
document.getElementById('reflection-btn')?.addEventListener('click', enterReflectionMode);
document.getElementById('export-btn')?.addEventListener('click', exportJourney);
document.getElementById('share-note-btn')?.addEventListener('click', () => {
  const note = eiLoad('ei_cabin_note', '');
  if (note) {
    addToCollectivePool(note);
    const btn = document.getElementById('share-note-btn');
    if (btn) {
      const original = btn.textContent;
      btn.textContent = 'Shared to The Sitting Room ✓';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
      }, 3000);
    }
  }
});
document.getElementById('enter-sitting-room')?.addEventListener('click', enterSittingRoom);

// 8. THE SITTING ROOM (Cinematic Fullscreen Experience)
async function enterSittingRoom() {
  const collectiveNotes = eiLoad('ei_collective_notes', []);

  // Ambient sanctuary wisdom
  const ambientWisdom = [
    "Your arrival vibration carries more information than it seems.",
    "Every guest enters with their own frequency.",
    "The Gamelatron responds to collective presence.",
    "Sound Infused Air reveals what silence contains.",
    "Small shifts in resonance :: large shifts in awareness.",
    "Every sitting position is a portal.",
    "Sense your vibration :: choose your verbration.",
    "The spaces between tones hold wisdom.",
    "You are inside the instrument.",
    "Bronze sings at frequencies that invite your presence.",
    "The sanctuary welcomes whatever vibration you bring.",
    "Listening and being listened to happen simultaneously.",
    "Every surface becomes a resonating body.",
    "We are concentric :: rippling outward from presence.",
    "Take the time to comprehend your senses.",
    "Echo-locative intelligence is activated by your arrival.",
    "The silence between sounds holds its own intelligence.",
    "You are instrument, artist, and art simultaneously.",
    "Navigate by echo :: sense the spaces between tones.",
    "We are glad that you arrived as you.",
    "Your note becomes part of the field.",
    "Where bronze sings, you listen. Where silence opens, you enter.",
    "Sound Infused Air is intelligent and responsive.",
    "The cognitive companion completes the somatic practice.",
    "Reflection integrates what embodiment initiates.",
    "You are learning to move through the invisible architecture of awareness."
  ];

  // Prepare notes for cinematic display
  const userNotes = collectiveNotes.map(n => ({ text: n.text, type: 'user' }));
  const wisdom = ambientWisdom.slice(0, 6).map(w => ({ text: w, type: 'ambient' }));
  const selectedNotes = [...userNotes, ...wisdom].sort(() => Math.random() - 0.5).slice(0, 8);

  // Create cinematic fullscreen container
  const cinema = document.createElement('div');
  cinema.id = 'sitting-room-cinema';
  cinema.innerHTML = `
    <div class="cinema-frame">
      <p class="cinema-label"></p>
      <div class="cinema-note"></div>
    </div>
  `;
  document.body.appendChild(cinema);

  const labelEl = cinema.querySelector('.cinema-label');
  const noteEl = cinema.querySelector('.cinema-note');

  // Opening sequence
  const openingStages = [
    { label: 'The Sitting Room', note: 'Collective Resonance', isTitle: true },
    { label: 'From the sanctuary field...', note: '', isTransition: true }
  ];

  // Combine opening + notes
  const allStages = [
    ...openingStages,
    ...selectedNotes.map(n => ({
      label: n.type === 'user' ? 'A guest shared...' : 'The sanctuary whispers...',
      note: n.text,
      type: n.type
    })),
    { label: 'This is the vibrational pond', note: 'Where presence meets presence', isClosing: true }
  ];

  // Fade in container
  await wait(100);
  cinema.classList.add('visible');

  for (let i = 0; i < allStages.length; i++) {
    const stage = allStages[i];

    // Fade out previous
    labelEl.classList.remove('visible');
    noteEl.classList.remove('visible', 'ambient-style', 'user-style');
    await wait(400);

    // Update content
    labelEl.textContent = stage.label;
    noteEl.textContent = stage.note;

    // Add type-specific styling
    if (stage.type === 'ambient') {
      noteEl.classList.add('ambient-style');
    } else if (stage.type === 'user') {
      noteEl.classList.add('user-style');
    }

    // Staggered fade in
    await wait(200);
    labelEl.classList.add('visible');
    await wait(stage.isTitle ? 1200 : 600);
    noteEl.classList.add('visible');

    // Hold time varies by stage type
    const holdTime = stage.isTitle ? 2500 : stage.isClosing ? 3000 : stage.isTransition ? 1500 : 3500;
    await wait(holdTime);
  }

  // Final fade out
  await wait(1500);
  cinema.classList.remove('visible');
  await wait(600);
  cinema.remove();
}

// 9. VERBRATION MODAL
function openVerbrationModal() {
  const modal = document.createElement('div');
  modal.id = 'verbration-modal';
  modal.innerHTML = `
    <div class="modal-container">
      <h2>Verbration</h2>
      <p class="modal-subtitle">Action-State :: A Gateway to Presence</p>

      <div class="modal-content">
        <p><strong>Verbration</strong> is a portmanteau of <em>verb</em> and <em>vibration</em>.</p>

        <p>In this sanctuary, you don't just <em>observe</em> sound—you <em>participate</em> with it. A verbration is the action-state you choose to guide your exploration.</p>

        <p>Each verbration offers a different portal into the Sound Infused Air:</p>

        <ul>
          <li><strong>SENSE</strong> :: Attune to subtle frequencies</li>
          <li><strong>SEE</strong> :: Witness inner landscapes</li>
          <li><strong>HEAR</strong> :: Listen to silence between tones</li>
          <li><strong>MOVE</strong> :: Let vibration guide motion</li>
          <li><strong>TUNE</strong> :: Calibrate to resonance</li>
          <li><strong>OPEN</strong> :: Expand into spaciousness</li>
          <li><strong>SHIFT</strong> :: Allow transformation</li>
        </ul>

        <p>Your verbration shapes how you inhabit the sanctuary. It is both intention and invitation.</p>
      </div>

      <button id="close-verbration-modal" type="button">Close</button>
    </div>
  `;

  document.body.appendChild(modal);

  setTimeout(() => modal.classList.add('visible'), 50);

  document.getElementById('close-verbration-modal')?.addEventListener('click', async () => {
    modal.classList.remove('visible');
    await wait(400);
    modal.remove();
  });

  modal.addEventListener('click', async (e) => {
    if (e.target === modal) {
      modal.classList.remove('visible');
      await wait(400);
      modal.remove();
    }
  });
}

// Wire up verbration link
document.querySelector('.verbration-link')?.addEventListener('click', openVerbrationModal);
document.querySelector('.verbration-link')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openVerbrationModal();
  }
});

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
