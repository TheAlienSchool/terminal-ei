// ============================================
// RESEARCH DASHBOARD
// Synthesis canvas and aggregated patterns
// ============================================

const eiLoad = (key, fallback = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const eiSave = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// Load all research sessions
const sessions = eiLoad('ei_research_sessions', []);

// ============================================
// OVERVIEW STATS
// ============================================

function populateOverviewStats() {
  const totalSessions = sessions.length;
  const selfGuidedCount = sessions.filter(s => s.mode === 'self').length;
  const facilitatedCount = sessions.filter(s => s.mode === 'facilitated').length;

  // Calculate completion rate dynamically
  // Get total question count from first session's response keys (most reliable source)
  const totalQuestions = sessions.length > 0
    ? Object.keys(sessions[0].responses).length
    : 10; // Fallback if no sessions yet

  let totalAnswered = 0;
  sessions.forEach(session => {
    const responses = session.responses;
    const answered = Object.values(responses).filter(r => r !== null).length;
    totalAnswered += answered;
  });
  const completionRate = totalSessions > 0
    ? Math.round((totalAnswered / (totalSessions * totalQuestions)) * 100)
    : 0;

  // Latest session
  let latestSessionText = 'No sessions yet';
  if (totalSessions > 0) {
    const latest = sessions[sessions.length - 1];
    const date = new Date(latest.timestamp);
    latestSessionText = `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    if (latest.mode === 'facilitated' && latest.researcher) {
      latestSessionText += ` (facilitated by ${latest.researcher})`;
    }
  }

  // Update DOM
  document.getElementById('total-sessions').textContent = totalSessions;
  document.getElementById('self-count').textContent = selfGuidedCount;
  document.getElementById('facilitated-count').textContent = facilitatedCount;
  document.getElementById('completion-rate').textContent = `${completionRate}%`;
  document.getElementById('latest-session').textContent = latestSessionText;
}

// ============================================
// SYNTHESIS CANVAS
// ============================================

function populateSynthesisCanvas() {
  // 1. ATTENTION & EMBODIMENT
  const attentionData = [];
  sessions.forEach(session => {
    const scale = session.responses.attention_quality;
    const surprise = session.responses.surprise_element;
    if (scale) attentionData.push({ type: 'scale', value: scale });
    if (surprise) attentionData.push({ type: 'quote', value: surprise });
  });
  renderSynthesisSection('synthesis-attention', attentionData);

  // 2. CONNECTION
  const connectionData = [];
  sessions.forEach(session => {
    const conn = session.responses.connection_felt;
    if (conn && typeof conn === 'object') {
      if (conn.selection === 'Yes' && conn.followUp) {
        connectionData.push({ type: 'connection-word', value: conn.followUp });
      }
    }
  });
  renderSynthesisSection('synthesis-connection', connectionData);

  // 3. CULTURAL INTEGRATION
  const culturalData = [];
  sessions.forEach(session => {
    const cultural = session.responses.cultural_integration;
    if (cultural) culturalData.push({ type: 'quote', value: cultural });
  });
  renderSynthesisSection('synthesis-cultural', culturalData);

  // 4. FUTURES SENSEMAKING
  const futuresData = [];
  sessions.forEach(session => {
    const resonance = session.responses.resonance_artifact;
    if (resonance) futuresData.push({ type: 'quote', value: resonance });
  });
  renderSynthesisSection('synthesis-futures', futuresData);

  // 5. DESIRE FOR SONIC SANCTUARIES
  const desireData = [];
  const sanctuaryResponses = { Yes: 0, Maybe: 0, No: 0, 'I already do': 0 };
  sessions.forEach(session => {
    const future = session.responses.future_sanctuary;
    if (future && typeof future === 'object' && future.selection) {
      sanctuaryResponses[future.selection] = (sanctuaryResponses[future.selection] || 0) + 1;
    } else if (typeof future === 'string') {
      sanctuaryResponses[future] = (sanctuaryResponses[future] || 0) + 1;
    }
  });
  desireData.push({ type: 'stats', value: sanctuaryResponses });
  renderSynthesisSection('synthesis-desire', desireData);

  // 6. CROSS-MODAL PERCEPTION
  const perceptionData = [];
  sessions.forEach(session => {
    const visible = session.responses.became_visible;
    if (visible) perceptionData.push({ type: 'quote', value: visible });
  });
  renderSynthesisSection('synthesis-perception', perceptionData);

  // 7. SOCIAL FIELD & EMERGENCE
  const emergenceData = [];
  sessions.forEach(session => {
    const nurture = session.responses.wants_nurturing;
    if (nurture) emergenceData.push({ type: 'quote', value: nurture });
  });
  renderSynthesisSection('synthesis-emergence', emergenceData);

  // 8. QUESTIONS HELD BY THE FIELD
  const questionsData = [];
  sessions.forEach(session => {
    const question = session.responses.question_holding;
    if (question) questionsData.push({ type: 'quote', value: question });
  });
  renderSynthesisSection('synthesis-questions', questionsData);
}

function renderSynthesisSection(elementId, data) {
  const container = document.getElementById(elementId);
  if (!container) return;

  if (data.length === 0) {
    container.innerHTML = '<p style="color: var(--muted); font-style: italic;">No data yet</p>';
    return;
  }

  let html = '';

  data.forEach(item => {
    if (item.type === 'quote') {
      html += `<div class="response-item">"${item.value}"</div>`;
    } else if (item.type === 'connection-word') {
      html += `<span style="display: inline-block; padding: 0.4rem 0.8rem; background: rgba(212, 197, 160, 0.15); border-radius: 999px; margin: 0.3rem; font-size: 0.85rem; color: var(--accent);">${item.value}</span>`;
    } else if (item.type === 'scale') {
      html += `<span style="display: inline-block; padding: 0.4rem 0.8rem; background: rgba(212, 197, 160, 0.1); border-radius: 4px; margin: 0.3rem; font-size: 0.85rem;">Scale: ${item.value}/10</span>`;
    } else if (item.type === 'stats') {
      html += '<div style="margin: 1rem 0;">';
      for (const [key, value] of Object.entries(item.value)) {
        if (value > 0) {
          html += `<p style="font-size: 0.95rem; margin: 0.5rem 0;"><strong>${key}:</strong> ${value} ${value === 1 ? 'response' : 'responses'}</p>`;
        }
      }
      html += '</div>';
    }
  });

  container.innerHTML = html;
}

// ============================================
// INDIVIDUAL RESPONSES
// ============================================

function populateIndividualResponses() {
  const container = document.getElementById('responses-container');
  if (!container) return;

  if (sessions.length === 0) {
    container.innerHTML = '<p style="color: var(--muted); font-style: italic;">No sessions yet</p>';
    return;
  }

  let html = '';

  sessions.forEach((session, index) => {
    const date = new Date(session.timestamp);
    const dateStr = `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    const modeStr = session.mode === 'facilitated' && session.researcher
      ? `Facilitated by ${session.researcher}`
      : `Self-guided`;

    html += `
      <div class="dashboard-card" style="margin-bottom: 2rem;">
        <h3>Session ${index + 1}</h3>
        <p class="response-meta">${dateStr} • ${modeStr}</p>
        <div style="margin-top: 1.5rem;">
    `;

    // Display all responses
    const responses = session.responses;
    const questionMap = {
      attention_quality: 'Attention Quality',
      connection_felt: 'Connection Felt',
      surprise_element: 'Surprise Element',
      resonance_artifact: 'Resonance Artifact',
      future_sanctuary: 'Future Sanctuary Interest',
      stage_of_change: 'Stage of Change',
      became_visible: 'What Became Visible',
      wants_nurturing: 'What Wants Nurturing',
      question_holding: 'Question Holding',
      cultural_integration: 'Cultural Integration'
    };

    for (const [key, label] of Object.entries(questionMap)) {
      const response = responses[key];
      if (response !== null && response !== undefined) {
        html += `<p style="margin: 1rem 0; padding-left: 1rem; border-left: 2px solid rgba(212, 197, 160, 0.3);"><strong style="color: var(--accent); font-size: 0.85rem;">${label}:</strong><br>`;

        if (typeof response === 'object') {
          if (response.selection) {
            html += `${response.selection}`;
            if (response.followUp) {
              html += ` (${response.followUp})`;
            }
          }
        } else {
          html += `${response}`;
        }

        html += '</p>';
      }
    }

    html += `
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ============================================
// EXPORT FUNCTIONS
// ============================================

function exportAllJSON() {
  const dataStr = JSON.stringify(sessions, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `sanctuary-research-all-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function exportSummaryCSV() {
  let csv = 'Session,Timestamp,Mode,Researcher,Attention Quality,Connection,Surprise,Resonance,Future Sanctuary,Stage of Change,Became Visible,Wants Nurturing,Question Holding,Cultural Integration\n';

  sessions.forEach((session, index) => {
    const responses = session.responses;
    const row = [
      index + 1,
      session.timestamp,
      session.mode,
      session.researcher || 'N/A',
      responses.attention_quality || '',
      typeof responses.connection_felt === 'object' ? responses.connection_felt.selection : responses.connection_felt || '',
      (responses.surprise_element || '').replace(/"/g, '""'),
      (responses.resonance_artifact || '').replace(/"/g, '""'),
      typeof responses.future_sanctuary === 'object' ? responses.future_sanctuary.selection : responses.future_sanctuary || '',
      typeof responses.stage_of_change === 'object' ? responses.stage_of_change.selection : responses.stage_of_change || '',
      (responses.became_visible || '').replace(/"/g, '""'),
      (responses.wants_nurturing || '').replace(/"/g, '""'),
      (responses.question_holding || '').replace(/"/g, '""'),
      (responses.cultural_integration || '').replace(/"/g, '""')
    ];

    csv += row.map(field => `"${field}"`).join(',') + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `sanctuary-research-summary-${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function clearAllData() {
  const confirm = window.confirm('Are you sure you want to clear all research data? This cannot be undone.');
  if (confirm) {
    localStorage.removeItem('ei_research_sessions');
    window.location.reload();
  }
}

// ============================================
// EVENT LISTENERS
// ============================================

document.getElementById('export-all-btn')?.addEventListener('click', exportAllJSON);
document.getElementById('export-csv-btn')?.addEventListener('click', exportSummaryCSV);
document.getElementById('clear-data-btn')?.addEventListener('click', clearAllData);

// ============================================
// JOURNEY HISTORY COMPARISON
// ============================================

function populateComparisonSelector() {
  const checkboxContainer = document.getElementById('session-checkboxes');
  const compareBtn = document.getElementById('compare-btn');

  if (!checkboxContainer || !compareBtn) return;

  if (sessions.length < 2) {
    checkboxContainer.innerHTML = '<p style="color: var(--muted); font-style: italic;">You need at least 2 sessions to use comparison view. Complete more research sessions to unlock this feature.</p>';
    compareBtn.disabled = true;
    return;
  }

  let html = '';
  sessions.forEach((session, index) => {
    const date = new Date(session.timestamp);
    const dateStr = `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    const modeStr = session.mode === 'facilitated' && session.researcher
      ? `Facilitated by ${session.researcher}`
      : 'Self-guided';

    html += `
      <div class="session-checkbox-item">
        <input type="checkbox" id="session-${index}" value="${index}">
        <label for="session-${index}" class="session-checkbox-label">
          <strong>Session ${index + 1}</strong> • ${dateStr} • ${modeStr}
        </label>
      </div>
    `;
  });

  checkboxContainer.innerHTML = html;

  // Handle checkbox changes
  const checkboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
      compareBtn.disabled = checkedCount < 2;
    });
  });

  // Initially disable button
  compareBtn.disabled = true;
}

function compareSelectedSessions() {
  const checkboxes = document.querySelectorAll('#session-checkboxes input[type="checkbox"]:checked');
  const selectedIndices = Array.from(checkboxes).map(cb => parseInt(cb.value));

  if (selectedIndices.length < 2) {
    alert('Please select at least 2 sessions to compare.');
    return;
  }

  const comparisonView = document.getElementById('comparison-view');
  if (!comparisonView) return;

  const selectedSessions = selectedIndices.map(i => sessions[i]);

  // Question labels for comparison
  const questionMap = {
    attention_quality: 'Attention Quality',
    connection_felt: 'Connection Felt',
    surprise_element: 'Surprise Element',
    resonance_artifact: 'Resonance Artifact',
    future_sanctuary: 'Future Sanctuary Interest',
    stage_of_change: 'Stage of Change',
    became_visible: 'What Became Visible',
    wants_nurturing: 'What Wants Nurturing',
    question_holding: 'Question Holding',
    cultural_integration: 'Cultural Integration'
  };

  // Build comparison grid
  let html = '<div class="comparison-grid">';

  selectedSessions.forEach((session, sessionIndex) => {
    const date = new Date(session.timestamp);
    const dateStr = `${date.toLocaleDateString()}`;
    const sessionNum = selectedIndices[sessionIndex] + 1;

    html += `
      <div class="comparison-column">
        <h4>Session ${sessionNum}<br><span style="font-size: 0.75rem; font-weight: normal; opacity: 0.7;">${dateStr}</span></h4>
    `;

    // Display each question
    for (const [key, label] of Object.entries(questionMap)) {
      const response = session.responses[key];

      // Check if response changed from previous session
      let evolutionIndicator = '';
      if (sessionIndex > 0) {
        const prevResponse = selectedSessions[sessionIndex - 1].responses[key];
        const currentStr = formatResponseForComparison(response);
        const prevStr = formatResponseForComparison(prevResponse);

        if (currentStr !== prevStr) {
          evolutionIndicator = '<span class="evolution-indicator changed">Changed</span>';
        } else if (currentStr && prevStr) {
          evolutionIndicator = '<span class="evolution-indicator same">Same</span>';
        }
      }

      html += `
        <div class="comparison-question">
          <span class="comparison-question-label">${label}${evolutionIndicator}</span>
          <div class="comparison-response ${!response ? 'no-response' : ''}">
            ${formatResponseDisplay(response)}
          </div>
        </div>
      `;
    }

    html += '</div>';
  });

  html += '</div>';

  comparisonView.innerHTML = html;

  // Scroll to comparison view
  comparisonView.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function formatResponseForComparison(response) {
  if (!response) return '';
  if (typeof response === 'object') {
    if (response.selection) {
      return response.followUp
        ? `${response.selection}: ${response.followUp}`
        : response.selection;
    }
  }
  return String(response);
}

function formatResponseDisplay(response) {
  if (!response) return '<em>No response</em>';

  if (typeof response === 'object') {
    if (response.selection) {
      let display = response.selection;
      if (response.followUp) {
        display += `<br><span style="margin-top: 0.5rem; display: block; padding-left: 1rem; border-left: 2px solid rgba(212, 197, 160, 0.3); font-style: italic;">${response.followUp}</span>`;
      }
      return display;
    }
  }

  return response;
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  populateOverviewStats();
  populateSynthesisCanvas();
  populateIndividualResponses();
  populateComparisonSelector();
});

document.getElementById('compare-btn')?.addEventListener('click', compareSelectedSessions);
