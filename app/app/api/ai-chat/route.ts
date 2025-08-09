
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    // Check if AI is configured
    if (!process.env.ABACUSAI_API_KEY) {
      return NextResponse.json(
        { error: 'AI chat is not configured yet. Please contact our support team directly.' },
        { status: 503 }
      )
    }

    const { messages }: { messages: Message[] } = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    // System message for Nature's Way Soil expert
    const systemMessage = {
      role: 'system' as const,
      content: `You are an expert organic gardening and lawn care advisor for Nature's Way Soil, a premium organic fertilizer company. Your expertise includes:

- Organic liquid fertilizers, soil amendments, and plant nutrients
- Diagnosing plant health issues and nutrient deficiencies
- Recommending appropriate organic fertilizer products
- Sustainable gardening practices and soil health
- Hydroponic and traditional growing methods
- Lawn care with organic products
- Application rates and timing for organic fertilizers

Always provide helpful, accurate advice focused on organic and sustainable methods. Reference Nature's Way Soil products when appropriate, but focus primarily on solving the customer's gardening challenges. Be friendly, knowledgeable, and concise in your responses.`
    }

    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [systemMessage, ...messages],
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      }),
    })

    if (!response.ok) {
      console.error('AI API response not ok:', response.status, response.statusText)
      return NextResponse.json(
        { error: 'Failed to get AI response. Please try again.' },
        { status: 500 }
      )
    }

    const data = await response.json()

    if (!data.choices?.[0]?.message?.content) {
      console.error('Invalid AI response structure:', data)
      return NextResponse.json(
        { error: 'Invalid response from AI service' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: data.choices[0].message.content,
      success: true
    })

  } catch (error) {
    console.error('AI chat error:', error)
    return NextResponse.json(
      { error: 'Unable to process your request. Please try again later.' },
      { status: 500 }
    )
  }
}

// Handle GET requests for testing
export async function GET() {
  return NextResponse.json({
    message: 'AI Chat API endpoint is working',
    methods: ['POST']
  })
}
