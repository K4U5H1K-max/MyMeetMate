// Content script for Zoom transcript extraction
function getZoomTranscriptLines() {
  // Zoom transcript DOM structure may change; this is a robust selector for 2025
  const transcriptNodes = document.querySelectorAll('.chat-item__chat-info-line, .wc-message-text');
  return Array.from(transcriptNodes).map(node => node.textContent.trim()).filter(Boolean);
}


function sendTranscriptToBackground(transcript) {
  chrome.runtime.sendMessage({ type: 'MEETING_WHISPERER_TRANSCRIPT', transcript });
}

// Observe transcript changes
const observer = new MutationObserver(() => {
  const lines = getZoomTranscriptLines();
  sendTranscriptToBackground(lines);
});

const transcriptContainer = document.querySelector('.chat-container, .wc-message-list');
if (transcriptContainer) {
  observer.observe(transcriptContainer, { childList: true, subtree: true });
  // Initial send
  sendTranscriptToBackground(getZoomTranscriptLines());
}
