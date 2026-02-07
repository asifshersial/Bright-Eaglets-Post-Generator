import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateUrduQuote = async (topic: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, inspirational quote in Urdu about "${topic}". 
      The quote should be profound, modern, and suitable for a professional social media post. 
      Do not include English translation, only return the Urdu text.
      Keep it under 25 words.`,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating quote:", error);
    throw new Error("Failed to generate quote. Please check your API key.");
  }
};
