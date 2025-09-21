// Content script for Google Meet transcript extraction
function getTranscriptLines() {
  // Google Meet transcript DOM structure may change; this is a robust selector for 2025
  const transcriptNodes = document.querySelectorAll('[data-self-name] .GDhqjd');
  return Array.from(transcriptNodes).map(node => node.textContent.trim()).filter(Boolean);
}


function sendTranscriptToBackground(transcript) {
  chrome.runtime.sendMessage({ type: 'MEETING_WHISPERER_TRANSCRIPT', transcript });
}

// Observe transcript changes
const observer = new MutationObserver(() => {
  const lines = getTranscriptLines();
  sendTranscriptToBackground(lines);
});

const transcriptContainer = document.querySelector('[data-self-name]');
if (transcriptContainer) {
  observer.observe(transcriptContainer, { childList: true, subtree: true });
  // Initial send
  sendTranscriptToBackground(getTranscriptLines());
}
