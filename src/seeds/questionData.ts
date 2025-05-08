/* eslint-disable @typescript-eslint/no-unused-vars */
// src/seeds/questionData.ts

// Define dimension weights with documentation
const DIMENSION_WEIGHTS = {
  provider: {
    weight: 0.25,
    description:
      'Carries highest weight because provider choice fundamentally differentiates these plans. Medicare Supplement allows seeing any Medicare provider, while Medicare Advantage restricts networks.',
  },
  cost: {
    weight: 0.2,
    description:
      'Monthly premium versus out-of-pocket cost preference strongly indicates plan suitability. Medicare Advantage typically offers lower premiums but variable costs, while Supplement plans have higher premiums but more predictable expenses.',
  },
  health: {
    weight: 0.15,
    description:
      'Travel frequency and healthcare usage significantly impact plan utility. Medicare Supplement offers nationwide coverage, while Medicare Advantage typically has geographic restrictions.',
  },
  prescriptions: {
    weight: 0.1,
    description:
      "Medicare Advantage often includes prescription coverage, while Supplement requires a separate Part D plan. Complex medication needs may benefit from Medicare Advantage's integrated approach.",
  },
  benefits: {
    weight: 0.1,
    description:
      'Medicare Advantage typically includes additional benefits like dental and vision, while Supplement plans focus on core Medicare coverage.',
  },
} as const

// Consolidated questions array with detailed structure for Payload CMS
export const questionsData = [
  {
    questionText: 'How important is keeping your current doctors?',
    dimensionId: 'provider',
    questionType: 'rating',
    description:
      'Consider how important it is for you to continue seeing your current healthcare providers',
    order: 1,
    active: true,
    options: [
      {
        label: 'Must keep current doctors',
        value: '5',
        basePoints: 25,
        segmentScores: {
          minimizer: 5,
          protector: 4,
          preventer: 3,
          manager: 2,
          loyalist: 1,
        },
      },
      {
        label: 'Prefer current doctors but somewhat flexible',
        value: '4',
        basePoints: 20,
        segmentScores: {
          minimizer: 4,
          protector: 3,
          preventer: 2,
          manager: 1,
          loyalist: 0,
        },
      },
      {
        label: 'No strong preference either way',
        value: '3',
        basePoints: 15,
        segmentScores: {
          minimizer: 3,
          protector: 2,
          preventer: 1,
          manager: 0,
          loyalist: 0,
        },
      },
      {
        label: 'Somewhat open to new doctors',
        value: '2',
        basePoints: 10,
        segmentScores: {
          minimizer: 2,
          protector: 1,
          preventer: 0,
          manager: 0,
          loyalist: 0,
        },
      },
      {
        label: 'Completely open to new doctors',
        value: '1',
        basePoints: 5,
        segmentScores: {
          minimizer: 0,
          protector: 0,
          preventer: 0,
          manager: 0,
          loyalist: 0,
        },
      },
    ],
  },
  {
    questionText: 'How do you prefer to handle healthcare costs?',
    dimensionId: 'cost',
    questionType: 'rating',
    description:
      'Consider your preference between predictable monthly premiums versus potentially lower but variable out-of-pocket costs',
    order: 2,
    active: true,
    options: [
      {
        label: 'Strongly prefer lower premiums, comfortable with variable costs',
        value: '5',
        basePoints: 20,
        segmentScores: {
          minimizer: 0,
          protector: 1,
          preventer: 2,
          manager: 3,
          loyalist: 4,
        },
      },
      {
        label: 'Somewhat prefer lower premiums',
        value: '4',
        basePoints: 15,
        segmentScores: {
          minimizer: 0,
          protector: 0,
          preventer: 1,
          manager: 2,
          loyalist: 3,
        },
      },
      {
        label: 'No strong preference on cost structure',
        value: '3',
        basePoints: 10,
        segmentScores: {
          minimizer: 1,
          protector: 0,
          preventer: 0,
          manager: 0,
          loyalist: 0,
        },
      },
      {
        label: 'Somewhat prefer predictable costs',
        value: '2',
        basePoints: 5,
        segmentScores: {
          minimizer: 2,
          protector: 1,
          preventer: 0,
          manager: 0,
          loyalist: 0,
        },
      },
      {
        label: 'Strongly prefer predictable costs, willing to pay higher premiums',
        value: '1',
        basePoints: 0,
        segmentScores: {
          minimizer: 3,
          protector: 2,
          preventer: 1,
          manager: 0,
          loyalist: 0,
        },
      },
    ],
  },
  {
    questionText: 'How do you feel about referrals for specialists?',
    dimensionId: 'provider',
    questionType: 'rating',
    description:
      'Consider your preference for being able to see specialists with or without a referral from your primary doctor',
    order: 3,
    active: true,
    options: [
      {
        label: 'Strongly prefer direct access without referrals',
        value: '5',
        basePoints: 25,
        segmentScores: {
          minimizer: 5,
          protector: 4,
          preventer: 3,
          manager: 2,
          loyalist: 1,
        },
      },
      {
        label: 'Prefer direct access but can work with referrals',
        value: '4',
        basePoints: 20,
        segmentScores: {
          minimizer: 4,
          protector: 3,
          preventer: 2,
          manager: 1,
          loyalist: 0,
        },
      },
      {
        label: 'No preference either way',
        value: '3',
        basePoints: 15,
        segmentScores: {
          minimizer: 3,
          protector: 2,
          preventer: 1,
          manager: 0,
          loyalist: 0,
        },
      },
      {
        label: 'Somewhat comfortable with referral requirements',
        value: '2',
        basePoints: 10,
        segmentScores: {
          minimizer: 2,
          protector: 1,
          preventer: 0,
          manager: 0,
          loyalist: 0,
        },
      },
      {
        label: 'Very comfortable with referral requirements',
        value: '1',
        basePoints: 5,
        segmentScores: {
          minimizer: 0,
          protector: 0,
          preventer: 0,
          manager: 0,
          loyalist: 0,
        },
      },
    ],
  },
  {
    questionText: 'How often do you typically need medical care?',
    dimensionId: 'health',
    questionType: 'rating',
    description: 'Consider your typical healthcare usage patterns over the past few years',
    order: 4,
    active: true,
    options: [
      {
        label: 'Very frequent (multiple visits per month)',
        value: '5',
        basePoints: 25,
        segmentScores: {
          minimizer: 5,
          protector: 4,
          preventer: 3,
          manager: 2,
          loyalist: 1,
        },
      },
      {
        label: 'Frequent (monthly visits)',
        value: '4',
        basePoints: 20,
        segmentScores: {
          minimizer: 4,
          protector: 3,
          preventer: 2,
          manager: 1,
          loyalist: 0,
        },
      },
      {
        label: 'Regular (quarterly visits)',
        value: '3',
        basePoints: 15,
        segmentScores: {
          minimizer: 3,
          protector: 2,
          preventer: 1,
          manager: 0,
          loyalist: 0,
        },
      },
      {
        label: 'Occasional (1-2 times per year)',
        value: '2',
        basePoints: 10,
        segmentScores: {
          minimizer: 2,
          protector: 1,
          preventer: 0,
          manager: 0,
          loyalist: 0,
        },
      },
      {
        label: 'Rarely (less than once per year)',
        value: '1',
        basePoints: 5,
        segmentScores: {
          minimizer: 0,
          protector: 0,
          preventer: 0,
          manager: 0,
          loyalist: 0,
        },
      },
    ],
  },
  {
    questionText: 'Do you need coverage while traveling?',
    dimensionId: 'health',
    questionType: 'rating',
    description:
      'Consider how important it is to have healthcare coverage when traveling outside your local area',
    order: 5,
    active: true,
    options: [
      {
        label: 'Essential - I travel frequently',
        value: '5',
        basePoints: 25,
        segmentScores: {
          minimizer: 5,
          protector: 4,
          preventer: 3,
          manager: 2,
          loyalist: 1,
        },
      },
      {
        label: 'Very important - I travel regularly',
        value: '4',
        basePoints: 20,
        segmentScores: {
          minimizer: 4,
          protector: 3,
          preventer: 2,
          manager: 1,
          loyalist: 0,
        },
      },
      {
        label: 'Somewhat important - I travel occasionally',
        value: '3',
        basePoints: 15,
        segmentScores: {
          minimizer: 3,
          protector: 2,
          preventer: 1,
          manager: 0,
          loyalist: 0,
        },
      },
      {
        label: 'Not very important - I rarely travel',
        value: '2',
        basePoints: 10,
        segmentScores: {
          minimizer: 2,
          protector: 1,
          preventer: 0,
          manager: 0,
          loyalist: 0,
        },
      },
      {
        label: 'Not important - I almost never travel',
        value: '1',
        basePoints: 5,
        segmentScores: {
          minimizer: 0,
          protector: 0,
          preventer: 0,
          manager: 0,
          loyalist: 0,
        },
      },
    ],
  },
  {
    questionText: 'How do you feel about monthly premiums vs. out-of-pocket costs?',
    dimensionId: 'cost',
    questionType: 'rating',
    description:
      'Consider your preference between higher monthly premiums with lower out-of-pocket costs or lower premiums with higher potential out-of-pocket costs',
    order: 6,
    active: true,
    options: [
      {
        label: 'Strongly prefer higher premiums with lower out-of-pocket costs',
        value: '5',
        basePoints: 25,
        segmentScores: {
          minimizer: 5,
          protector: 4,
          preventer: 3,
          manager: 2,
          loyalist: 1,
        },
      },
      {
        label: 'Somewhat prefer higher premiums with lower out-of-pocket costs',
        value: '4',
        basePoints: 20,
        segmentScores: {
          minimizer: 4,
          protector: 3,
          preventer: 2,
          manager: 1,
          loyalist: 0,
        },
      },
      {
        label: 'No strong preference either way',
        value: '3',
        basePoints: 15,
        segmentScores: {
          minimizer: 3,
          protector: 2,
          preventer: 1,
          manager: 0,
          loyalist: 0,
        },
      },
      {
        label: 'Somewhat prefer lower premiums with higher potential out-of-pocket costs',
        value: '2',
        basePoints: 10,
        segmentScores: {
          minimizer: 2,
          protector: 1,
          preventer: 0,
          manager: 0,
          loyalist: 0,
        },
      },
      {
        label: 'Strongly prefer lower premiums with higher potential out-of-pocket costs',
        value: '1',
        basePoints: 5,
        segmentScores: {
          minimizer: 0,
          protector: 0,
          preventer: 0,
          manager: 0,
          loyalist: 0,
        },
      },
    ],
  },
  {
    questionText: 'What are your prescription drug needs?',
    dimensionId: 'prescriptions',
    questionType: 'rating',
    description: 'Consider your typical prescription medication usage',
    order: 7,
    active: true,
    options: [
      {
        label: 'Multiple specialty or high-cost medications',
        value: '5',
        basePoints: 25,
        segmentScores: {
          minimizer: 5,
          protector: 4,
          preventer: 3,
          manager: 2,
          loyalist: 1,
        },
      },
      {
        label: 'Several regular prescriptions',
        value: '4',
        basePoints: 20,
        segmentScores: {
          minimizer: 4,
          protector: 3,
          preventer: 2,
          manager: 1,
          loyalist: 0,
        },
      },
      {
        label: 'A few regular prescriptions',
        value: '3',
        basePoints: 15,
        segmentScores: {
          minimizer: 3,
          protector: 2,
          preventer: 1,
          manager: 0,
          loyalist: 0,
        },
      },
      {
        label: 'Occasional prescriptions',
        value: '2',
        basePoints: 10,
        segmentScores: {
          minimizer: 2,
          protector: 1,
          preventer: 0,
          manager: 0,
          loyalist: 0,
        },
      },
      {
        label: 'Rarely need prescriptions',
        value: '1',
        basePoints: 5,
        segmentScores: {
          minimizer: 0,
          protector: 0,
          preventer: 0,
          manager: 0,
          loyalist: 0,
        },
      },
    ],
  },
  {
    questionText: 'Which additional benefits interest you?',
    dimensionId: 'benefits',
    questionType: 'rating',
    description:
      'Consider how important additional benefits like dental, vision, fitness programs, etc. are to you',
    order: 8,
    active: true,
    options: [
      {
        label: 'Extremely important - need comprehensive additional benefits',
        value: '5',
        basePoints: 25,
        segmentScores: {
          minimizer: 5,
          protector: 4,
          preventer: 3,
          manager: 2,
          loyalist: 1,
        },
      },
      {
        label: 'Very important - interested in several additional benefits',
        value: '4',
        basePoints: 20,
        segmentScores: {
          minimizer: 4,
          protector: 3,
          preventer: 2,
          manager: 1,
          loyalist: 0,
        },
      },
      {
        label: 'Somewhat important - interested in some additional benefits',
        value: '3',
        basePoints: 15,
        segmentScores: {
          minimizer: 3,
          protector: 2,
          preventer: 1,
          manager: 0,
          loyalist: 0,
        },
      },
      {
        label: 'Not very important - minimal interest in additional benefits',
        value: '2',
        basePoints: 10,
        segmentScores: {
          minimizer: 2,
          protector: 1,
          preventer: 0,
          manager: 0,
          loyalist: 0,
        },
      },
      {
        label: 'Not important - no interest in additional benefits',
        value: '1',
        basePoints: 5,
        segmentScores: {
          minimizer: 0,
          protector: 0,
          preventer: 0,
          manager: 0,
          loyalist: 0,
        },
      },
    ],
  },
]
