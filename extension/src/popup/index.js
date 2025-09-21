
async function getLatestTranscript() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: 'GET_LATEST_TRANSCRIPT' }, (response) => {
      resolve(response && response.transcript ? response.transcript : []);
    });
  });
}

async function analyzeTranscript(transcriptLines) {
  if (!transcriptLines || transcriptLines.length === 0) return null;
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/analyze-transcript/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript: transcriptLines.join(' ') })
    });
    if (!response.ok) throw new Error('Backend error');
    return await response.json();
  } catch (e) {
    return null;
  }
}

function formatAnalysis(analysis) {
  if (!analysis) return 'No analysis available.';
  let out = '';
  if (analysis.action_items && analysis.action_items.length) {
    out += 'Action Items:\n';
    analysis.action_items.forEach(item => {
      out += `• ${item.description}`;
      if (item.assignee) out += ` (Assignee: ${item.assignee})`;
      out += '\n';
    });
  }
  if (analysis.decisions && analysis.decisions.length) {
    out += 'Decisions:\n';
    analysis.decisions.forEach(d => { out += `• ${d}\n`; });
  }
  if (analysis.unresolved_questions && analysis.unresolved_questions.length) {
    out += 'Unresolved Questions:\n';
    analysis.unresolved_questions.forEach(q => { out += `• ${q}\n`; });
  }
  if (analysis.sentiment) {
    out += `Sentiment: ${analysis.sentiment}\n`;
  }
  return out.trim();
}

document.getElementById('recapBtn').addEventListener('click', async () => {
  document.getElementById('output').innerText = 'Fetching recap...';
  const transcriptLines = await getLatestTranscript();
  if (!transcriptLines || transcriptLines.length === 0) {
    document.getElementById('output').innerText = 'No transcript found.';
    return;
  }
  const analysis = await analyzeTranscript(transcriptLines);
  document.getElementById('output').innerText = formatAnalysis(analysis);
});
