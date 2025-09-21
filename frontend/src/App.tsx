import React from 'react';
import ActionItemsList from './components/ActionItemsList';
import LiveTranscriptSidebar from './components/LiveTranscriptSidebar';
import InstantRecapCard from './components/InstantRecapCard';
import MoodTimeline from './components/MoodTimeline';
import ExportPanel from './components/ExportPanel';
import { analyzeTranscript, LLMAnalysisResult } from './services/llmApi';

const mockTranscript = [
  'Alice: Let’s review the Q3 roadmap.',
  'Bob: I’ll take the action item to update the deck.',
  'Carol: Decision: Move launch to October.',
  'Dave: What about the unresolved bug in login?',
];

function App() {
  const [transcript, setTranscript] = React.useState<string[]>(mockTranscript);
  const [analysis, setAnalysis] = React.useState<LLMAnalysisResult | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Listen for transcript messages from Chrome extension
  React.useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data && event.data.type === 'MEETING_WHISPERER_TRANSCRIPT' && Array.isArray(event.data.transcript)) {
        setTranscript(event.data.transcript);
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Automatically analyze transcript when it changes and is non-empty
  React.useEffect(() => {
    const joined = transcript.join('\n');
    if (joined.trim().length === 0) return;
    setLoading(true);
    setError(null);
    analyzeTranscript(joined)
      .then(setAnalysis)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [transcript]);

  // Map backend action items to include completed: false for UI
  const actionItems = (analysis?.action_items || []).map(item => ({ ...item, completed: false }));

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <LiveTranscriptSidebar transcript={transcript} />
      <main className="flex-1 p-8 space-y-6">
        {loading && <div className="text-blue-500">Analyzing transcript...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {analysis && <InstantRecapCard summary={
          [
            ...analysis.decisions.map(d => `• ${d}`),
            ...analysis.action_items.map(a => `• ${a.description}${a.assignee ? ' (' + a.assignee + ')' : ''}`),
            ...analysis.unresolved_questions.map(q => `• Unresolved: ${q}`)
          ].join('\n')
        } />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActionItemsList items={actionItems} onToggle={() => {}} />
          <MoodTimeline timeline={analysis ? [{ time: 'Now', sentiment: analysis.sentiment }] : []} />
        </div>
        <ExportPanel onExport={() => {}} loading={false} />
      </main>
    </div>
  );
}

export default App;
