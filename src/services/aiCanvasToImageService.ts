import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with API keys
const genAI = new GoogleGenerativeAI("AIzaSyB3WGC_mitL3o_uHyFhASPrO5RhvbV9LEI");

// Store multiple ImagePig API keys to alternate between them
const IMAGEPIG_API_KEYS = [
  "9c670150-ced2-4e4a-a657-41f11b44c4f3",
  "659d3d2a-552a-4a72-a546-bb6090468d06",
  "aa8d0b3f-5521-4f24-9362-5c002a0b4aad",
  "b4007be6-b260-41ed-bd59-54729705c6c0"
];
// Meshy api key: msy_WuVvmh8yEiENdpG5bIx1KMuY1eVOOaGbxvGt
// Counter to track which API key to use
let apiKeyIndex = 0;

// Function to get the next API key in rotation
const getNextApiKey = () => {
  const key = IMAGEPIG_API_KEYS[apiKeyIndex];
  // Move to next key for next request (with wraparound)
  apiKeyIndex = (apiKeyIndex + 1) % IMAGEPIG_API_KEYS.length;
  return key;
};

/**
 * Generates an image based on the canvas drawing and optional user prompt
 * 1. Analyzes canvas using Gemini to create a detailed image generation prompt
 * 2. Sends that prompt to ImagePig API to generate the actual image
 */
export const generateImageFromCanvas = async (
  imageData: string,
  userPrompt: string = ""
): Promise<{
  success: boolean;
  message: string;
  imageUrl?: string; 
  generatedPrompt?: string;
  imageBase64?: string;
}> => {
  try {
    // STEP 1: Generate prompt using Gemini
    const prompt = await generatePromptFromCanvas(imageData, userPrompt);
    
    if (!prompt || prompt.startsWith("Error")) {
      return {
        success: false,
        message: prompt || "Failed to generate image prompt"
      };
    }
    
    console.log("Generated prompt:", prompt);
    
    // STEP 2: Generate image using ImagePig API
    const imageResult = await generateImageWithImagePig(prompt);
    
    if (!imageResult.success) {
      return imageResult;
    }
    
    return {
      success: true,
      message: "Image generated successfully!",
      imageUrl: imageResult.imageUrl,
      imageBase64: imageResult.imageBase64,
      generatedPrompt: prompt
    };
    
  } catch (error: any) {
    console.error('Error in image generation process:', error);
    return {
      success: false,
      message: "Error generating image: " + (error?.message || "Unknown error")
    };
  }
};

/**
 * Uses Gemini to analyze the canvas and generate an image prompt
 */
const generatePromptFromCanvas = async (
  imageData: string,
  userPrompt: string = ""
): Promise<string> => {
  try {
    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Extract base64 data
    const imageBase64 = imageData.split(',')[1];
    
    // Prepare image data
    const imageFileData = {
      inlineData: {
        data: imageBase64,
        mimeType: "image/jpeg"
      }
    };

    // Create a system prompt for generating image prompts
    const systemPrompt = 
  "You are an expert in text-to-image prompt engineering. " +
  "Carefully analyze the uploaded sketch or drawing and create a concise, detailed prompt that will generate a high-quality, fully detailed, full-sized image that closely resembles and refines the sketch. " +
  "Your goal is to turn the sketch into a realistic or artistic version while preserving its original layout, subject, and composition. " +
  "IMPORTANT: Prioritize the user’s exact requests and guidance where given, and treat them as mandatory. " +
  "Focus on style, subject, composition, colors, mood, and completeness. " +
  "Do NOT let the image appear cropped, incomplete, or different in structure from the sketch. " +
  "Limit the output to 75 words, and return only the generation prompt without any extra text or explanation.";


    // Create the inputs array - include user prompt if provided
    const inputs = userPrompt 
      ? [systemPrompt, `The user has provided this specific request: "${userPrompt}" - Make sure to incorporate these requirements prominently in your prompt along with the sketch.`, imageFileData]
      : [systemPrompt, imageFileData];

    // Generate the prompt
    const result = await model.generateContent(inputs);
    const generatedPrompt = await result.response.text().trim();
    
    return generatedPrompt;
    
  } catch (error: any) {
    console.error('Error generating prompt from canvas:', error);
    return "Error generating image prompt: " + (error?.message || "Unknown error");
  }
};

/**
 * Calls ImagePig API to generate an image from a prompt
 * Uses alternating API keys to avoid rate limits
 */
const generateImageWithImagePig = async (prompt: string): Promise<{
  success: boolean;
  message: string;
  imageUrl?: string;
  imageBase64?: string;
}> => {
  try {
    // Get the next API key in rotation
    const apiKey = getNextApiKey();
    console.log(`Using API key index: ${apiKeyIndex === 0 ? IMAGEPIG_API_KEYS.length - 1 : apiKeyIndex - 1}`);
    
    // Call the ImagePig API
    const response = await fetch('https://api.imagepig.com/xl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': apiKey
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      // If we get a rate limit error, try with the next key immediately
      if (response.status === 429) {
        console.log("Rate limit hit, trying with next API key...");
        // Use the next key
        const nextApiKey = getNextApiKey();
        
        const retryResponse = await fetch('https://api.imagepig.com/xl', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Api-Key': nextApiKey
          },
          body: JSON.stringify({ prompt })
        });
        
        if (!retryResponse.ok) {
          throw new Error(`ImagePig API error on retry: ${retryResponse.status} - ${await retryResponse.text()}`);
        }
        
        const retryData = await retryResponse.json();
        if (retryData.image_data) {
          const imageBase64 = retryData.image_data;
          const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
          
          return {
            success: true,
            message: "Image generated successfully (retry)",
            imageUrl,
            imageBase64
          };
        }
      }
      
      throw new Error(`ImagePig API error: ${response.status} - ${await response.text()}`);
    }

    const data = await response.json();
    
    // The API returns base64 image data
    if (data.image_data) {
      // For browser display, we need to create a data URL
      const imageBase64 = data.image_data;
      const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
      
      return {
        success: true,
        message: "Image generated successfully",
        imageUrl,
        imageBase64
      };
    } else {
      throw new Error("No image data in the response");
    }
    
  } catch (error: any) {
    console.error('Error calling ImagePig API:', error);
    
    // For development, use a placeholder image if API call fails
    const placeholderId = Date.now().toString();
    return {
      success: false,
      message: "Error from image API: " + (error?.message || "Unknown error"),
      imageUrl: `https://picsum.photos/seed/${placeholderId}/800/600` // Fallback placeholder
    };
  }
}; 