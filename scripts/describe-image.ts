// Add this near the top of your file
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import { OpenAI } from "openai";
import fs from "fs";

// Initialize OpenAI client with a custom local server and a placeholder API key
const openai = new OpenAI({
  apiKey: "not-needed",
  baseURL: "http://localhost:1234/v1",
});

// Function to get base64-encoded image
async function getBase64Img(image: string): Promise<string> {
  if (image.startsWith("http")) {
    const response = await fetch(image);
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer).toString("base64");
  }

  const file = fs.readFileSync(image);
  return Buffer.from(file).toString("base64");
}

// Create completion request
async function describeImage(imagePathOrUrl: string) {
  const base64Image = await getBase64Img(imagePathOrUrl);

  const completion = await openai.chat.completions.create({
    model: "local-model",
    temperature: 0,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Describe this picture, listing details about the subject's appearance, clothing, physical characteristics, and the setting in which the photo was taken.",
          },
          {
            type: "image_url",
            image_url: { url: `data:image/jpeg;base64,${base64Image}` },
          },
        ],
      },
    ],
    max_tokens: 1000,
  });

  // Handle streaming response
  return completion.choices[0].message.content?.trim() ?? "";
}

async function createProviderDescriptions(count: number) {
  const dataCompletion = await openai.chat.completions.create({
    model: "local-model",
    temperature: 0,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
COMMANDS:
    - Create a valid JSON array with exactly ${count} objects.
    - Don't comment anything, not even inline comments in json.
    - Do not repeat data. e.g., both first and last names should be unique.
    - Fill in the expected output below where fields have the following meanings:
    name: Name (use realistic-sounding names, as opposed to generic last names like "Doe", "Lee", or "Kim")
    description: Self-description for a Therapist that roughly follows these guidelines:

        The first sentence should focus on your role as a therapist, your niche audience, and high-level goals clients can expect to work on. The second and third sentences should talk about your tactile and philosophical approach to reaching those goals. Finally, include a sentence about your personal life, hobbies, or interests to humanize yourself and make you more relatable to potential clients.

    - Answer in the following JSON schema
EXPECTED OUTPUT FORMAT (FILL IN THE ""): (do not wrap the response in quotes or backticks or markdown)
    - [{"name": "", "description": ""}, ...]

            `,
          },
        ],
      },
    ],
    max_tokens: 7500,
  });

  return dataCompletion.choices[0].message.content?.trim() ?? "";
}

import path from "path";

const providerImagesDir = path.join(process.cwd(), "public", "provider-images");
const jpgFiles = fs
  .readdirSync(providerImagesDir)
  .filter((file) => file.toLowerCase().endsWith(".jpg"))
  .map((file) => path.join(providerImagesDir, file));

(async () => {
  const providerImages = jpgFiles;

  // const descriptions = await createProviderDescriptions(providerImages.length);

  // const providers = JSON.parse(
  //   descriptions
  //     .replace("\n", "")
  //     .replace(/[^\[]*/m, "[")
  //     .replace(/[^\]]*$/m, "]")
  // );

  let i = 0;
  for (const path of providerImages) {
    const imageDescription = await describeImage(path);

    console.log({ path, imageDescription });

    // await createProvider({
    //   name: providers[i].name,
    //   description: providers[i].description,
    //   imageUrl: path,
    //   imageDescription,
    // });

    // console.log(`Created: ${providers[i].name}`);
  }
})();
