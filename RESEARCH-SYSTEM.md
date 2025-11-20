# Sanctuary Research System Documentation

## Overview

This integrated research system allows participants to contribute reflections on their sanctuary experience while enabling researchers to synthesize patterns and generate insights for regenerative practice.

**Framework by:** Jero Wiku
**Implementation:** Claude for 1000 Ways to Arrive

---

## System Architecture

```
┌─────────────────────────────────────────────┐
│         PARTICIPANT EXPERIENCE              │
│         research.html                       │
├─────────────────────────────────────────────┤
│                                             │
│  1. Mode Selection                          │
│     ├─ Self-Guided Reflection               │
│     └─ Facilitated Interview                │
│                                             │
│  2. Researcher Identification (facilitated) │
│                                             │
│  3. Context Definitions                     │
│     ├─ Sound Infused Air                    │
│     ├─ Balinese Cosmology                   │
│     ├─ PING (Arrival Vibration)             │
│     └─ Verbration                           │
│                                             │
│  4. Cinematic Research Questions (10)       │
│     - Skip any question                     │
│     - Multiple input types                  │
│                                             │
│  5. Completion & Export                     │
│                                             │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│         LOCAL STORAGE                       │
│         ei_research_sessions                │
│                                             │
│  Array of session objects:                 │
│  [{                                         │
│    timestamp: ISO string                    │
│    mode: 'self' | 'facilitated'             │
│    researcher: string | null                │
│    responses: {                             │
│      attention_quality: scale 1-10          │
│      connection_felt: object                │
│      surprise_element: string               │
│      resonance_artifact: string             │
│      future_sanctuary: string               │
│      stage_of_change: string                │
│      became_visible: string                 │
│      wants_nurturing: string                │
│      question_holding: string               │
│      cultural_integration: string           │
│    }                                        │
│  }]                                         │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│         RESEARCHER VIEW                     │
│         research-dashboard.html             │
├─────────────────────────────────────────────┤
│                                             │
│  1. Overview Stats                          │
│     - Total sessions                        │
│     - Mode distribution                     │
│     - Completion rate                       │
│     - Latest session                        │
│                                             │
│  2. Synthesis Canvas (8 categories)         │
│     ├─ Attention & Embodiment               │
│     ├─ Connection                           │
│     ├─ Cultural Integration                 │
│     ├─ Futures Sensemaking                  │
│     ├─ Desire for Sonic Sanctuaries         │
│     ├─ Cross-Modal Perception               │
│     ├─ Social Field & Emergence             │
│     └─ Questions Held by the Field          │
│                                             │
│  3. Individual Response Browser             │
│                                             │
│  4. Export Functions                        │
│     ├─ Export All (JSON)                    │
│     └─ Export Summary (CSV)                 │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Data Structure

### Session Object

Each completed research session is stored as an object:

```json
{
  "timestamp": "2025-01-20T15:30:00.000Z",
  "mode": "facilitated",
  "researcher": "Dr. Jane Smith",
  "responses": {
    "attention_quality": "8",
    "connection_felt": {
      "selection": "Yes",
      "followUp": "grounded"
    },
    "surprise_element": "How quickly my mind settled into the bronze tones",
    "resonance_artifact": "A feeling of spaciousness, like the room expanded",
    "future_sanctuary": {
      "selection": "Yes"
    },
    "stage_of_change": {
      "selection": "Preparing :: I'm reflecting on how this applies to my life"
    },
    "became_visible": "The connection between sound and inner state",
    "wants_nurturing": "More spaces for collective contemplation",
    "question_holding": "How can we create sonic sanctuaries in urban environments?",
    "cultural_integration": "I felt reverence for the Balinese tradition—the bronze has its own voice"
  }
}
```

### Storage Key

All sessions are stored in `localStorage` under the key:

```
ei_research_sessions
```

Value: Array of session objects (JSON stringified)

---

## Research Questions (10)

### 1. Attention Quality
- **Type:** Scale (1-10)
- **Question:** "How did the Sound Infused Air affect your attention?"
- **Scale:** Scattered → Absorbed
- **Maps to:** Attention & Embodiment (Synthesis Canvas)

### 2. Connection Felt
- **Type:** Radio + Optional Follow-up
- **Question:** "Did you feel a sense of connection—to self, others, place, or future?"
- **Options:** Yes / No / Unsure
- **Follow-up (if Yes):** "Describe this connection in one word"
- **Maps to:** Connection (Synthesis Canvas)

### 3. Surprise Element
- **Type:** Textarea
- **Question:** "What surprised you most?"
- **Maps to:** Attention & Embodiment (Synthesis Canvas)

### 4. Resonance Artifact
- **Type:** Textarea
- **Question:** "One image or feeling you're taking with you"
- **Maps to:** Futures Sensemaking (Synthesis Canvas)

### 5. Future Sanctuary Interest
- **Type:** Radio
- **Question:** "Would you visit a public sonic sanctuary in your own neighborhood?"
- **Options:** Yes / Maybe / No / I already do
- **Maps to:** Desire for Sonic Sanctuaries (Synthesis Canvas)

### 6. Stage of Change
- **Type:** Radio
- **Question:** "Where are you in your practice?"
- **Options:**
  - Investigating :: I'm just curious
  - Preparing :: I'm reflecting on how this applies to my life
  - Acting :: I have an action I want to take
  - Maintaining :: I already do work like this
- **Maps to:** Overview Stats (Dashboard)

### 7. What Became Visible
- **Type:** Textarea
- **Question:** "What became visible to you?"
- **Context:** Community Insight Board prompt
- **Maps to:** Cross-Modal Perception (Synthesis Canvas)

### 8. What Wants Nurturing
- **Type:** Textarea
- **Question:** "What wants to be nurtured?"
- **Context:** Community Insight Board prompt
- **Maps to:** Social Field & Emergence (Synthesis Canvas)

### 9. Question Holding
- **Type:** Textarea
- **Question:** "One question you're holding"
- **Context:** Community Insight Board prompt
- **Maps to:** Questions Held by the Field (Synthesis Canvas)

### 10. Cultural Integration
- **Type:** Textarea
- **Question:** "How did the Gamelatron and Balinese cosmology resonate with you?"
- **Context:** Optional—helps understand cross-cultural reception
- **Maps to:** Cultural Integration (Synthesis Canvas)

---

## Definition System

Four key concepts have clickable definitions that open in modal overlays:

### 1. Sound Infused Air
The intelligent, responsive atmosphere created when bronze Gamelatron vibrations meet your presence in the sanctuary space.

### 2. Balinese Cosmology
Cultural lineage: Gamelan tradition, Panca Gita, Tri Hita Karana, Sekala & Niskala. Honors Aaron Taylor Kuffner's Gamelatron as translation of living cultural wisdom.

### 3. PING (Arrival Vibration)
Your state of being when entering the sanctuary—the frequency you bring (e.g., curious, scattered, grounded, seeking).

### 4. Verbration
Portmanteau of verb + vibration. Action-state chosen to guide exploration: SENSE, SEE, HEAR, MOVE, TUNE, OPEN, SHIFT.

---

## User Flows

### Self-Guided Flow
1. Click "Contribute to Research" from Baggage Claim
2. Select "Self-Guided Reflection"
3. Review context definitions (optional)
4. Begin cinematic question flow
5. Answer questions sequentially (can skip any)
6. Complete session
7. Export responses (optional)
8. View dashboard (optional)

### Facilitated Flow
1. Click "Contribute to Research" from Baggage Claim
2. Select "Facilitated Interview"
3. Researcher enters their name
4. Review context definitions (optional)
5. Begin cinematic question flow
6. Researcher guides participant through questions
7. Complete session (researcher name attributed)
8. Export responses (optional)
9. View dashboard (optional)

---

## Synthesis Canvas Categories

### 1. Attention & Embodiment
**Source Questions:** Attention Quality, Surprise Element
**Displays:** Scale responses + quotes on how sound shifted awareness

### 2. Connection (Self / Others / Place / Future)
**Source Questions:** Connection Felt + follow-up
**Displays:** Connection words as tags, distribution of connection types

### 3. Cultural Integration
**Source Questions:** Cultural Integration
**Displays:** Quotes on reception of Balinese cosmology and Gamelatron

### 4. Futures Sensemaking
**Source Questions:** Resonance Artifact
**Displays:** Poetic reflections on futures that became tangible

### 5. Desire for Sonic Sanctuaries
**Source Questions:** Future Sanctuary Interest
**Displays:** Distribution (Yes/Maybe/No/Already do), barriers and longings

### 6. Cross-Modal Perception
**Source Questions:** What Became Visible
**Displays:** Language for invisible → perceivable, synesthesia, attunement

### 7. Social Field & Emergence
**Source Questions:** What Wants Nurturing
**Displays:** Insights on collaborations, shared questions, field coherence

### 8. Questions Held by the Field
**Source Questions:** Question Holding
**Displays:** Unanswered questions, future research directions

---

## Export Formats

### Individual Session Export (JSON)
Participant can export their own responses:

```json
{
  "timestamp": "2025-01-20T15:30:00.000Z",
  "mode": "self",
  "researcher": null,
  "responses": { ... }
}
```

Filename: `sanctuary-research-[timestamp].json`

### All Sessions Export (JSON)
Researcher can export complete dataset:

```json
[
  {
    "timestamp": "...",
    "mode": "...",
    "researcher": "...",
    "responses": { ... }
  },
  ...
]
```

Filename: `sanctuary-research-all-[timestamp].json`

### Summary Export (CSV)
Researcher can export flattened summary:

```csv
Session,Timestamp,Mode,Researcher,Attention Quality,Connection,Surprise,...
1,"2025-01-20T15:30:00.000Z","facilitated","Dr. Jane Smith",8,"Yes (grounded)","How quickly...",...
```

Filename: `sanctuary-research-summary-[timestamp].csv`

---

## Technical Implementation

### Files Created

1. **research.html** - Participant experience page
2. **research.js** - Research flow logic and data storage
3. **research-dashboard.html** - Researcher synthesis view
4. **dashboard.js** - Dashboard population and export logic
5. **ei.css** - Styling (research-specific styles added)

### CSS Additions

- `.mode-select-btn` - Mode selection cards
- `.context-card` - Definition preview cards
- `.research-frame` - Cinematic question container
- `.question-input` - Various input styles (scale, radio, textarea)
- `.question-actions` - Next/Skip buttons
- `.dashboard-card` - Dashboard metric cards
- `.synthesis-section` - Synthesis canvas sections

### localStorage Keys

- `ei_research_sessions` - Array of all research sessions

### Dependencies

None. Pure vanilla JavaScript. Reuses existing sanctuary styles and patterns.

---

## Research Ethics

### Data Privacy
- **Local-first:** All data stored in browser localStorage
- **No server:** No backend, no cloud, no third parties
- **User control:** Participant can export or clear data anytime

### Consent & Autonomy
- **Skip any question:** No required fields
- **Clear framing:** Research intention explained upfront
- **Attribution:** Researcher names documented for facilitated sessions

### Cultural Stewardship
- **Lineage honored:** Balinese cosmology presented with attribution
- **Living wisdom:** Gamelan tradition not reduced to dataset
- **Cross-cultural care:** Cultural integration question asks about reception

---

## Sample Data Generation (for Testing)

To test the dashboard with sample data:

```javascript
// In browser console:
const sampleSessions = [
  {
    timestamp: new Date().toISOString(),
    mode: 'self',
    researcher: null,
    responses: {
      attention_quality: '8',
      connection_felt: { selection: 'Yes', followUp: 'grounded' },
      surprise_element: 'The silence between tones held its own intelligence',
      resonance_artifact: 'A sense of spaciousness, like the room expanded',
      future_sanctuary: { selection: 'Yes' },
      stage_of_change: { selection: 'Preparing :: I\'m reflecting on how this applies to my life' },
      became_visible: 'The connection between sound and inner state',
      wants_nurturing: 'More public spaces for contemplative practice',
      question_holding: 'How can we scale sonic sanctuaries to neighborhoods?',
      cultural_integration: 'I felt deep reverence—the bronze has its own voice'
    }
  }
];

localStorage.setItem('ei_research_sessions', JSON.stringify(sampleSessions));
location.reload();
```

---

## Future Enhancements

### Phase 2 (Optional)
- **Visual analytics:** Charts and graphs for patterns
- **Keyword extraction:** Automated theme clustering
- **Field notes generator:** Auto-create 1-page summary for participants
- **Comparative analysis:** Compare sessions by time period or facilitator

### Phase 3 (Advanced)
- **Anonymized sharing:** Export anonymized datasets for wider field
- **Collaborative synthesis:** Allow multiple researchers to annotate
- **Longitudinal tracking:** Follow participants across multiple sessions

---

## Support & Attribution

**Research Framework:** Jero Wiku
**Technical Implementation:** Claude (Anthropic) for 1000 Ways to Arrive
**Sanctuary Experience:** Kamau Zuberi Akabueze, The Alien School
**Gamelatron:** Aaron Taylor Kuffner
**Venue:** Heron Arts, San Francisco

---

## Quick Start

1. **Participant:** Visit `research.html` from sanctuary site
2. **Researcher:** Visit `research-dashboard.html` to view synthesis
3. **Export:** Use dashboard buttons to export JSON or CSV
4. **Clear data:** Use "Clear All Data" button (warning: irreversible)

---

*Let the sanctuary teach you what it wants to say.*
