import { generateText } from "ai"
import { models, prompts } from "@/lib/ai-config"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { itemDetails } = await request.json()

    if (!itemDetails) {
      return NextResponse.json({ error: "Item details are required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: models.priceEstimation,
      prompt: `${prompts.priceEstimation}\n\nItem details:\n${JSON.stringify(itemDetails, null, 2)}`,
    })

    // Parse the JSON response
    let estimation
    try {
      estimation = JSON.parse(text)
    } catch (e) {
      console.error("Failed to parse AI response as JSON:", text)
      return NextResponse.json({ error: "Failed to parse price estimation" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      estimation,
    })
  } catch (error) {
    console.error("Error in price estimation API:", error)
    return NextResponse.json({ error: "Failed to estimate price" }, { status: 500 })
  }
}
