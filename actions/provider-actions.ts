"use server";

import { revalidatePath } from "next/cache";
import {
  getProviderById,
  listProviders,
  createProvider as queryCreateProvider,
  updateProvider as queryUpdateProvider,
  deleteProvider as queryDeleteProvider,
  getProvidersById,
} from "@/db/queries/provider-queries";
import { InsertProvider, SelectProvider } from "@/db/schema";
import OpenAI from "openai";
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: "not-needed",
  baseURL: "http://localhost:1234/v1",
  timeout: 600000, // 10 minutes in milliseconds
});

export async function getProvider(id: string) {
  return getProviderById(id);
}

export async function getAllProviders() {
  return listProviders();
}

function getPrompt(providerInfo: string, criteria: string) {
  return `
#CONTEXT: Adopt the role of a highly specialized AI for processing and filtering a list of service providers. You will be given a list of providers, each including a provider ID, an image description, and a profile. Your task is to filter the list and return only the provider IDs that match a specific user-provided criteria based on their image description or profile.

#GOAL: You will filter through the list of providers and return only the IDs of those who match the user-provided criteria. The criteria will be specific to the visual content or context within the image description (e.g., “wearing blue clothes”) or related to the provider's profile (e.g., “licensed acupuncturist”).

#RESPONSE GUIDELINES: You will follow a step-by-step approach below:

- Review the list of providers containing their ID, image description, and profile.
- Analyze the user-provided criteria carefully to understand what you are filtering for.
- Scan the image description to check if it matches the given criteria.
- If no match is found in the image description, check the provider's profile for relevant keywords or context that could match the criteria.
- Collect all provider IDs that meet the criteria.
- Return the filtered list of provider IDs only.
- DO NOT WRITE CODE. Provide only the filtered provider IDs.
- If the request provides only two providers, return the one that best matches the criteria.

#INFORMATION TO ANALYZE:

List of providers: ${providerInfo}

User-provided criteria: return the providers that ${criteria}

#OUTPUT: You will return only the provider IDs that meet the criteria in a list format, without additional details. Ensure the output is clear and only contains relevant IDs.
`;
}

function getPrompt2(providerInfo: string, criteria: string) {
  return `
Given the following map of providerId to Provider information:

${providerInfo}

Filter the providers based on this criteria: "${criteria}"

Rules:
1. Analyze the provider descriptions and image descriptions.
2. Determine which providers best match the given criteria.
3. Return only the providerId for those that match the criteria.
`;
}

export async function filterProviders(
  criteria: string,
  providerIds: SelectProvider["id"][]
): Promise<SelectProvider["id"][]> {
  try {
    // Fetch provider information for the given ids
    const providers = await getProvidersById(Array.from(new Set(providerIds)));

    // Compose the prompt
    const providerInfo = providers
      .map(
        (p) =>
          `- providerId: ${p.id}
  image description: ${p.imageDescription}
  profile: ${p.description}`
      )
      .join("\n");

    const prompt = getPrompt(providerInfo, criteria);

    // Use OpenAI to process the filtering
    const completion = await openai.chat.completions.create({
      model: "local-model",
      temperature: 0,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2500,
    });

    // Parse the response and extract the matching provider IDs
    const responseContent = completion.choices[0].message.content;
    const ids =
      responseContent?.match(/[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}/g) ||
      [];
    console.log({ responseContent, ids });

    // Ensure all returned IDs are valid (exist in the original providerIds array)
    return ids;
  } catch (error) {
    console.error("Error in filterProviders:", error);
    throw error;
  }
}

export async function createProvider(provider: InsertProvider) {
  await queryCreateProvider(provider);
  revalidatePath("/providers");
}

export async function updateProvider(
  id: string,
  provider: Partial<InsertProvider>
) {
  await queryUpdateProvider(id, provider);
  revalidatePath("/providers");
}

export async function deleteProvider(id: string) {
  await queryDeleteProvider(id);
  revalidatePath("/providers");
}
