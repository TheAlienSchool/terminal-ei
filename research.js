// ============================================
// SANCTUARY RESEARCH SYSTEM
// Regenerative research framework by Jero Wiku
// ============================================

// Utility functions
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const eiSave = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const eiLoad = (key, fallback = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

// Research state
let researchMode = null; // 'self' or 'facilitated'
let researcherName = null;
let currentQuestionIndex = 0;
let responses = {};

// ============================================
// DEFINITION CONTENT
// ============================================

const definitions = {
  'sound-infused-air': {
    title: 'Sound Infused Air',
    subtitle: 'The Intelligent Atmosphere of the Sanctuary',
    content: `
      <p><strong>Sound Infused Air</strong> is the intelligent, responsive atmosphere created when bronze Gamelatron vibrations meet your presence in the sanctuary space.</p>

      <p>This is not merely "ambient sound"—it is a living field where:</p>

      <ul>
        <li>Bronze frequencies <strong>activate spatial awareness</strong></li>
        <li>Resonance becomes <strong>perceivable information</strong></li>
        <li>Your attention <strong>shapes what emerges</strong></li>
        <li>Silence between tones holds its own intelligence</li>
      </ul>

      <p>In Sound Infused Air, you are not a passive listener but an active participant. The atmosphere responds to collective presence, creating conditions for what wants to become visible.</p>
    `
  },

  'balinese-cosmology': {
    title: 'Balinese Cosmology',
    subtitle: 'Cultural Lineage :: Living Wisdom',
    content: `
      <p>The <strong>Gamelatron</strong> is a robotic Gamelan orchestra created by Aaron Taylor Kuffner, honoring the sacred bronze percussion tradition of Bali, Indonesia.</p>

      <p><strong>Cultural Context:</strong></p>

      <ul>
        <li><strong>Gamelan</strong> :: Bronze orchestra integral to Balinese ceremonies, rituals, and daily life for over 1,000 years</li>
        <li><strong>Panca Gita</strong> :: Five elements of Balinese cosmology (sound, movement, rhythm, melody, silence)</li>
        <li><strong>Tri Hita Karana</strong> :: Three sources of harmony—spiritual realm, social realm, natural environment</li>
        <li><strong>Sekala & Niskala</strong> :: Visible and invisible worlds existing simultaneously</li>
      </ul>

      <p>The Gamelatron translates this living cultural wisdom into public sonic sanctuary, creating space where ancient practice meets contemporary contemplative technology. We honor this lineage with humility and attribution.</p>

      <p><em>Learn more: <a href="https://gamelatron.com" target="_blank" rel="noopener">gamelatron.com</a></em></p>
    `
  },

  'ping': {
    title: 'PING (Arrival Vibration)',
    subtitle: 'Your State of Being When Entering',
    content: `
      <p><strong>PING</strong> is your arrival vibration—the frequency you bring when entering the sanctuary.</p>

      <p>It might be a feeling:</p>
      <ul>
        <li>Curious</li>
        <li>Scattered</li>
        <li>Grounded</li>
        <li>Hopeful</li>
      </ul>

      <p>Or a single word that captures your inner state:</p>
      <ul>
        <li>Seeking</li>
        <li>Restless</li>
        <li>Open</li>
        <li>Tired</li>
      </ul>

      <p>Your PING is not "good" or "bad"—it is simply what is true. The sanctuary welcomes whatever vibration you bring. Naming your arrival state is the first act of echo-locative intelligence: <em>sensing where you are so you can sense where you're going.</em></p>
    `
  },

  'verbration': {
    title: 'Verbration',
    subtitle: 'Action-State :: Verb + Vibration',
    content: `
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
    `
  },

  'research-ethics': {
    title: 'Research Ethics',
    subtitle: 'Attunement, Not Extraction',
    content: `
      <p><strong>You're not "providing data"—you're weaving collective memory.</strong></p>

      <p>This research framework honors:</p>

      <ul>
        <li><strong>Cultural lineage</strong> :: Balinese cosmology as living wisdom, not dataset</li>
        <li><strong>Resonance-based knowing</strong> :: Your embodied experience is valid research</li>
        <li><strong>Consent & autonomy</strong> :: Skip any question; all responses stored locally</li>
        <li><strong>Co-research</strong> :: You are insight-generator, not subject</li>
        <li><strong>Regenerative harvest</strong> :: Findings feed back to participants and wider field</li>
      </ul>

      <p><strong>Data Storage:</strong> All responses are stored in your browser's local storage. No server, no cloud, no third parties. You can export your responses at any time.</p>

      <p><strong>Attribution:</strong> Facilitated sessions include researcher name for source delineation and documentation purposes.</p>

      <p><em>Research framework prepared by Jero Wiku for regenerative sanctuary research.</em></p>
    `
  }
};

// ============================================
// RESEARCH QUESTIONS
// ============================================

const researchQuestions = [
  {
    id: 'attention_quality',
    text: 'How did the Sound Infused Air affect your attention?',
    type: 'scale',
    scaleLabels: ['Scattered', 'Absorbed'],
    helpText: 'Move the slider to indicate your experience'
  },
  {
    id: 'connection_felt',
    text: 'Did you feel a sense of connection—to self, others, place, or future?',
    type: 'radio',
    options: ['Yes', 'No', 'Unsure'],
    followUp: {
      condition: 'Yes',
      text: 'Describe this connection in one word:',
      type: 'text'
    }
  },
  {
    id: 'surprise_element',
    text: 'What surprised you most?',
    type: 'textarea',
    placeholder: 'One sentence...',
    helpText: 'There is no wrong answer—trust what emerges'
  },
  {
    id: 'resonance_artifact',
    text: 'One image or feeling you are taking with you:',
    type: 'textarea',
    placeholder: 'Poetic reflections welcome...',
    helpText: 'This is your departure resonance'
  },
  {
    id: 'future_sanctuary',
    text: 'Would you visit a public sonic sanctuary in your own neighborhood?',
    type: 'radio',
    options: ['Yes', 'Maybe', 'No', 'I already do']
  },
  {
    id: 'stage_of_change',
    text: 'Where are you in your practice?',
    type: 'radio',
    options: [
      'Investigating :: I am just curious',
      'Preparing :: I am reflecting on how this applies to my life',
      'Acting :: I have an action I want to take',
      'Maintaining :: I already do work like this'
    ]
  },
  {
    id: 'became_visible',
    text: 'What became visible to you?',
    type: 'textarea',
    placeholder: 'What emerged in your awareness...',
    helpText: 'From the Community Insight Board prompt'
  },
  {
    id: 'wants_nurturing',
    text: 'What wants to be nurtured?',
    type: 'textarea',
    placeholder: 'What asks for care and attention...',
    helpText: 'From the Community Insight Board prompt'
  },
  {
    id: 'question_holding',
    text: 'One question you are holding:',
    type: 'textarea',
    placeholder: 'The question does not need an answer yet...',
    helpText: 'From the Community Insight Board prompt'
  },
  {
    id: 'cultural_integration',
    text: 'How did the Gamelatron and Balinese cosmology resonate with you?',
    type: 'textarea',
    placeholder: 'Your reflections on cultural stewardship...',
    helpText: 'Optional—helps us understand cross-cultural reception'
  }
];

// ============================================
// MODE SELECTION
// ============================================

function showContextGuide() {
  document.getElementById('research-intro').style.display = 'none';
  document.getElementById('researcher-identification').style.display = 'none';
  document.getElementById('context-guide').style.display = 'block';
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Mode selection buttons
  document.getElementById('start-self-guided')?.addEventListener('click', () => {
    researchMode = 'self';
    showContextGuide();
  });

  document.getElementById('start-facilitated')?.addEventListener('click', () => {
    researchMode = 'facilitated';
    document.getElementById('research-intro').style.display = 'none';
    document.getElementById('researcher-identification').style.display = 'block';
  });

  document.getElementById('begin-facilitated')?.addEventListener('click', () => {
    const nameInput = document.getElementById('researcher-name');
    const name = nameInput.value.trim();

    if (!name) {
      alert('Please enter your name as the facilitating researcher.');
      return;
    }

    researcherName = name;
    showContextGuide();
  });

  // Context card clicks
  document.querySelectorAll('.context-card').forEach(card => {
    card.addEventListener('click', () => {
      const term = card.getAttribute('data-term');
      openDefinitionModal(term);
    });
  });

  // Definition link clicks
  document.querySelectorAll('.definition-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const term = link.getAttribute('data-term');
      openDefinitionModal(term);
    });
  });

  // Start questions button
  document.getElementById('start-questions')?.addEventListener('click', () => {
    startResearchCinema();
  });
});

// ============================================
// CONTEXT GUIDE
// ============================================

// ============================================
// DEFINITION MODALS
// ============================================

function openDefinitionModal(term) {
  const def = definitions[term];
  if (!def) return;

  // Lock scroll
  const scrollY = window.scrollY;
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';

  const modal = document.createElement('div');
  modal.id = 'verbration-modal'; // Use correct ID to match CSS
  modal.innerHTML = `
    <div class="modal-container">
      <h2>${def.title}</h2>
      <p class="modal-subtitle">${def.subtitle}</p>
      <div class="modal-content">
        ${def.content}
      </div>
      <button id="close-verbration-modal" type="button">Close</button>
    </div>
  `;

  document.body.appendChild(modal);

  setTimeout(() => modal.classList.add('visible'), 50);

  const closeModal = async () => {
    modal.classList.remove('visible');
    await wait(400);
    modal.remove();

    // Restore scroll
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);
  };

  document.getElementById('close-verbration-modal')?.addEventListener('click', closeModal);

  modal.addEventListener('click', async (e) => {
    if (e.target === modal) {
      await closeModal();
    }
  });
}

// ============================================
// RESEARCH CINEMA (Question Flow)
// ============================================

async function startResearchCinema() {
  // Hide context guide
  document.getElementById('context-guide').style.display = 'none';

  // Lock scroll
  const scrollY = window.scrollY;
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';

  // Create cinema container
  const cinema = document.createElement('div');
  cinema.id = 'research-cinema';
  cinema.innerHTML = `
    <div class="research-frame">
      <p class="question-number"></p>
      <h2 class="question-text"></h2>
      <div class="question-help-text" style="font-size: 0.85rem; color: var(--muted); font-style: italic; margin-bottom: 1.5rem;"></div>
      <div class="question-input-container"></div>
      <div class="question-actions">
        <button class="skip-btn" type="button">Skip Question</button>
        <button class="next-btn" type="button">Next</button>
      </div>
    </div>
  `;

  document.body.appendChild(cinema);

  await wait(100);
  cinema.classList.add('visible');

  // Show first question
  await showQuestion(0);
}

async function showQuestion(index) {
  if (index >= researchQuestions.length) {
    await completeResearch();
    return;
  }

  currentQuestionIndex = index;
  const question = researchQuestions[index];

  const cinema = document.getElementById('research-cinema');
  const numberEl = cinema.querySelector('.question-number');
  const textEl = cinema.querySelector('.question-text');
  const helpEl = cinema.querySelector('.question-help-text');
  const containerEl = cinema.querySelector('.question-input-container');
  const skipBtn = cinema.querySelector('.skip-btn');
  const nextBtn = cinema.querySelector('.next-btn');

  // Update question display
  numberEl.textContent = `Question ${index + 1} of ${researchQuestions.length}`;
  textEl.textContent = question.text;
  helpEl.textContent = question.helpText || '';

  // Build input based on type
  containerEl.innerHTML = buildQuestionInput(question);

  // Wire up skip button
  skipBtn.onclick = () => {
    responses[question.id] = null; // Explicitly mark as skipped
    showQuestion(index + 1);
  };

  // Wire up next button
  nextBtn.onclick = () => {
    const response = captureResponse(question);
    responses[question.id] = response;
    showQuestion(index + 1);
  };
}

function buildQuestionInput(question) {
  switch (question.type) {
    case 'scale':
      return `
        <div class="scale-input">
          <div class="scale-labels">
            <span>${question.scaleLabels[0]}</span>
            <span>${question.scaleLabels[1]}</span>
          </div>
          <input type="range" min="1" max="10" value="5" id="scale-input">
          <p style="text-align: center; margin-top: 1rem; color: var(--accent); font-size: 1.2rem;">
            <span id="scale-value">5</span> / 10
          </p>
        </div>
        <script>
          document.getElementById('scale-input').addEventListener('input', (e) => {
            document.getElementById('scale-value').textContent = e.target.value;
          });
        </script>
      `;

    case 'radio':
      let html = '<div class="radio-group">';
      question.options.forEach((option, i) => {
        html += `
          <div class="radio-option">
            <input type="radio" name="radio-response" id="radio-${i}" value="${option}">
            <label for="radio-${i}">${option}</label>
          </div>
        `;
      });
      html += '</div>';

      // Add follow-up if needed
      if (question.followUp) {
        html += `
          <div id="follow-up-container" style="display: none; margin-top: 1.5rem;">
            <p style="font-size: 0.95rem; color: var(--muted); margin-bottom: 0.8rem;">${question.followUp.text}</p>
            <div class="question-input">
              <input type="text" id="follow-up-input" placeholder="One word...">
            </div>
          </div>
        `;
      }

      return html;

    case 'text':
      return `
        <div class="question-input">
          <input type="text" id="text-input" placeholder="${question.placeholder || ''}" autofocus>
        </div>
      `;

    case 'textarea':
      return `
        <div class="question-input">
          <textarea id="textarea-input" placeholder="${question.placeholder || ''}" autofocus></textarea>
        </div>
      `;

    default:
      return '<p>Question type not supported</p>';
  }
}

function captureResponse(question) {
  switch (question.type) {
    case 'scale':
      return document.getElementById('scale-input')?.value || null;

    case 'radio':
      const selected = document.querySelector('input[name="radio-response"]:checked');
      const response = { selection: selected?.value || null };

      // Check for follow-up
      if (question.followUp && selected?.value === question.followUp.condition) {
        response.followUp = document.getElementById('follow-up-input')?.value || null;
      }

      return response;

    case 'text':
      return document.getElementById('text-input')?.value || null;

    case 'textarea':
      return document.getElementById('textarea-input')?.value || null;

    default:
      return null;
  }
}

// ============================================
// RESEARCH COMPLETE
// ============================================

async function completeResearch() {
  const cinema = document.getElementById('research-cinema');

  // Save to localStorage
  const researchData = {
    timestamp: new Date().toISOString(),
    mode: researchMode,
    researcher: researcherName,
    responses: responses
  };

  // Get existing research sessions
  const sessions = eiLoad('ei_research_sessions', []);
  sessions.push(researchData);
  eiSave('ei_research_sessions', sessions);

  // Show completion message
  cinema.innerHTML = `
    <div class="research-complete">
      <h3>Thank You for Deepening the Field</h3>

      <p>Your reflections have been saved locally and contribute to our understanding of sonic sanctuaries as tools for regenerative futures.</p>

      <p style="font-style: italic; color: var(--muted);">The research is itself a practice of attunement: listening deeply, reflecting back, inviting continued co-creation.</p>

      <div style="margin-top: 2.5rem; display: flex; flex-direction: column; gap: 1rem; align-items: center;">
        <button id="export-research" type="button">Export Your Responses</button>
        <button id="view-dashboard" type="button">View Research Dashboard</button>
        <a href="index.html" style="margin-top: 1rem; color: var(--accent); text-decoration: none;">Return to Sanctuary</a>
      </div>
    </div>
  `;

  // Wire up export button
  document.getElementById('export-research')?.addEventListener('click', () => {
    exportResearchData(researchData);
  });

  // Wire up dashboard button
  document.getElementById('view-dashboard')?.addEventListener('click', () => {
    window.location.href = 'research-dashboard.html';
  });

  await wait(3000);

  // Restore scroll after a delay
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
}

function exportResearchData(data) {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `sanctuary-research-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ============================================
// RADIO FOLLOW-UP HANDLER
// ============================================

// Delegate event listener for radio buttons (since they're dynamically created)
document.addEventListener('change', (e) => {
  if (e.target.type === 'radio' && e.target.name === 'radio-response') {
    const question = researchQuestions[currentQuestionIndex];
    const followUpContainer = document.getElementById('follow-up-container');

    if (followUpContainer && question.followUp) {
      if (e.target.value === question.followUp.condition) {
        followUpContainer.style.display = 'block';
      } else {
        followUpContainer.style.display = 'none';
      }
    }
  }
});
