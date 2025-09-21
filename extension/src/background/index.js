// Background script for Meeting Whisperer Chrome Extension

// Store latest transcript per tab
const transcripts = {};

chrome.runtime.onInstalled.addListener(() => {
  console.log('Meeting Whisperer extension installed.');
});

// Listen for transcript messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'MEETING_WHISPERER_TRANSCRIPT' && sender.tab) {
    transcripts[sender.tab.id] = message.transcript;
  }
});

// Listen for popup requests for latest transcript
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_LATEST_TRANSCRIPT' && sender.tab) {
    sendResponse({ transcript: transcripts[sender.tab.id] || [] });
  }
  // Indicate async response
  return true;
});
