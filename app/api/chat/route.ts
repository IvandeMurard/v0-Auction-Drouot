import { streamText } from "ai"
import { models, prompts } from "@/lib/ai-config"

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Messages array is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Format the conversation history for the AI
    const formattedMessages = messages
      .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n")

    // Create the stream
    const stream = streamText({
      model: models.chatbot,
      prompt: `${prompts.chatbot}\n\nConversation history:\n${formattedMessages}\n\nAssistant:`,
    })

    // Return the stream
    return new Response(stream.toReadableStream())
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response(JSON.stringify({ error: "Failed to process chat message" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
