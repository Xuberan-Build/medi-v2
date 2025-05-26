// questionData-fixed.ts - Complete corrected version with all survey questions

export const questionsData = [
  {
    questionText: 'How important is keeping your current doctors?',
    dimensionId: 'provider',
    questionType: 'multipleChoice',
    description: 'Consider how important it is for you to continue seeing your current healthcare providers',
    options: [
      {
        label: 'Must keep current doctors',
        value: 'must_keep',
        basePoints: 25,
        segmentScores: {
          minimizer: 5,
          protector: 25,
          preventer: 20,
          manager: 15,
          loyalist: 25
        }
      },
      {
        label: 'Prefer to keep but flexible',
        value: 'prefer_keep',
        basePoints: 15,
        segmentScores: {
          minimizer: 10,
          protector: 20,
          preventer: 15,
          manager: 12,
          loyalist: 18
        }
      },
      {
        label: 'Open to new doctors',
        value: 'open_new',
        basePoints: 10,
        segmentScores: {
          minimizer: 20,
          protector: 10,
          preventer: 12,
          manager: 15,
          loyalist: 8
        }
      },
      {
        label: 'No preference',
        value: 'no_preference',
        basePoints: 5,
        segmentScores: {
          minimizer: 15,
          protector: 5,
          preventer: 8,
          manager: 10,
          loyalist: 5
        }
      }
    ],
    order: 1,
    active: true
  },
  {
    questionText: 'How do you feel about referrals for specialists?',
    dimensionId: 'provider',
    questionType: 'multipleChoice',
    description: 'Consider your preference for accessing specialist care',
    options: [
      {
        label: 'Prefer direct access',
        value: 'direct_access',
        basePoints: 20,
        segmentScores: {
          minimizer: 5,
          protector: 25,
          preventer: 18,
          manager: 12,
          loyalist: 20
        }
      },
      {
        label: 'OK with referrals',
        value: 'ok_referrals',
        basePoints: 15,
        segmentScores: {
          minimizer: 20,
          protector: 10,
          preventer: 12,
          manager: 18,
          loyalist: 10
        }
      },
      {
        label: 'No preference',
        value: 'no_preference',
        basePoints: 5,
        segmentScores: {
          minimizer: 10,
          protector: 8,
          preventer: 10,
          manager: 10,
          loyalist: 8
        }
      },
      {
        label: 'Not sure',
        value: 'not_sure',
        basePoints: 0,
        segmentScores: {
          minimizer: 5,
          protector: 5,
          preventer: 5,
          manager: 5,
          loyalist: 5
        }
      }
    ],
    order: 2,
    active: true
  },
  {
    questionText: 'How often do you typically need medical care?',
    dimensionId: 'health',
    questionType: 'multipleChoice',
    description: 'Consider your typical healthcare usage patterns',
    options: [
      {
        label: 'Frequently (12+/year)',
        value: 'frequently',
        basePoints: 25,
        segmentScores: {
          minimizer: 5,
          protector: 25,
          preventer: 25,
          manager: 25,
          loyalist: 20
        }
      },
      {
        label: 'Regularly (7-12/year)',
        value: 'regularly',
        basePoints: 20,
        segmentScores: {
          minimizer: 8,
          protector: 20,
          preventer: 20,
          manager: 20,
          loyalist: 18
        }
      },
      {
        label: 'Occasionally (3-6/year)',
        value: 'occasionally',
        basePoints: 15,
        segmentScores: {
          minimizer: 15,
          protector: 15,
          preventer: 12,
          manager: 15,
          loyalist: 12
        }
      },
      {
        label: 'Rarely (1-2/year)',
        value: 'rarely',
        basePoints: 10,
        segmentScores: {
          minimizer: 25,
          protector: 8,
          preventer: 5,
          manager: 8,
          loyalist: 5
        }
      }
    ],
    order: 3,
    active: true
  },
  {
    questionText: 'Do you need coverage while traveling?',
    dimensionId: 'health',
    questionType: 'multipleChoice',
    description: 'Consider your travel patterns and need for healthcare coverage while away from home',
    options: [
      {
        label: 'International travel',
        value: 'international',
        basePoints: 25,
        segmentScores: {
          minimizer: 5,
          protector: 25,
          preventer: 20,
          manager: 15,
          loyalist: 20
        }
      },
      {
        label: 'Travel within US',
        value: 'domestic',
        basePoints: 20,
        segmentScores: {
          minimizer: 10,
          protector: 20,
          preventer: 18,
          manager: 15,
          loyalist: 15
        }
      },
      {
        label: 'Rarely travel',
        value: 'rarely',
        basePoints: 10,
        segmentScores: {
          minimizer: 20,
          protector: 10,
          preventer: 8,
          manager: 12,
          loyalist: 8
        }
      },
      {
        label: 'No travel needs',
        value: 'no_travel',
        basePoints: 5,
        segmentScores: {
          minimizer: 25,
          protector: 5,
          preventer: 5,
          manager: 10,
          loyalist: 5
        }
      }
    ],
    order: 4,
    active: true
  },
  {
    questionText: 'How do you feel about monthly premiums vs. out-of-pocket costs?',
    dimensionId: 'cost',
    questionType: 'multipleChoice',
    description: 'Consider your preference between predictable monthly premiums versus potentially lower but variable out-of-pocket costs',
    options: [
      {
        label: 'Higher premium, lower out-of-pocket',
        value: 'higher_premium',
        basePoints: 25,
        segmentScores: {
          minimizer: 5,
          protector: 25,
          preventer: 20,
          manager: 15,
          loyalist: 25
        }
      },
      {
        label: 'Balanced approach',
        value: 'balanced',
        basePoints: 15,
        segmentScores: {
          minimizer: 15,
          protector: 15,
          preventer: 15,
          manager: 15,
          loyalist: 15
        }
      },
      {
        label: 'Lower premium, higher out-of-pocket',
        value: 'lower_premium',
        basePoints: 20,
        segmentScores: {
          minimizer: 25,
          protector: 8,
          preventer: 10,
          manager: 18,
          loyalist: 5
        }
      },
      {
        label: 'Not sure',
        value: 'not_sure',
        basePoints: 5,
        segmentScores: {
          minimizer: 10,
          protector: 10,
          preventer: 10,
          manager: 10,
          loyalist: 10
        }
      }
    ],
    order: 5,
    active: true
  },
  {
    questionText: 'What are your prescription drug needs?',
    dimensionId: 'prescriptions',
    questionType: 'multipleChoice',
    description: 'Consider your current and expected prescription medication needs',
    options: [
      {
        label: 'Many medications',
        value: 'many_meds',
        basePoints: 25,
        segmentScores: {
          minimizer: 5,
          protector: 25,
          preventer: 25,
          manager: 25,
          loyalist: 20
        }
      },
      {
        label: 'Some brand-name medications',
        value: 'some_brand',
        basePoints: 20,
        segmentScores: {
          minimizer: 10,
          protector: 20,
          preventer: 20,
          manager: 20,
          loyalist: 18
        }
      },
      {
        label: 'Few generic medications',
        value: 'few_generic',
        basePoints: 15,
        segmentScores: {
          minimizer: 20,
          protector: 15,
          preventer: 12,
          manager: 15,
          loyalist: 10
        }
      },
      {
        label: 'No regular prescriptions',
        value: 'no_prescriptions',
        basePoints: 10,
        segmentScores: {
          minimizer: 25,
          protector: 5,
          preventer: 5,
          manager: 8,
          loyalist: 5
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
        basePoints: 15,
        segmentScores: {
          minimizer: 10,
          protector: 15,
          preventer: 18,
          manager: 20,
          loyalist: 15
        }
      },
      {
        label: 'Vision coverage',
        value: 'vision',
        basePoints: 15,
        segmentScores: {
          minimizer: 10,
          protector: 15,
          preventer: 18,
          manager: 20,
          loyalist: 15
        }
      },
      {
        label: 'Hearing aids',
        value: 'hearing',
        basePoints: 20,
        segmentScores: {
          minimizer: 5,
          protector: 20,
          preventer: 25,
          manager: 25,
          loyalist: 20
        }
      },
      {
        label: 'Fitness membership',
        value: 'fitness',
        basePoints: 10,
        segmentScores: {
          minimizer: 15,
          protector: 10,
          preventer: 20,
          manager: 15,
          loyalist: 8
        }
      },
      {
        label: 'Transportation to medical appointments',
        value: 'transportation',
        basePoints: 20,
        segmentScores: {
          minimizer: 5,
          protector: 18,
          preventer: 20,
          manager: 25,
          loyalist: 15
        }
      },
      {
        label: 'Meal delivery after hospital stays',
        value: 'meal_delivery',
        basePoints: 15,
        segmentScores: {
          minimizer: 8,
          protector: 15,
          preventer: 20,
          manager: 20,
          loyalist: 12
        }
      }
    ],
    order: 7,
    active: true
  }
]
