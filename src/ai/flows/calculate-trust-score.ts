
'use server';

/**
 * @fileOverview AI-powered trust score calculation for crisis alerts.
 *
 * - calculateTrustScore - A function that calculates the trust score of a crisis alert based on confirmations and disputes.
 * - CalculateTrustScoreInput - The input type for the calculateTrustScore function.
 * - CalculateTrustScoreOutput - The return type for the calculateTrustScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CalculateTrustScoreInputSchema = z.object({
  confirmations: z.number().describe('The number of confirmations for the alert.'),
  disputes: z.number().describe('The number of disputes for the alert.'),
  initialScore: z.number().optional().describe('The initial trust score of the alert.'),
});

export type CalculateTrustScoreInput = z.infer<typeof CalculateTrustScoreInputSchema>;

const CalculateTrustScoreOutputSchema = z.object({
  trustScore: z.number().min(0).max(100).describe('The calculated trust score for the alert, as an integer between 0 and 100.'),
  reasoning: z.string().describe('The reasoning behind the calculated trust score.'),
});

export type CalculateTrustScoreOutput = z.infer<typeof CalculateTrustScoreOutputSchema>;

const calculateTrustScorePrompt = ai.definePrompt({
  name: 'calculateTrustScorePrompt',
  input: {schema: CalculateTrustScoreInputSchema},
  output: {schema: CalculateTrustScoreOutputSchema},
  prompt: `You are an AI assistant that calculates the trust score of crisis alerts based on user confirmations and disputes.

You will receive the number of confirmations and disputes for a given alert. Your task is to calculate a trust score as an integer between 0 and 100.

- Start with an initial score of {{initialScore}}. If not provided, assume 50.
- Each confirmation should significantly increase the score, especially at the beginning.
- Each dispute should significantly decrease the score.
- The score should never go below 0 or above 100.
- The final output must be a valid JSON object with 'trustScore' (integer) and 'reasoning' (string).

Alert Data:
- Confirmations: {{{confirmations}}}
- Disputes: {{{disputes}}}

Calculate the new trust score and provide a brief reasoning.
`,
});

const calculateTrustScoreFlow = ai.defineFlow(
  {
    name: 'calculateTrustScoreFlow',
    inputSchema: CalculateTrustScoreInputSchema,
    outputSchema: CalculateTrustScoreOutputSchema,
  },
  async input => {
    const {output} = await calculateTrustScorePrompt(input);
    if (!output) {
      throw new Error("Failed to get a response from the AI model.");
    }
    return output;
  }
);

export async function calculateTrustScore(input: CalculateTrustScoreInput): Promise<CalculateTrustScoreOutput> {
  return calculateTrustScoreFlow(input);
}
