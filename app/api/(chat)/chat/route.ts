import { handleApiError } from "@/src/utils/api/handle-api-error";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const result = streamText({
      model: openai("gpt-4o"),
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
