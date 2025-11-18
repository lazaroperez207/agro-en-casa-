
import { GoogleGenAI } from "@google/genai";

// Fix: Per coding guidelines, the API key must be obtained exclusively from `process.env.API_KEY`.
// Assume this variable is pre-configured, valid, and accessible.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRecipes = async (ingredients: string[]): Promise<string> => {
  const prompt = `
    Eres un chef creativo y amigable. Tu tarea es sugerir 2 o 3 recetas sencillas y deliciosas basadas en una lista de ingredientes.

    Ingredientes disponibles: ${ingredients.join(', ')}.

    Por favor, formatea tu respuesta en Markdown. Para cada receta, incluye:
    1.  Un título atractivo para la receta usando un encabezado (ej. '## Ensalada Fresca de Verano').
    2.  Una lista de 'Ingredientes' necesarios (puedes añadir ingredientes comunes como aceite, sal, pimienta).
    3.  Una sección de 'Instrucciones' con los pasos a seguir.

    Sé claro, conciso y asegúrate de que las recetas sean fáciles de seguir para un cocinero principiante.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("No se pudieron generar las recetas. Por favor, inténtalo de nuevo más tarde.");
  }
};
