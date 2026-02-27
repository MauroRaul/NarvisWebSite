import { GoogleGenAI } from '@google/genai';

// Inizializza l'SDK con la chiave presa dalle Environment Variables di Vercel
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb', // Permette l'upload di immagini sketch fino a 10MB
        },
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed. Usa POST.' });
    }

    try {
        const { base64Image, mimeType, prompt } = req.body;

        if (!base64Image || !prompt) {
            return res.status(400).json({ error: 'Mancano parametri fondamentali: base64Image o prompt.' });
        }

        // Dividiamo l'intestazione data:image/png;base64, dalla codifica vera e propria
        const actualBase64Data = base64Image.split(',')[1];

        // Costruzione del payload per il modello Google Gemini 2.5 Flash
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                prompt,
                {
                    inlineData: {
                        data: actualBase64Data,
                        mimeType: mimeType || 'image/png'
                    }
                }
            ],
            // Forziamo l'output visivo come richiesto
            config: {
                responseModalities: ["IMAGE"]
            }
        });

        // Estrazione dell'immagine Base64 dalla risposta di Gemini
        const generatedImageData = response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        const generatedMimeType = response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.mimeType;

        if (!generatedImageData) {
            throw new Error("L'API non ha restituito dati immagine validi. Riprova.");
        }

        res.status(200).json({
            image: `data:${generatedMimeType || 'image/jpeg'};base64,${generatedImageData}`
        });

    } catch (error) {
        console.error("Errore Gemini API su Vercel Serverless:", error);
        res.status(500).json({
            error: 'Errore durante la generazione immagine.',
            details: error.message
        });
    }
}
