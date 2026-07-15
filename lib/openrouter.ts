import { CONTEXT_OPTIMIZER_PROMPT } from './prompts';

type Props = {
  rawContent: string;
  apiKey: string;
}

export async function optimizeContext({rawContent, apiKey}: Props) {

  // const emptyPromise = new Promise((resolve) => {
  //                       setTimeout(() => {
  //                           resolve(CONTEXT_OPTIMIZER_PROMPT);
  //                       }, 2000);
  //   });

  //   return emptyPromise;

  const response = await fetch(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
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
    const errorBody = await response.json();

    console.error('OpenRouter Error:', errorBody);

    throw new Error(
      errorBody?.error?.message ??
      "OpenRouter request failed."
    );
  }

  const result = await response.json();

  const content = result?.choices?.[0]?.message?.content;


  return content ?? '';
}
