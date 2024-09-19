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
You're a tester who needs random data to seed a database.
- You need a valid JSON payload of data.
- the response should be an array of objects with ${count} items.

COMMANDS:
    - Don't comment anything, not even inline comments in json.
    - Fill in the expected output below where fields have the following meanings:
    name: Name of the Therapist
    description: Description to be used on a website, that roughly follows these guidelines, but should be a few sentences long:
        Follow these guidelines:
        Write in the first-person point of view
        Consider using first-person language to appeal to your website visitors on a more personal level. Third-person can read awkward and overly academic, especially for people who may be in a vulnerable position trying to ask for help.

        The first sentence should focus on your role, your niche audience, and high-level goals clients can expect to work on.

        Your second and third sentences should talk about your tactile and philosophical approach to reaching those goals.

        Any work you do outside of the clinical—like speaking engagements or workshops—should be included in a separate paragraph to reinforce a clear distinction from in-session work.

        Keep it concise
        All of this said, you should keep your website therapist bio to be no longer than three sentences. Run-on sentences don’t count—that’ll help keep your bio short and snappy.
    - Answer in the following JSON schema
EXPECTED OUTPUT FORMAT (FILL IN THE ""):
    - [{"name": "", "description": ""}, ...]

            `,
          },
        ],
      },
    ],
    max_tokens: 1000,
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
  const providerImages = jpgFiles.splice(0, 2);
  for (const path of providerImages) {
    const imageDescription = await describeImage(path);

    console.log(
      `\n\n-----\n\nImage: ${path}\nImage Description: ${imageDescription}`
    );
  }

  const descriptions = await createProviderDescriptions(providerImages.length);

  console.log("\n\n-----\n\nProvider Descriptions:\n", descriptions);
})();
