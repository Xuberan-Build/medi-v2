import { Payload } from 'payload'
import { questionsData } from './questionData'
import { seedPageCategories } from './pageData/categoryData'

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
  console.log('Starting database seed...')
  try {
    // Check for existing questions
    const existingQuestions = await payload.find({
      collection: 'questions',
      limit: 0,
    })

    // Clear existing questions if any exist
    if (existingQuestions.totalDocs > 0) {
      console.log(`Found ${existingQuestions.totalDocs} existing questions. Clearing...`)
      await payload.delete({
        collection: 'questions',
        where: {},
      })
      console.log('Existing questions cleared.')
    }

    // Seed questions first
    await seedQuestions(payload)

    // Then seed page categories
    try {
      await seedPageCategories(payload)
      console.log('Page categories seeded successfully')
    } catch (pageError) {
      console.error('Error seeding page categories:', pageError)
      // Continue execution even if page category seeding fails
    }

    console.log('Seed completed successfully')
  } catch (error) {
    console.error('Error in seed process:', error)
    throw error
  }
}

// Function to seed questions
export const seedQuestions = async (payload: Payload): Promise<void> => {
  try {
    console.log(`Starting to seed ${questionsData.length} questions...`)

    const results: SeedResults = {
      successful: 0,
      failed: 0,
      errors: [],
    }

    // Seed each question with detailed logging
    for (const [index, question] of questionsData.entries()) {
      console.log(
        `\n[${index + 1}/${questionsData.length}] Attempting to seed question: "${question.questionText}"`,
      )

      try {
        // Check if question already exists
        const existing = await payload.find({
          collection: 'questions',
          where: {
            questionText: {
              equals: question.questionText,
            },
          },
        })

        if (existing.totalDocs > 0) {
          console.log(`Question "${question.questionText}" already exists, skipping...`)
          results.successful++
          continue
        }

        // Validate the question data before trying to create it
        if (!validateQuestionData(question)) {
          throw new Error('Question data validation failed')
        }

        // Try to create the question
        const result = await payload.create({
          collection: 'questions',
          data: question,
        })

        console.log(`✓ Successfully created question with ID: ${result.id}`)
        results.successful++
      } catch (err: any) {
        results.failed++
        const errorMessage = `Failed to seed question "${question.questionText}": ${err.message}`
        results.errors.push(errorMessage)
        console.error('✗', errorMessage)

        // Log detailed error information for debugging
        console.error('Detailed error:', {
          questionData: question,
          errorDetails: err.details || err.errors || err,
        })
      }
    }

    // Final status report
    console.log('\n=== Seeding Complete ===')
    console.log(`Successfully seeded: ${results.successful}/${questionsData.length}`)
    console.log(`Failed: ${results.failed}`)

    if (results.errors.length > 0) {
      console.log('\nErrors encountered:')
      results.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error}`)
      })
    }

    // Verify final state
    const verifyCount = await payload.find({
      collection: 'questions',
      limit: 0,
    })

    console.log(`\nFinal database state: ${verifyCount.totalDocs} total questions`)
  } catch (error) {
    console.error('Fatal error in seed process:', error)
    throw error
  }
}

// Helper function to validate question data
function validateQuestionData(question: any): question is Question {
  // Check required fields
  const requiredFields = [
    'questionText',
    'dimensionId',
    'questionType',
    'options',
    'order',
  ] as const
  for (const field of requiredFields) {
    if (!question[field]) {
      console.error(`Missing required field: ${field}`)
      return false
    }
  }

  // Validate options
  if (!Array.isArray(question.options) || question.options.length === 0) {
    console.error('Question must have at least one option')
    return false
  }

  // Validate each option
  for (const option of question.options) {
    if (!option.label || !option.value || typeof option.basePoints !== 'number') {
      console.error('Invalid option structure:', option)
      return false
    }

    // Validate segment scores
    const requiredSegments = ['minimizer', 'protector', 'preventer', 'manager', 'loyalist'] as const
    for (const segment of requiredSegments) {
      if (typeof option.segmentScores[segment] !== 'number') {
        console.error(`Missing or invalid segment score for ${segment}`)
        return false
      }
    }
  }

  return true
}
