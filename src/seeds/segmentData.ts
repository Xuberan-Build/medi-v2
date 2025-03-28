/* eslint-disable @typescript-eslint/no-explicit-any */
import { Payload } from 'payload'

export const seedSegments = async (payload: Payload): Promise<void> => {
  console.log('🌱 Seeding segments...')

  // Check for existing segments
  const existingSegments = await payload.find({
    collection: 'segments',
    limit: 0,
  })

  if (existingSegments.totalDocs > 0) {
    console.log(`🗑️ Found ${existingSegments.totalDocs} existing segments. Clearing...`)
    await payload.delete({
      collection: 'segments',
      where: {},
    })
    console.log('✅ Existing segments cleared.')
  }

  // Fetch existing plans to get their IDs
  const existingPlans = await payload.find({
    collection: 'plans',
    limit: 100,
  })

  const planMap = new Map<string, string>()
  existingPlans.docs.forEach((plan) => {
    planMap.set(plan.planType, plan.id)
    planMap.set(plan.name, plan.id) // Also map by name for easier reference
  })

  // Log available plans for reference
  console.log('📋 Available plans for segment mapping:')
  existingPlans.docs.forEach((plan) => {
    console.log(`- ${plan.name} (${plan.planType}): ${plan.id}`)
  })

  // Check if required plans exist
  const requiredPlanTypes = [
    'medicareAdvantage',
    'medicareSupplement',
    'medicareAdvantageWellness',
    'medicareAdvantageCondition',
  ]

  const missingPlanTypes = requiredPlanTypes.filter((type) => !planMap.has(type))
  if (missingPlanTypes.length > 0) {
    console.error(
      `❌ Required plan types not found: ${missingPlanTypes.join(', ')}. Seeding segments may fail.`,
    )
    // Continue anyway, but with a warning
  }

  // Define the segments data
  const segmentsData = [
    // MINIMIZER SEGMENT
    {
      name: 'Cost Minimizer',
      segmentId: 'minimizer',
      description:
        'Cost-conscious beneficiaries who prioritize low premiums and are comfortable with network restrictions and managed care.',
      characteristics: [
        { trait: 'Prioritizes lower monthly premiums over predictable costs' },
        { trait: 'Comfortable with provider network restrictions' },
        { trait: 'Generally healthy with minimal healthcare usage' },
        { trait: 'Prefers all-in-one coverage with integrated prescription benefits' },
        { trait: 'Values additional benefits like dental and vision' },
      ],
      scoringCriteria: [
        { dimension: 'provider', weight: 0.25, preferredScore: 1 },
        { dimension: 'cost', weight: 0.2, preferredScore: 5 },
        { dimension: 'health', weight: 0.15, preferredScore: 1 },
        { dimension: 'prescriptions', weight: 0.1, preferredScore: 3 },
        { dimension: 'benefits', weight: 0.1, preferredScore: 5 },
      ],
      planAffinities: [
        {
          planType: planMap.get('medicareAdvantage') || 'medicareAdvantage',
          affinityScore: 90,
          reasonings: [
            { reason: 'Lower premiums align with cost-consciousness' },
            { reason: 'Comfortable with network restrictions and managed care' },
            { reason: 'Integrated prescription coverage simplifies administration' },
            { reason: 'Additional benefits provide value beyond Original Medicare' },
          ],
        },
        {
          planType: planMap.get('medicareAdvantageWellness') || 'medicareAdvantageWellness',
          affinityScore: 70,
          reasonings: [
            { reason: "Wellness benefits appealing if they don't significantly increase premiums" },
            {
              reason: 'Enhanced fitness benefits may provide value if already using such services',
            },
          ],
        },
        {
          planType: planMap.get('medicareSupplement') || 'medicareSupplement',
          affinityScore: 30,
          reasonings: [
            { reason: 'Higher premiums conflict with cost minimization priority' },
            { reason: 'May not fully utilize the provider flexibility benefits' },
          ],
        },
      ],
      matchThresholds: {
        highConfidence: 75,
        mediumConfidence: 60,
        lowConfidence: 40,
      },
      status: 'published',
    },

    // PROTECTOR SEGMENT
    {
      name: 'Financial Protector',
      segmentId: 'protector',
      description:
        'Security-focused beneficiaries who prioritize predictable healthcare costs and comprehensive financial protection against unexpected expenses.',
      characteristics: [
        { trait: 'Prioritizes predictable out-of-pocket costs over premium amounts' },
        { trait: 'Willing to pay higher premiums for financial security' },
        { trait: 'Uses healthcare services regularly' },
        { trait: 'Values wide provider access and minimal restrictions' },
        { trait: 'Often travels or splits time between locations' },
      ],
      scoringCriteria: [
        { dimension: 'provider', weight: 0.25, preferredScore: 5 },
        { dimension: 'cost', weight: 0.2, preferredScore: 1 },
        { dimension: 'health', weight: 0.15, preferredScore: 5 },
        { dimension: 'prescriptions', weight: 0.1, preferredScore: 1 },
        { dimension: 'benefits', weight: 0.1, preferredScore: 1 },
      ],
      planAffinities: [
        {
          planType: planMap.get('medicareSupplement') || 'medicareSupplement',
          affinityScore: 90,
          reasonings: [
            { reason: 'Predictable costs align with financial protection priority' },
            { reason: 'Unrestricted provider access offers flexibility' },
            { reason: 'Coverage travels nationwide without network limitations' },
            { reason: 'Minimal out-of-pocket costs after meeting deductibles' },
          ],
        },
        {
          planType: planMap.get('medicareAdvantage') || 'medicareAdvantage',
          affinityScore: 40,
          reasonings: [
            { reason: 'Lower premiums appealing, but variable costs create uncertainty' },
            { reason: 'Network restrictions may be problematic' },
            { reason: 'Out-of-network costs could pose financial risk' },
          ],
        },
        {
          planType: planMap.get('medicareAdvantageWellness') || 'medicareAdvantageWellness',
          affinityScore: 35,
          reasonings: [
            { reason: "Additional benefits don't offset concerns about financial predictability" },
            { reason: 'Still subject to network restrictions that limit flexibility' },
          ],
        },
      ],
      matchThresholds: {
        highConfidence: 75,
        mediumConfidence: 60,
        lowConfidence: 40,
      },
      status: 'published',
    },

    // PREVENTER SEGMENT
    {
      name: 'Health Preventer',
      segmentId: 'preventer',
      description:
        'Wellness-focused beneficiaries who prioritize preventive care, fitness benefits, and health maintenance programs to maximize long-term health.',
      characteristics: [
        { trait: 'Highly engaged in preventive healthcare and wellness activities' },
        { trait: 'Regularly uses fitness facilities and wellness programs' },
        { trait: 'Values nutrition counseling and preventive screenings' },
        { trait: 'Moderately price-sensitive but willing to pay for wellness benefits' },
        { trait: 'Generally healthy and focused on maintaining good health' },
      ],
      scoringCriteria: [
        { dimension: 'provider', weight: 0.25, preferredScore: 3 },
        { dimension: 'cost', weight: 0.2, preferredScore: 3 },
        { dimension: 'health', weight: 0.15, preferredScore: 3 },
        { dimension: 'prescriptions', weight: 0.1, preferredScore: 3 },
        { dimension: 'benefits', weight: 0.1, preferredScore: 5 },
      ],
      planAffinities: [
        {
          planType: planMap.get('medicareAdvantageWellness') || 'medicareAdvantageWellness',
          affinityScore: 95,
          reasonings: [
            { reason: 'Enhanced wellness and fitness benefits align with prevention focus' },
            { reason: 'Rewards programs for healthy behaviors provide incentives' },
            { reason: 'Nutrition counseling supports holistic health approach' },
            { reason: 'Comprehensive preventive care coverage' },
          ],
        },
        {
          planType: planMap.get('medicareAdvantage') || 'medicareAdvantage',
          affinityScore: 70,
          reasonings: [
            { reason: 'Basic wellness benefits still provide value' },
            { reason: 'Lower premiums allow more financial flexibility' },
            { reason: 'Integrated coverage simplifies healthcare management' },
          ],
        },
        {
          planType: planMap.get('medicareSupplement') || 'medicareSupplement',
          affinityScore: 45,
          reasonings: [
            { reason: 'Provider flexibility beneficial but lacks integrated wellness benefits' },
            { reason: 'Higher premiums may not be justified by wellness offerings' },
          ],
        },
      ],
      matchThresholds: {
        highConfidence: 75,
        mediumConfidence: 60,
        lowConfidence: 40,
      },
      status: 'published',
    },

    // MANAGER SEGMENT
    {
      name: 'Condition Manager',
      segmentId: 'manager',
      description:
        'Beneficiaries with chronic conditions who need specialized care coordination, condition-specific benefits, and comprehensive medication management.',
      characteristics: [
        { trait: 'Managing one or more chronic health conditions' },
        { trait: 'Requires regular access to specialists and medications' },
        { trait: 'Values care coordination and case management' },
        { trait: 'Seeks condition-specific benefits and services' },
        { trait: 'May qualify for dual eligibility (Medicare/Medicaid)' },
      ],
      scoringCriteria: [
        { dimension: 'provider', weight: 0.25, preferredScore: 3 },
        { dimension: 'cost', weight: 0.2, preferredScore: 3 },
        { dimension: 'health', weight: 0.15, preferredScore: 5 },
        { dimension: 'prescriptions', weight: 0.1, preferredScore: 5 },
        { dimension: 'benefits', weight: 0.1, preferredScore: 5 },
      ],
      planAffinities: [
        {
          planType: planMap.get('medicareAdvantageCondition') || 'medicareAdvantageCondition',
          affinityScore: 95,
          reasonings: [
            { reason: 'Specialized benefits tailored to specific health conditions' },
            { reason: 'Care coordination helps navigate complex healthcare needs' },
            { reason: 'Provider networks with expertise in relevant conditions' },
            { reason: 'Specialized drug formularies aligned with condition management' },
          ],
        },
        {
          planType: planMap.get('medicareAdvantage') || 'medicareAdvantage',
          affinityScore: 60,
          reasonings: [
            { reason: 'Integrated drug coverage beneficial for medication management' },
            { reason: 'Additional benefits may support condition management' },
            { reason: 'May lack specialized care coordination for complex conditions' },
          ],
        },
        {
          planType: planMap.get('medicareSupplement') || 'medicareSupplement',
          affinityScore: 50,
          reasonings: [
            { reason: 'Provider flexibility valuable for accessing specialists' },
            { reason: 'Predictable costs beneficial for regular healthcare use' },
            { reason: 'Lacks integrated prescription coverage and care coordination' },
          ],
        },
      ],
      matchThresholds: {
        highConfidence: 75,
        mediumConfidence: 60,
        lowConfidence: 40,
      },
      status: 'published',
    },

    // LOYALIST SEGMENT
    {
      name: 'Provider Loyalist',
      segmentId: 'loyalist',
      description:
        'Relationship-focused beneficiaries who highly value maintaining their current doctor relationships and having unrestricted provider choice above other considerations.',
      characteristics: [
        { trait: 'Strong loyalty to current healthcare providers' },
        { trait: 'Prioritizes provider choice over cost considerations' },
        { trait: 'Often has established relationships with multiple specialists' },
        { trait: 'Values continuity of care and established medical records' },
        { trait: 'May travel frequently requiring nationwide coverage' },
      ],
      scoringCriteria: [
        { dimension: 'provider', weight: 0.25, preferredScore: 5 },
        { dimension: 'cost', weight: 0.2, preferredScore: 2 },
        { dimension: 'health', weight: 0.15, preferredScore: 4 },
        { dimension: 'prescriptions', weight: 0.1, preferredScore: 3 },
        { dimension: 'benefits', weight: 0.1, preferredScore: 3 },
      ],
      planAffinities: [
        {
          planType: planMap.get('medicareSupplement') || 'medicareSupplement',
          affinityScore: 90,
          reasonings: [
            { reason: 'Unrestricted provider access maintains current doctor relationships' },
            { reason: 'Nationwide coverage supports continuity of care when traveling' },
            { reason: 'No referrals needed to see specialists' },
            { reason: 'Higher premiums offset by relationship preservation' },
          ],
        },
        {
          planType: planMap.get('medicareAdvantage') || 'medicareAdvantage',
          affinityScore: 35,
          reasonings: [
            { reason: 'Network restrictions may disrupt established provider relationships' },
            { reason: 'Referral requirements can be barriers to specialist access' },
            { reason: 'Lower costs may not compensate for provider limitations' },
          ],
        },
        {
          planType: planMap.get('medicareAdvantageWellness') || 'medicareAdvantageWellness',
          affinityScore: 30,
          reasonings: [
            { reason: "Additional benefits don't offset provider restrictions" },
            { reason: 'Still subject to network limitations that may exclude preferred providers' },
          ],
        },
      ],
      matchThresholds: {
        highConfidence: 75,
        mediumConfidence: 60,
        lowConfidence: 40,
      },
      status: 'published',
    },
  ]

  let successful = 0
  let failed = 0
  const errors: string[] = []

  // Create each segment
  for (const [index, segment] of segmentsData.entries()) {
    console.log(`\n[${index + 1}/${segmentsData.length}] Seeding segment: "${segment.name}"`)

    try {
      const result = await payload.create({
        collection: 'segments',
        data: segment as any,
      })
      console.log(`✅ Successfully created segment with ID: ${result.id}`)
      successful++
    } catch (error: any) {
      failed++
      const errorMessage = `❌ Failed to seed segment "${segment.name}": ${error.message}`
      errors.push(errorMessage)
      console.error(errorMessage)
      console.error('🛑 Detailed error info:', error)
    }
  }

  console.log('\n=== ✅ Seeding Complete ===')
  console.log(`📊 Successfully seeded: ${successful}/${segmentsData.length}`)
  console.log(`📊 Failed: ${failed}`)

  if (errors.length > 0) {
    console.log('\n📝 Errors:')
    errors.forEach((error, index) => console.log(`${index + 1}. ${error}`))
  }

  const verifyCount = await payload.find({
    collection: 'segments',
    limit: 0,
  })

  console.log(`\n📌 Final database state: ${verifyCount.totalDocs} total segments`)
}
