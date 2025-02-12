//seedData.ts
import { Payload } from 'payload'

// Type Definitions
interface QuestionOption {
  label: string;
  value: string;
  basePoints: number;
  segmentScores: {
    minimizer: number;
    protector: number;
    preventer: number;
    manager: number;
    loyalist: number;
  };
}

interface Question {
  questionText: string;
  dimensionId: 'provider' | 'cost' | 'health' | 'prescriptions' | 'benefits';
  questionType: 'rating' | 'multipleChoice' | 'boolean';
  description: string;
  options: QuestionOption[];
  order: number;
  active: boolean;
}

// Question Data
export const questionsData: Question[] = [
  {
    questionText: 'How important is keeping your current doctors?',
    dimensionId: 'provider',
    questionType: 'rating',
    description: 'Consider how attached you are to your current healthcare providers',
    options: [
      {
        label: 'Must keep current doctors',
        value: '5',
        basePoints: 5,
        segmentScores: {
          minimizer: 1,
          protector: 5,
          preventer: 3,
          manager: 4,
          loyalist: 5
        }
      },
      {
        label: 'Prefer to keep but flexible',
        value: '4',
        basePoints: 4,
        segmentScores: {
          minimizer: 2,
          protector: 4,
          preventer: 4,
          manager: 4,
          loyalist: 4
        }
      },
      {
        label: 'Open to new doctors',
        value: '3',
        basePoints: 3,
        segmentScores: {
          minimizer: 4,
          protector: 2,
          preventer: 3,
          manager: 3,
          loyalist: 2
        }
      }
    ],
    order: 1,
    active: true
  },
  {
    questionText: 'How do you feel about monthly premiums vs. out-of-pocket costs?',
    dimensionId: 'cost',
    questionType: 'rating',
    description: 'Consider your preference for predictable monthly costs versus variable costs when you receive care',
    options: [
      {
        label: 'Prefer higher premium, lower out-of-pocket',
        value: '5',
        basePoints: 5,
        segmentScores: {
          minimizer: 1,
          protector: 5,
          preventer: 4,
          manager: 3,
          loyalist: 5
        }
      },
      {
        label: 'Balanced approach',
        value: '3',
        basePoints: 3,
        segmentScores: {
          minimizer: 3,
          protector: 3,
          preventer: 3,
          manager: 3,
          loyalist: 3
        }
      },
      {
        label: 'Prefer lower premium, higher out-of-pocket',
        value: '1',
        basePoints: 1,
        segmentScores: {
          minimizer: 5,
          protector: 1,
          preventer: 2,
          manager: 4,
          loyalist: 1
        }
      }
    ],
    order: 2,
    active: true
  },
  // Add these questions to your existing questionsData array in src/seeds/questionData.ts

  {
    questionText: 'How do you feel about referrals for specialists?',
    dimensionId: 'provider',
    questionType: 'rating',
    description: 'Consider your preference for accessing specialist care',
    options: [
      {
        label: 'Prefer direct access to specialists',
        value: '5',
        basePoints: 5,
        segmentScores: {
          minimizer: 2,
          protector: 5,
          preventer: 4,
          manager: 3,
          loyalist: 5
        }
      },
      {
        label: 'OK with referrals from primary doctor',
        value: '3',
        basePoints: 3,
        segmentScores: {
          minimizer: 4,
          protector: 3,
          preventer: 3,
          manager: 4,
          loyalist: 3
        }
      },
      {
        label: 'No preference',
        value: '1',
        basePoints: 1,
        segmentScores: {
          minimizer: 3,
          protector: 2,
          preventer: 3,
          manager: 3,
          loyalist: 2
        }
      }
    ],
    order: 3,
    active: true
  },
  {
    questionText: 'How often do you typically need medical care?',
    dimensionId: 'health',
    questionType: 'rating',
    description: 'Consider your typical healthcare usage pattern',
    options: [
      {
        label: 'Frequently (more than 12 times per year)',
        value: '5',
        basePoints: 5,
        segmentScores: {
          minimizer: 1,
          protector: 5,
          preventer: 4,
          manager: 5,
          loyalist: 4
        }
      },
      {
        label: 'Regularly (7-12 times per year)',
        value: '4',
        basePoints: 4,
        segmentScores: {
          minimizer: 2,
          protector: 4,
          preventer: 4,
          manager: 4,
          loyalist: 4
        }
      },
      {
        label: 'Occasionally (3-6 times per year)',
        value: '3',
        basePoints: 3,
        segmentScores: {
          minimizer: 3,
          protector: 3,
          preventer: 3,
          manager: 3,
          loyalist: 3
        }
      },
      {
        label: 'Rarely (1-2 times per year)',
        value: '1',
        basePoints: 1,
        segmentScores: {
          minimizer: 5,
          protector: 1,
          preventer: 2,
          manager: 2,
          loyalist: 2
        }
      }
    ],
    order: 4,
    active: true
  },
  {
    questionText: 'Do you need coverage while traveling?',
    dimensionId: 'health',
    questionType: 'rating',
    description: 'Consider your travel patterns and needs for healthcare coverage',
    options: [
      {
        label: 'International travel',
        value: '5',
        basePoints: 5,
        segmentScores: {
          minimizer: 2,
          protector: 5,
          preventer: 4,
          manager: 3,
          loyalist: 4
        }
      },
      {
        label: 'Travel within the US',
        value: '3',
        basePoints: 3,
        segmentScores: {
          minimizer: 3,
          protector: 4,
          preventer: 3,
          manager: 3,
          loyalist: 3
        }
      },
      {
        label: 'Rarely travel',
        value: '1',
        basePoints: 1,
        segmentScores: {
          minimizer: 4,
          protector: 2,
          preventer: 2,
          manager: 2,
          loyalist: 2
        }
      }
    ],
    order: 5,
    active: true
  },
  {
    questionText: 'What are your prescription drug needs?',
    dimensionId: 'prescriptions',
    questionType: 'rating',
    description: 'Consider your current and anticipated medication needs',
    options: [
      {
        label: 'Many medications',
        value: '5',
        basePoints: 5,
        segmentScores: {
          minimizer: 1,
          protector: 5,
          preventer: 4,
          manager: 5,
          loyalist: 4
        }
      },
      {
        label: 'Some brand-name medications',
        value: '4',
        basePoints: 4,
        segmentScores: {
          minimizer: 2,
          protector: 4,
          preventer: 4,
          manager: 4,
          loyalist: 4
        }
      },
      {
        label: 'Few generic medications',
        value: '2',
        basePoints: 2,
        segmentScores: {
          minimizer: 4,
          protector: 2,
          preventer: 3,
          manager: 3,
          loyalist: 3
        }
      },
      {
        label: 'No regular prescriptions',
        value: '1',
        basePoints: 1,
        segmentScores: {
          minimizer: 5,
          protector: 1,
          preventer: 2,
          manager: 2,
          loyalist: 2
        }
      }
    ],
    order: 6,
    active: true
  },
  {
    questionText: 'Which additional benefits interest you?',
    dimensionId: 'benefits',
    questionType: 'multipleChoice',
    description: 'Select all additional benefits that are important to you',
    options: [
      {
        label: 'Dental coverage',
        value: 'dental',
        basePoints: 3,
        segmentScores: {
          minimizer: 2,
          protector: 4,
          preventer: 5,
          manager: 3,
          loyalist: 4
        }
      },
      {
        label: 'Vision coverage',
        value: 'vision',
        basePoints: 3,
        segmentScores: {
          minimizer: 2,
          protector: 4,
          preventer: 5,
          manager: 3,
          loyalist: 4
        }
      },
      {
        label: 'Hearing aids',
        value: 'hearing',
        basePoints: 3,
        segmentScores: {
          minimizer: 2,
          protector: 4,
          preventer: 4,
          manager: 3,
          loyalist: 4
        }
      },
      {
        label: 'Fitness membership',
        value: 'fitness',
        basePoints: 2,
        segmentScores: {
          minimizer: 1,
          protector: 3,
          preventer: 5,
          manager: 3,
          loyalist: 4
        }
      },
      {
        label: 'Transportation to medical appointments',
        value: 'transportation',
        basePoints: 4,
        segmentScores: {
          minimizer: 1,
          protector: 5,
          preventer: 3,
          manager: 4,
          loyalist: 4
        }
      },
      {
        label: 'Meal delivery after hospital stays',
        value: 'meal-delivery',
        basePoints: 4,
        segmentScores: {
          minimizer: 1,
          protector: 5,
          preventer: 3,
          manager: 4,
          loyalist: 4
        }
      }
    ],
    order: 7,
    active: true
  }
];

// Seed Function
export const seedQuestions = async (payload: Payload): Promise<void> => {
  try {
    console.log('Starting to seed questions...')

    // Seed each question
    for (const question of questionsData) {
      console.log(`Seeding question: ${question.questionText}`)
      try {
        await payload.create({
          collection: 'questions',
          data: question
        })
        console.log(`Successfully seeded question: ${question.questionText}`)
      } catch (err) {
        console.error(`Error seeding question: ${question.questionText}`)
        console.error(err)
      }
    }

    console.log('Successfully completed question seeding')
  } catch (error) {
    console.error('Error in seed process:', error)
    throw error
  }
}
