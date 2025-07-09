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
  trustScore: z.number().describe('The calculated trust score for the alert.'),
  reasoning: z.string().describe('The reasoning behind the calculated trust score.'),
});

export type CalculateTrustScoreOutput = z.infer<typeof CalculateTrustScoreOutputSchema>;

export async function calculateTrustScore(input: CalculateTrustScoreInput): Promise<CalculateTrustScoreOutput> {
  return calculateTrustScoreFlow(input);
}

const calculateTrustScorePrompt = ai.definePrompt({
  name: 'calculateTrustScorePrompt',
  input: {schema: CalculateTrustScoreInputSchema},
  output: {schema: CalculateTrustScoreOutputSchema},
  prompt: `You are an AI assistant that calculates the trust score of crisis alerts based on user confirmations and disputes.

You will receive the number of confirmations and disputes for a given alert.
Your task is to calculate a trust score based on these values.

Consider an initial score of {{{initialScore}}} if provided. A confirmation should increase the score and a dispute should decrease it.

Confirmations: {{{confirmations}}}
Disputes: {{{disputes}}}

Please provide a final trust score and reasoning for the score.
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
    return output!;
  }
);
