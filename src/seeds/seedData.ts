/* eslint-disable @typescript-eslint/no-explicit-any */
import { Payload } from 'payload'
import { questionsData } from './questionData'
import { seedPageCategories } from './pageData/categoryData'
import { seedPlans } from './planData'
import { seedSegments } from './segmentData'

// Type Definitions
interface QuestionOption {
  label: string
  value: string
  basePoints: number
  segmentScores: {
    minimizer: number
    protector: number
    preventer: number
    manager: number
    loyalist: number
  }
}

interface Question {
  questionText: string
  dimensionId: 'provider' | 'cost' | 'health' | 'prescriptions' | 'benefits'
  questionType: 'rating' | 'multipleChoice' | 'boolean'
  description: string
  options: QuestionOption[]
  order: number
  active: boolean
}

interface SeedResults {
  successful: number
  failed: number
  errors: string[]
}

// Main seed function that gets called from payload.config.ts
export const seed = async (payload: Payload): Promise<void> => {
  console.log('🌱 Starting database seed...')

  try {
    console.log('📌 Checking if questions already exist...')
    const existingQuestions = await payload.find({
      collection: 'questions',
      limit: 0,
    })

    if (existingQuestions.totalDocs > 0) {
      console.log(`🗑️ Found ${existingQuestions.totalDocs} existing questions. Clearing...`)
      await payload.delete({
        collection: 'questions',
        where: {},
      })
      console.log('✅ Existing questions cleared.')
    }

    console.log('🚀 Seeding questions...')
    await seedQuestions(payload)

    console.log('🚀 Seeding plans...')
    await seedPlans(payload)

    console.log('🚀 Seeding Segments...')
    await seedSegments(payload)

    console.log('🚀 Seeding page categories...')
    try {
      await seedPageCategories(payload)
      console.log('✅ Page categories seeded successfully')
    } catch (error) {
      console.error('❌ Error seeding page categories:', error)
    }

    console.log('🌟 Seed completed successfully')
  } catch (error) {
    console.error('❌ Error during seeding process:', error)
    throw error
  }
}

// Function to seed questions
export const seedQuestions = async (payload: Payload): Promise<void> => {
  console.log(`🌱 Starting to seed ${questionsData.length} questions...`)

  const results: SeedResults = {
    successful: 0,
    failed: 0,
    errors: [],
  }

  for (const [index, question] of questionsData.entries()) {
    console.log(`\n[${index + 1}/${questionsData.length}] Seeding question: "${question.questionText}"`)

    try {
      const existing = await payload.find({
        collection: 'questions',
        where: {
          questionText: {
            equals: question.questionText,
          },
        },
      })

      if (existing.totalDocs > 0) {
        console.log(`⚠️ Question "${question.questionText}" already exists. Skipping...`)
        results.successful++
        continue
      }

      if (!validateQuestionData(question)) {
        throw new Error('❌ Question data validation failed')
      }

      const result = await payload.create({
        collection: 'questions',
        data: question,
      })

      console.log(`✅ Successfully created question with ID: ${result.id}`)
      results.successful++
    } catch (error: any) {
      results.failed++
      const errorMessage = `❌ Failed to seed question "${question.questionText}": ${error.message}`
      results.errors.push(errorMessage)
      console.error(errorMessage)
      console.error('🛑 Detailed error info:', error)
    }
  }

  console.log('\n=== ✅ Seeding Complete ===')
  console.log(`📊 Successfully seeded: ${results.successful}/${questionsData.length}`)
  console.log(`📊 Failed: ${results.failed}`)

  if (results.errors.length > 0) {
    console.log('\n📝 Errors:')
    results.errors.forEach((error, index) => console.log(`${index + 1}. ${error}`))
  }

  const verifyCount = await payload.find({
    collection: 'questions',
    limit: 0,
  })

  console.log(`\n📌 Final database state: ${verifyCount.totalDocs} total questions`)
}

// Helper function to validate question data
function validateQuestionData(question: any): question is Question {
  const requiredFields = ['questionText', 'dimensionId', 'questionType', 'options', 'order'] as const

  for (const field of requiredFields) {
    if (!question[field]) {
      console.error(`❌ Missing required field: ${field}`)
      return false
    }
  }

  if (!Array.isArray(question.options) || question.options.length === 0) {
    console.error('❌ Question must have at least one option')
    return false
  }

  for (const option of question.options) {
    if (!option.label || !option.value || typeof option.basePoints !== 'number') {
      console.error('❌ Invalid option structure:', option)
      return false
    }

    const requiredSegments = ['minimizer', 'protector', 'preventer', 'manager', 'loyalist'] as const

    for (const segment of requiredSegments) {
      if (typeof option.segmentScores[segment] !== 'number') {
        console.error(`❌ Missing or invalid segment score for ${segment}`)
        return false
      }
    }
  }

  return true
}
