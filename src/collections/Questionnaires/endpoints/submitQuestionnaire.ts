/* eslint-disable @typescript-eslint/no-explicit-any */
///Users/Worker/plan-it/medi-planit/src/collections/Questionnaires/endpoints/submitQuestionnaire.ts
import { type Endpoint, type PayloadHandler } from 'payload'
import type { Request } from 'express'
import { NextResponse } from 'next/server'

interface QuestionnaireData {
  responses: {
    doctor_choice: { value: number; comments?: string }
    managed_care: { value: number; comments?: string }
    domestic_travel: { value: number; comments?: string }
    yearly_maximums: { value: number; comments?: string }
    monthly_premiums: { value: number; comments?: string }
    prescription_plans: { value: number; comments?: string }
    dental_vision: { value: number; comments?: string }
    email: string
    name: string
    city: string
    state: string
    phone_number: string
  }
  status?: 'started' | 'completed'
}

const handler: PayloadHandler = async (...args: any[]): Promise<Response> => {
  const [req] = args as [Request & { payload: any }]
  console.log('Received body:', req.body)

  let body: any

  // If req.body is a ReadableStream, read its text.
  if (req.body && typeof (req.body as any).getReader === 'function') {
    const text = await new Response(req.body).text()
    try {
      body = JSON.parse(text)
    } catch (err) {
      return NextResponse.json({ error: `Invalid JSON ${err}` }, { status: 400 })
    }
  } else if (typeof req.body === 'string') {
    try {
      body = JSON.parse(req.body)
    } catch (err) {
      return NextResponse.json({ error: `Invalid JSON ${err}` }, { status: 400 })
    }
  } else {
    body = req.body || {}
  }

  if (!body.responses) {
    return NextResponse.json({ error: 'Missing responses field' }, { status: 400 })
  }

  const { responses } = body as QuestionnaireData
  const status = body.status ?? 'started'

  try {
    const submission = await req.payload.create({
      collection: 'Questionnaires',
      data: {
        responses,
        status,
        submittedAt: new Date(),
      },
    })
    return NextResponse.json(submission, { status: 201 })
  } catch (error) {
    req.payload.logger.error(`Error submitting questionnaire: ${error}`)
    return NextResponse.json(
      {
        error: 'Failed to submit questionnaire',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export const submitQuestionnaire: Endpoint = {
  path: '/submit',
  method: 'post' as const,
  handler,
}
