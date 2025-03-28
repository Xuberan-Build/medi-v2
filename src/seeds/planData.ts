/* eslint-disable @typescript-eslint/no-explicit-any */
import { Payload } from 'payload'

interface Plan {
  name: string
  planType: string
  shortDescription: string
  longDescription?: any // RichText content structure
  keyFeatures: { feature: string }[]
  bestFor: { point: string }[]
  considerations: { point: string }[]
  coverage: {
    monthlyPremiumRange: { min: number; max: number }
    annualDeductibleRange: { min: number; max: number }
    networkRestrictions: string
  }
  additionalBenefits: {
    dental: boolean
    vision: boolean
    hearing: boolean
    fitness: boolean
    transportation: boolean
    mealDelivery: boolean
    other?: { benefitName: string; description: string }[]
  }
  status: string
}

const plansData: Plan[] = [
  {
    name: 'Original Medicare (Parts A & B)',
    planType: 'medicareSupplement',
    shortDescription:
      'Traditional fee-for-service coverage through the federal government with provider flexibility.',
    longDescription: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Original Medicare consists of Part A (Hospital Insurance) and Part B (Medical Insurance) and is managed by the federal government. It offers flexibility to see any doctor or hospital that accepts Medicare anywhere in the US without referrals. While it covers many healthcare services, it generally pays 80% of approved costs after deductibles, leaving beneficiaries responsible for the remaining 20% with no annual out-of-pocket maximum.',
                type: 'text',
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        version: 1,
      },
    },
    keyFeatures: [
      { feature: 'Freedom to choose any doctor that accepts Medicare' },
      { feature: 'No network restrictions or referrals needed' },
      { feature: 'Nationwide coverage' },
      { feature: 'Separate Part D plan needed for prescription drugs' },
    ],
    bestFor: [
      { point: 'People who travel frequently in the US' },
      { point: 'Those who prioritize provider choice over cost' },
      { point: 'People who want to see specialists without referrals' },
    ],
    considerations: [
      { point: 'No out-of-pocket maximum for cost protection' },
      { point: 'No coverage for prescription drugs without a separate Part D plan' },
      { point: 'No routine dental, vision, or hearing coverage' },
    ],
    coverage: {
      monthlyPremiumRange: { min: 170, max: 250 },
      annualDeductibleRange: { min: 226, max: 1600 },
      networkRestrictions: 'none',
    },
    additionalBenefits: {
      dental: false,
      vision: false,
      hearing: false,
      fitness: false,
      transportation: false,
      mealDelivery: false,
      other: [],
    },
    status: 'published',
  },
  {
    name: 'Medicare Advantage HMO',
    planType: 'medicareAdvantage',
    shortDescription:
      'Managed care plan with lower costs, network restrictions, and additional benefits.',
    longDescription: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Medicare Advantage HMO plans are offered by private insurance companies and combine Part A, Part B, and usually Part D in a single plan. HMOs typically have lower costs but require members to use in-network providers and get referrals from a primary care physician to see specialists. These plans often include benefits not covered by Original Medicare like dental, vision, and hearing coverage, as well as fitness programs. While premiums may be lower (sometimes $0), members still pay the Part B premium and may have copayments or coinsurance for services.',
                type: 'text',
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        version: 1,
      },
    },
    keyFeatures: [
      { feature: 'All-in-one coverage including Part D prescription benefits' },
      { feature: 'Low or $0 monthly premium (beyond Part B premium)' },
      { feature: 'Additional benefits like dental, vision, and hearing' },
      { feature: 'Annual out-of-pocket maximum for financial protection' },
    ],
    bestFor: [
      { point: 'Cost-conscious beneficiaries' },
      { point: 'People who prefer coordinated care' },
      { point: 'Those who want extra benefits beyond Original Medicare' },
    ],
    considerations: [
      { point: 'Must use network providers except in emergencies' },
      { point: 'Requires PCP referrals to see specialists' },
      { point: 'May have limited coverage when traveling' },
    ],
    coverage: {
      monthlyPremiumRange: { min: 0, max: 100 },
      annualDeductibleRange: { min: 0, max: 500 },
      networkRestrictions: 'high',
    },
    additionalBenefits: {
      dental: true,
      vision: true,
      hearing: true,
      fitness: true,
      transportation: true,
      mealDelivery: false,
      other: [],
    },
    status: 'published',
  },
  {
    name: 'Medicare Advantage PPO',
    planType: 'medicareAdvantage',
    shortDescription:
      'More flexible Medicare Advantage option with in and out-of-network coverage.',
    longDescription: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: "Medicare Advantage PPO plans provide more flexibility than HMOs by allowing members to see out-of-network providers at a higher cost. While using in-network providers is still more cost-effective, PPOs don't require referrals to see specialists. These plans combine Parts A, B, and typically D in one package with additional benefits like dental and vision. They feature an annual out-of-pocket maximum for financial protection, but premiums are generally higher than HMO plans.",
                type: 'text',
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        version: 1,
      },
    },
    keyFeatures: [
      { feature: 'More provider flexibility than HMO plans' },
      { feature: 'No referrals needed for specialists' },
      { feature: 'Out-of-network coverage at higher cost-sharing' },
      { feature: 'All-in-one coverage with extra benefits' },
    ],
    bestFor: [
      { point: 'People who want some provider flexibility' },
      { point: 'Those who see specialists regularly' },
      { point: 'Beneficiaries who want extra benefits but less restriction' },
    ],
    considerations: [
      { point: 'Higher premiums than HMO plans' },
      { point: 'Higher costs for out-of-network care' },
      { point: 'May have more limited coverage when traveling' },
    ],
    coverage: {
      monthlyPremiumRange: { min: 40, max: 200 },
      annualDeductibleRange: { min: 0, max: 750 },
      networkRestrictions: 'moderate',
    },
    additionalBenefits: {
      dental: true,
      vision: true,
      hearing: true,
      fitness: true,
      transportation: false,
      mealDelivery: false,
      other: [
        {
          benefitName: 'Wellness Rewards Program',
          description:
            'Earn rewards for completing health activities like annual checkups and preventive screenings',
        },
        {
          benefitName: 'Nutrition Counseling',
          description:
            'Access to dietitians and nutrition experts for personalized dietary guidance',
        },
      ],
    },
    status: 'published',
  },
  {
    name: 'Medicare Supplement Plan G',
    planType: 'medicareSupplement',
    shortDescription:
      'Comprehensive coverage that works alongside Original Medicare to reduce out-of-pocket costs.',
    longDescription: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Medicare Supplement Plan G (Medigap) works with Original Medicare to cover most out-of-pocket costs like coinsurance, copayments, and excess charges. After meeting the annual Part B deductible, beneficiaries have minimal additional costs. Plan G offers the freedom to see any doctor that accepts Medicare without network restrictions, and coverage travels with you throughout the US. While monthly premiums are higher than Medicare Advantage, the predictable costs and nearly comprehensive coverage provide peace of mind for those who use healthcare services frequently.',
                type: 'text',
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        version: 1,
      },
    },
    keyFeatures: [
      {
        feature:
          'Covers Part A coinsurance and hospital costs up to 365 days after Medicare benefits are used',
      },
      { feature: 'Covers Part B coinsurance or copayment' },
      { feature: 'Covers Part B excess charges' },
      { feature: 'No network restrictions - see any Medicare provider' },
    ],
    bestFor: [
      { point: 'People who want predictable healthcare costs' },
      { point: 'Those who travel frequently' },
      { point: 'Beneficiaries who use healthcare services often' },
    ],
    considerations: [
      { point: 'Higher monthly premiums' },
      { point: 'Does not cover Part B deductible' },
      { point: 'Requires separate Part D plan for prescription coverage' },
    ],
    coverage: {
      monthlyPremiumRange: { min: 120, max: 300 },
      annualDeductibleRange: { min: 226, max: 226 },
      networkRestrictions: 'none',
    },
    additionalBenefits: {
      dental: false,
      vision: false,
      hearing: false,
      fitness: false,
      transportation: false,
      mealDelivery: false,
      other: [],
    },
    status: 'published',
  },
  {
    name: 'Medicare Advantage Special Needs Plan (SNP)',
    planType: 'medicareAdvantageCondition',
    shortDescription:
      'Specialized Medicare Advantage plan tailored for people with specific health conditions or circumstances.',
    longDescription: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Special Needs Plans (SNPs) are a type of Medicare Advantage plan designed exclusively for people with specific diseases or characteristics. They tailor benefits, provider networks, and drug formularies to best meet the needs of the groups they serve. There are three types: D-SNP for those with both Medicare and Medicaid, C-SNP for those with specific chronic conditions, and I-SNP for those in institutional settings. These plans include Medicare Parts A, B, and D coverage, along with specialized care coordination, provider networks experienced with the specific condition, and tailored benefits.',
                type: 'text',
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        version: 1,
      },
    },
    keyFeatures: [
      { feature: 'Tailored benefits for specific health conditions or circumstances' },
      { feature: 'Care coordination and case management' },
      { feature: 'Provider networks with expertise in relevant conditions' },
      { feature: 'Specialized drug formularies' },
    ],
    bestFor: [
      { point: 'People with chronic conditions (diabetes, heart failure, etc.)' },
      { point: 'Dual-eligible beneficiaries (Medicare and Medicaid)' },
      { point: 'Those living in institutional settings' },
    ],
    considerations: [
      { point: 'Must meet eligibility requirements specific to the SNP' },
      { point: 'Network restrictions similar to other Medicare Advantage plans' },
      { point: 'May lose eligibility if circumstances change' },
    ],
    coverage: {
      monthlyPremiumRange: { min: 0, max: 100 },
      annualDeductibleRange: { min: 0, max: 500 },
      networkRestrictions: 'high',
    },
    additionalBenefits: {
      dental: true,
      vision: true,
      hearing: true,
      fitness: true,
      transportation: true,
      mealDelivery: true,
      other: [
        {
          benefitName: 'Condition-specific benefits',
          description:
            'Additional benefits targeted to the specific condition or circumstance covered by the SNP',
        },
      ],
    },
    status: 'published',
  },
  {
    name: 'Medicare Advantage Wellness Plan',
    planType: 'medicareAdvantageWellness',
    shortDescription:
      'Medicare Advantage plan with enhanced wellness and preventive benefits for health-conscious beneficiaries.',
    longDescription: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Medicare Advantage Wellness Plans focus on preventive care and healthy lifestyle benefits beyond standard Medicare Advantage offerings. These plans typically include enhanced fitness benefits, nutrition counseling, wellness coaching, and rewards for healthy behaviors. They combine Parts A, B, and D coverage with a strong emphasis on maintaining health rather than just treating illness. While they operate within network restrictions like other Medicare Advantage plans, they appeal to active, health-conscious beneficiaries looking to maximize wellness benefits.',
                type: 'text',
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        version: 1,
      },
    },
    keyFeatures: [
      { feature: 'Enhanced fitness and gym membership benefits' },
      { feature: 'Wellness rewards programs for healthy behaviors' },
      { feature: 'Nutritional counseling and health coaching' },
      { feature: 'Comprehensive preventive care coverage' },
    ],
    bestFor: [
      { point: 'Health-conscious, active beneficiaries' },
      { point: 'Those focused on preventive healthcare' },
      { point: 'People who regularly use fitness facilities' },
    ],
    considerations: [
      { point: 'Network restrictions similar to other Medicare Advantage plans' },
      { point: 'May have higher premiums than basic Medicare Advantage plans' },
      { point: 'Wellness benefits may not offset costs for those with serious health conditions' },
    ],
    coverage: {
      monthlyPremiumRange: { min: 20, max: 150 },
      annualDeductibleRange: { min: 0, max: 500 },
      networkRestrictions: 'moderate',
    },
    additionalBenefits: {
      dental: true,
      vision: true,
      hearing: true,
      fitness: true,
      transportation: false,
      mealDelivery: false,
      other: [
        {
          benefitName: 'Wellness Rewards Program',
          description:
            'Earn rewards for completing health activities like annual checkups and preventive screenings',
        },
        {
          benefitName: 'Nutrition Counseling',
          description:
            'Access to dietitians and nutrition experts for personalized dietary guidance',
        },
      ],
    },
    status: 'published',
  },
]
export const seedPlans = async (payload: Payload): Promise<void> => {
  console.log('🌱 Seeding plans...')

  // Check for existing plans
  const existingPlans = await payload.find({
    collection: 'plans',
    limit: 0,
  })

  if (existingPlans.totalDocs > 0) {
    console.log(`🗑️ Found ${existingPlans.totalDocs} existing plans. Clearing...`)
    await payload.delete({
      collection: 'plans',
      where: {},
    })
    console.log('✅ Existing plans cleared.')
  }

  let successful = 0
  let failed = 0
  const errors: string[] = []

  for (const [index, plan] of plansData.entries()) {
    console.log(`\n[${index + 1}/${plansData.length}] Seeding plan: "${plan.name}"`)

    try {
      const result = await payload.create({
        collection: 'plans',
        data: plan as any,
      })
      console.log(`✅ Successfully created plan with ID: ${result.id}`)
      successful++
    } catch (error: any) {
      failed++
      const errorMessage = `❌ Failed to seed plan "${plan.name}": ${error.message}`
      errors.push(errorMessage)
      console.error(errorMessage)
      console.error('🛑 Detailed error info:', error)
    }
  }

  console.log('\n=== ✅ Seeding Complete ===')
  console.log(`📊 Successfully seeded: ${successful}/${plansData.length}`)
  console.log(`📊 Failed: ${failed}`)

  if (errors.length > 0) {
    console.log('\n📝 Errors:')
    errors.forEach((error, index) => console.log(`${index + 1}. ${error}`))
  }

  const verifyCount = await payload.find({
    collection: 'plans',
    limit: 0,
  })

  console.log(`\n📌 Final database state: ${verifyCount.totalDocs} total plans`)
}
