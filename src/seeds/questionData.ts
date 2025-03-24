// questionData.ts

import { Payload } from 'payload'

// First, let's define our dimension weights with clear documentation
const DIMENSION_WEIGHTS = {
  doctorChoice: {
    weight: 0.25,
    description:
      'Carries highest weight because provider choice fundamentally differentiates these plans. Medicare Supplement allows seeing any Medicare provider, while Medicare Advantage restricts networks.',
  },
  costStructure: {
    weight: 0.2,
    description:
      'Monthly premium versus out-of-pocket cost preference strongly indicates plan suitability. Medicare Advantage typically offers lower premiums but variable costs, while Supplement plans have higher premiums but more predictable expenses.',
  },
  travelNeeds: {
    weight: 0.15,
    description:
      'Travel frequency significantly impacts plan utility. Medicare Supplement offers nationwide coverage, while Medicare Advantage typically has geographic restrictions.',
  },
  healthcareUsage: {
    weight: 0.15,
    description:
      "Usage patterns affect cost-effectiveness. Higher usage makes Medicare Supplement's predictable costs more valuable, while lower usage makes Medicare Advantage's lower premiums more attractive.",
  },
  prescriptionNeeds: {
    weight: 0.1,
    description:
      "Medicare Advantage often includes prescription coverage, while Supplement requires a separate Part D plan. Complex medication needs may benefit from Medicare Advantage's integrated approach.",
  },
  additionalBenefits: {
    weight: 0.1,
    description:
      'Medicare Advantage typically includes additional benefits like dental and vision, while Supplement plans focus on core Medicare coverage.',
  },
  managedCare: {
    weight: 0.05,
    description:
      'Provides context about comfort with managed care structures but carries less weight as it overlaps with doctor choice preferences.',
  },
} as const

// questionsData.ts
// Consolidated questions array with detailed scoring logic
// export const questionsData = [
//   {
//     questionText: 'How important is keeping your current doctors?',
//     dimensionId: 'doctorChoice',
//     questionType: 'rating',
//     description:
//       'Consider how important it is for you to continue seeing your current healthcare providers',
//     dimensionWeight: DIMENSION_WEIGHTS.doctorChoice,
//     options: [
//       {
//         label: 'Must keep current doctors',
//         value: '5',
//         scoreImpact: {
//           points: 25,
//           favoredPlan: 'medicareSupplement',
//           reasoning:
//             "Strong preference for current doctors favors Medicare Supplement's open provider network",
//         },
//       },
//       {
//         label: 'Prefer current doctors but somewhat flexible',
//         value: '4',
//         scoreImpact: {
//           points: 12.5,
//           favoredPlan: 'medicareSupplement',
//           reasoning:
//             'Moderate-strong preference for current doctors slightly favors Medicare Supplement',
//         },
//       },
//       {
//         label: 'No strong preference either way',
//         value: '3',
//         scoreImpact: {
//           points: 0,
//           favoredPlan: 'medicareSupplement',
//           reasoning: "Neutral preference doesn't favor either plan type",
//         },
//       },
//       {
//         label: 'Somewhat open to new doctors',
//         value: '2',
//         scoreImpact: {
//           points: 12.5,
//           favoredPlan: 'medicareAdvantage',
//           reasoning: 'Flexibility with providers begins to favor Medicare Advantage',
//         },
//       },
//       {
//         label: 'Completely open to new doctors',
//         value: '1',
//         scoreImpact: {
//           points: 25,
//           favoredPlan: 'medicareAdvantage',
//           reasoning:
//             "High flexibility with providers strongly favors Medicare Advantage's network model",
//         },
//       },
//     ],
//     order: 1,
//     active: true,
//   },
//   {
//     questionText: 'How do you prefer to handle healthcare costs?',
//     dimensionId: 'costStructure',
//     questionType: 'rating',
//     description:
//       'Consider your preference between predictable monthly premiums versus potentially lower but variable out-of-pocket costs',
//     dimensionWeight: DIMENSION_WEIGHTS.costStructure,
//     options: [
//       {
//         label: 'Strongly prefer lower premiums, comfortable with variable costs',
//         value: '5',
//         scoreImpact: {
//           points: 20,
//           favoredPlan: 'medicareAdvantage',
//           reasoning:
//             "Strong preference for lower premiums aligns with Medicare Advantage's typical cost structure, where lower monthly payments are balanced with variable out-of-pocket costs",
//         },
//       },
//       {
//         label: 'Somewhat prefer lower premiums',
//         value: '4',
//         scoreImpact: {
//           points: 10,
//           favoredPlan: 'medicareAdvantage',
//           reasoning:
//             "Moderate preference for lower premiums suggests comfort with Medicare Advantage's cost model",
//         },
//       },
//       {
//         label: 'No strong preference on cost structure',
//         value: '3',
//         scoreImpact: {
//           points: 0,
//           favoredPlan: 'medicareAdvantage',
//           reasoning: "Neutral cost preference doesn't favor either plan type",
//         },
//       },
//       {
//         label: 'Somewhat prefer predictable costs',
//         value: '2',
//         scoreImpact: {
//           points: 10,
//           favoredPlan: 'medicareSupplement',
//           reasoning:
//             "Slight preference for predictability begins to favor Medicare Supplement's consistent cost structure",
//         },
//       },
//       {
//         label: 'Strongly prefer predictable costs, willing to pay higher premiums',
//         value: '1',
//         scoreImpact: {
//           points: 20,
//           favoredPlan: 'medicareSupplement',
//           reasoning:
//             "Strong preference for predictable costs strongly favors Medicare Supplement's stable cost structure with higher premiums but lower variability",
//         },
//       },
//     ],
//     order: 2,
//     active: true,
//   },
//   {
//     questionText: 'How often do you travel outside your local area?',
//     dimensionId: 'travelNeeds',
//     questionType: 'rating',
//     description:
//       'Consider your travel patterns and need for healthcare coverage while away from home',
//     dimensionWeight: DIMENSION_WEIGHTS.travelNeeds,
//     options: [
//       {
//         label: 'Frequent traveler (multiple trips per year)',
//         value: '5',
//         scoreImpact: {
//           points: 15,
//           favoredPlan: 'medicareSupplement',
//           reasoning:
//             "Frequent travel strongly favors Medicare Supplement's nationwide coverage without network restrictions",
//         },
//       },
//       {
//         label: 'Regular traveler (few trips per year)',
//         value: '4',
//         scoreImpact: {
//           points: 10,
//           favoredPlan: 'medicareSupplement',
//           reasoning: "Regular travel patterns benefit from Medicare Supplement's flexible coverage",
//         },
//       },
//       {
//         label: 'Occasional traveler',
//         value: '3',
//         scoreImpact: {
//           points: 7,
//           favoredPlan: 'medicareSupplement',
//           reasoning:
//             "Even occasional travel can benefit from Medicare Supplement's nationwide coverage",
//         },
//       },
//       {
//         label: 'Rare traveler',
//         value: '2',
//         scoreImpact: {
//           points: 7,
//           favoredPlan: 'medicareAdvantage',
//           reasoning: "Limited travel needs begin to favor Medicare Advantage's local network focus",
//         },
//       },
//       {
//         label: 'Almost never travel',
//         value: '1',
//         scoreImpact: {
//           points: 15,
//           favoredPlan: 'medicareAdvantage',
//           reasoning:
//             "Very limited travel strongly favors Medicare Advantage's local network structure",
//         },
//       },
//     ],
//     order: 3,
//     active: true,
//   },
// ]

export const questionsData = [
  {
    questionText: 'How important is keeping your current doctors?',
    dimensionId: 'provider',
    questionType: 'rating',
    description: 'Consider how important it is for you to continue seeing your current healthcare providers',
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
        }
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
        }
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
        }
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
        }
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
        }
      }
    ]
  },
  {
    questionText: 'How do you prefer to handle healthcare costs?',
    dimensionId: 'cost',
    questionType: 'rating',
    description: 'Consider your preference between predictable monthly premiums versus potentially lower but variable out-of-pocket costs',
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
        }
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
        }
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
        }
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
        }
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
        }
      }
    ]
  }
]

