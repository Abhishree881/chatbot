import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: messages[messages.length - 1].content,
        }),
      }
    );
    
    const result = await response.json();
    return Response.json({ result: { content: result[0].generated_text } });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Error processing your request" },
      { status: 400 }
    );
  }
}
