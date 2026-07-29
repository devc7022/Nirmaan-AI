import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, systemInstruction } = body;

    // Retrieve server-side secret API key from environment variables (e.g. Netlify/Vercel)
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key is missing on the server.' },
        { status: 500 }
      );
    }

    const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];
    let textResult = '';

    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const payload: any = {
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
        };

        if (systemInstruction) {
          payload.systemInstruction = {
            parts: [{ text: systemInstruction }],
          };
        }

        const response = await axios.post(url, payload, {
          headers: { 'Content-Type': 'application/json' },
        });

        const resText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (resText) {
          textResult = resText;
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${model} proxy call failed:`, err?.message);
      }
    }

    if (!textResult) {
      return NextResponse.json(
        { error: 'Failed to generate response from Google AI Studio.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ text: textResult });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Internal AI Server Proxy Error' },
      { status: 500 }
    );
  }
}
