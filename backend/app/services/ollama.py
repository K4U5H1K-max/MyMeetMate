import httpx
from app.core.config import settings
from app.schemas.transcript import TranscriptRequest, TranscriptResponse, ActionItem
from typing import List
import re
import json

PROMPT_TEMPLATE = """
You are an AI meeting assistant. Analyze the following meeting transcript and extract:
- Action items (with assignees if possible)
- Decisions
- Unresolved questions
- Overall meeting sentiment (positive/neutral/negative)

Return your answer as JSON in this format:
{{
  \"action_items\": [{{\"description\": str, \"assignee\": str|null}}],
  \"decisions\": [str],
  \"unresolved_questions\": [str],
  \"sentiment\": \"positive\"|\"neutral\"|\"negative\"
}}

Transcript:
{transcript}
"""

async def analyze_transcript(payload: TranscriptRequest) -> TranscriptResponse:
    print("=== analyze_transcript CALLED ===", flush=True)
    try:
        print("=== BEFORE PROMPT FORMAT ===", flush=True)
        prompt = PROMPT_TEMPLATE.format(transcript=payload.transcript)
        print("=== AFTER PROMPT FORMAT ===", flush=True)
    except Exception as e:
        print(f"=== PROMPT FORMAT ERROR: {e}", flush=True)
        return TranscriptResponse(
            action_items=[],
            decisions=[],
            unresolved_questions=[f"Prompt format error: {str(e)}"],
            sentiment="neutral"
        )
    try:
        print("=== BEFORE HTTPX CLIENT ===", flush=True)
        async with httpx.AsyncClient() as client:
            print("=== BEFORE POST TO OLLAMA ===", flush=True)
            response = await client.post(
                f"{settings.OLLAMA_URL}/api/generate",
                json={
                    "model": "mistral",
                    "prompt": prompt,
                    "stream": False
                },
                timeout=60
            )
            print("=== AFTER POST TO OLLAMA ===", flush=True)
            response.raise_for_status()
            data = response.json()
            llm_output = data.get('response', '')
            print("\n===== RAW LLM OUTPUT =====\n" + llm_output + "\n========================\n", flush=True)
            match = re.search(r'\{[\s\S]*\}', llm_output)
            if not match:
                print("No JSON found in LLM output!", flush=True)
                raise ValueError(f"No JSON found in LLM output: {llm_output}")
            try:
                parsed = json.loads(match.group(0))
            except Exception as json_err:
                print(f"JSON parsing error: {json_err}", flush=True)
                raise ValueError(f"JSON parsing error: {json_err}\nRaw output: {llm_output}")
            action_items = [ActionItem(**ai) for ai in parsed.get('action_items', [])]
            print("=== LLM PARSE SUCCESS ===", flush=True)
            return TranscriptResponse(
                action_items=action_items,
                decisions=parsed.get('decisions', []),
                unresolved_questions=parsed.get('unresolved_questions', []),
                sentiment=parsed.get('sentiment', 'neutral')
            )
    except Exception as e:
        print(f"=== LLM ERROR: {e}", flush=True)
        return TranscriptResponse(
            action_items=[],
            decisions=[],
            unresolved_questions=[f"LLM error: {str(e)}"],
            sentiment="neutral"
        )
