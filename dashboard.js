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

  // Calculate completion rate
  const totalQuestions = 10;
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
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  populateOverviewStats();
  populateSynthesisCanvas();
  populateIndividualResponses();
});
