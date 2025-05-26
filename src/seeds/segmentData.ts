/* eslint-disable @typescript-eslint/no-explicit-any */
import { Payload } from 'payload'

export const seedSegments = async (payload: Payload): Promise<void> => {
  console.log("🌱 Seeding segments...")

  // Fetch existing plans to get their IDs
  const existingPlans = await payload.find({
    collection: 'plans',
    limit: 100,
  })

  const planMap = new Map<string, string>()
  existingPlans.docs.forEach(plan => {
    planMap.set(plan.planType, plan.id)
  })

  if (!planMap.get('medicareAdvantage') || !planMap.get('medicareSupplement')) {
    console.error("❌ Required plans (Medicare Advantage and Medicare Supplement) not found. Seeding segments will fail.")
    return;
  }

  const segmentsData = [
    {
      name: "Budget Minimizer",
      segmentId: "minimizer",
      description: "Prioritizes cost savings over provider flexibility.",
      characteristics: [
        { trait: "Low premium preference" },
        { trait: "High out-of-pocket comfort" },
        { trait: "Flexible provider choice" }
      ],
      scoringCriteria: [
        { dimension: "cost", weight: 0.4, preferredScore: 5 },
        { dimension: "provider", weight: 0.2, preferredScore: 3 }
      ],
      planAffinities: [
        {
          planType: planMap.get('medicareAdvantage'), // Reference ID from the plans collection
          affinityScore: 90,
          reasonings: [{ reason: "Low cost and network efficiency" }]
        }
      ],
      matchThresholds: { highConfidence: 80, mediumConfidence: 60, lowConfidence: 40 },
      status: "published"
    },
    {
      name: "Healthcare Protector",
      segmentId: "protector",
      description: "Values broad healthcare access and predictable costs.",
      characteristics: [
        { trait: "Comprehensive coverage" },
        { trait: "Predictable expenses" },
        { trait: "No network restrictions" }
      ],
      scoringCriteria: [
        { dimension: "provider", weight: 0.4, preferredScore: 5 },
        { dimension: "cost", weight: 0.3, preferredScore: 4 }
      ],
      planAffinities: [
        {
          planType: planMap.get('medicareSupplement'), // Reference ID from the plans collection
          affinityScore: 85,
          reasonings: [{ reason: "Stable and comprehensive healthcare access" }]
        }
      ],
      matchThresholds: { highConfidence: 85, mediumConfidence: 65, lowConfidence: 45 },
      status: "published"
    }
  ]

  for (const segment of segmentsData) {
    try {
      const result = await payload.create({
        collection: 'segments',
        data: segment as any
      })
      console.log(`✅ Successfully created segment: ${result.id}`)
    } catch (error) {
      console.error(`❌ Failed to seed segment "${segment.name}":`, error)
    }
  }
  console.log("✅ Segments seeding completed")
}
