// Gemini client helper (browser). Requires Vite env var: VITE_GEMINI_API_KEY
// Uses the public REST API for Gemini 1.5/Flash or 1.5/Pro text generation.

export interface GeminiMessage {
  role: 'user' | 'model' | 'system';
  content: string;
}

export async function geminiChat(messages: GeminiMessage[], model = 'gemini-1.5-flash'): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  if (!apiKey) {
    console.warn('VITE_GEMINI_API_KEY is not set. Falling back to mock response.');
    return 'AI is not configured yet. Please set VITE_GEMINI_API_KEY to enable live responses.';
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    })),
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('Gemini error:', text);
    throw new Error('Gemini request failed');
  }

  const data = await res.json();
  const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'I could not generate a response right now.';
  return output as string;
}


