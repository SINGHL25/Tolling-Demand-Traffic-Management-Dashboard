
import { GoogleGenAI, Type } from "@google/genai";
import type { PredictiveAlert } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function getTrafficPrediction(
    trafficSummary: string,
): Promise<PredictiveAlert[]> {
    const prompt = `
        Based on the following traffic summary, act as an expert ITS analyst and predict potential traffic issues for the next 4 hours.
        Identify high-demand periods, potential congestion points, and any anomalies that might require attention.
        Provide a list of predictive alerts.

        Traffic Summary: ${trafficSummary}
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        alerts: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    id: {
                                        type: Type.STRING,
                                        description: "A unique identifier for the alert."
                                    },
                                    plazaId: {
                                        type: Type.STRING,
                                        description: "The ID of the toll plaza affected (e.g., TP-01, TP-02)."
                                    },
                                    severity: {
                                        type: Type.STRING,
                                        description: "Severity of the alert: Low, Medium, or High."
                                    },
                                    message: {
                                        type: Type.STRING,
                                        description: "A concise, descriptive message about the predicted issue."
                                    },
                                },
                                required: ["id", "plazaId", "severity", "message"],
                            },
                        },
                    },
                },
            },
        });
        
        const jsonText = response.text;
        const result = JSON.parse(jsonText);

        if (result && result.alerts && Array.isArray(result.alerts)) {
            return result.alerts as PredictiveAlert[];
        } else {
             console.error("Parsed JSON does not match expected schema:", result);
             return [];
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get traffic prediction from Gemini.");
    }
}
