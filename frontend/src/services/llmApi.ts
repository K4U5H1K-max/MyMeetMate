import axios from 'axios';

export interface ActionItem {
  description: string;
  assignee?: string;
}

export interface LLMAnalysisResult {
  action_items: ActionItem[];
  decisions: string[];
  unresolved_questions: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
}

export async function analyzeTranscript(transcript: string): Promise<LLMAnalysisResult> {
  const response = await axios.post('http://127.0.0.1:8000/api/v1/analyze-transcript/', { transcript });
  return response.data;
}
