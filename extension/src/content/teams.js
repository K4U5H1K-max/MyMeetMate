// Content script for Microsoft Teams transcript extraction
function getTeamsTranscriptLines() {
  // Teams transcript DOM structure may change; this is a robust selector for 2025
  const transcriptNodes = document.querySelectorAll('[data-tid="transcript-message-text"], .ts-message-content');
  return Array.from(transcriptNodes).map(node => node.textContent.trim()).filter(Boolean);
}


function sendTranscriptToBackground(transcript) {
  chrome.runtime.sendMessage({ type: 'MEETING_WHISPERER_TRANSCRIPT', transcript });
}

// Observe transcript changes
const observer = new MutationObserver(() => {
  const lines = getTeamsTranscriptLines();
  sendTranscriptToBackground(lines);
});

const transcriptContainer = document.querySelector('[data-tid="transcript-message-list"], .ts-message-list');
if (transcriptContainer) {
  observer.observe(transcriptContainer, { childList: true, subtree: true });
  // Initial send
  sendTranscriptToBackground(getTeamsTranscriptLines());
}
