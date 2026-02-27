// Vercel Serverless Function - Gemini API Proxy
// Usa fetch nativo di Node.js 18+, zero dipendenze npm!

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY non configurata su Vercel.' });
    }

    try {
        const { base64Image, mimeType, prompt } = req.body;

        if (!base64Image || !prompt) {
            return res.status(400).json({ error: 'Parametri mancanti: base64Image o prompt.' });
        }

        // Rimuovi eventuale intestazione "data:image/...;base64," se presente
        const cleanBase64 = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;

        const styledPrompt = `Trasforma questo sketch in un capolavoro digital art ultra dettagliato. Stile: ${prompt}. Mantieni la composizione originale ma renderizzala in modo cinematico, con luci drammatiche e colori ricchi. Ultra HD, altissima qualità.`;

        const geminiPayload = {
            contents: [
                {
                    parts: [
                        { text: styledPrompt },
                        {
                            inline_data: {
                                mime_type: mimeType || 'image/png',
                                data: cleanBase64
                            }
                        }
                    ]
                }
            ],
            generationConfig: {
                responseModalities: ["IMAGE", "TEXT"]
            }
        };

        const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Referer': 'https://narvis.it/'
                },
                body: JSON.stringify(geminiPayload)
            }
        );

        const geminiData = await geminiRes.json();

        if (!geminiRes.ok) {
            throw new Error(geminiData.error?.message || 'Errore API Gemini');
        }

        // Cerca l'immagine nella risposta
        let imageData = null;
        let imageMime = 'image/jpeg';

        for (const part of geminiData?.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData || part.inline_data) {
                const dataObj = part.inlineData || part.inline_data;
                imageData = dataObj.data;
                imageMime = dataObj.mimeType || dataObj.mime_type || 'image/jpeg';
                break;
            }
        }

        if (!imageData) {
            throw new Error('Nessuna immagine generata dalla API. Modifica il prompt e riprova.');
        }

        res.status(200).json({
            image: `data:${imageMime};base64,${imageData}`
        });

    } catch (error) {
        console.error('Errore Gemini:', error);
        res.status(500).json({ error: error.message });
    }
}
