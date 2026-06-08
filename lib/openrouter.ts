import { CONTEXT_OPTIMIZER_PROMPT } from './prompts';

export async function optimizeContext(rawContent: string) {
  console.log('Model:', process.env.OPENROUTER_MODEL);

  console.log('Has API Key:', !!process.env.OPENROUTER_API_KEY);
  const emptyPromise = new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(CONTEXT_OPTIMIZER_PROMPT);
                        }, 2000);
    });

    return emptyPromise;

  const response = await fetch(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL,
        messages: [
          { role: 'system', content: CONTEXT_OPTIMIZER_PROMPT },
          { role: 'user', content: rawContent }
        ]
      })
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();

    console.error('OpenRouter Error:', errorBody);

    throw new Error(errorBody);
  }

  const result = await response.json();
  console.log('OpenRouter response', JSON.stringify(result, null, 2));

  const content = result?.choices?.[0]?.message?.content;
  console.log({
    promptTokens: result.usage?.prompt_tokens,
    completionTokens: result.usage?.completion_tokens,
    totalTokens: result.usage?.total_tokens,
    cost: result.usage?.cost
  });

  console.log('CONTENT:', content);

  return content ?? '';
}
