/* eslint-disable @typescript-eslint/no-explicit-any */
import { Payload } from 'payload'

interface Plan {
  name: string
  planType: string
  shortDescription: string
  longDescription?: any  // RichText content structure
  keyFeatures: { feature: string }[]
  bestFor: { point: string }[]
  considerations: { point: string }[]
  coverage: {
    monthlyPremiumRange: { min: number, max: number }
    annualDeductibleRange: { min: number, max: number }
    networkRestrictions: string
  }
  additionalBenefits: {
    dental: boolean
    vision: boolean
    hearing: boolean
    fitness: boolean
    transportation: boolean
    mealDelivery: boolean
    other: { benefitName: string, description: string }[]
  }
  status: string
}

const plansData: Plan[] = [
  {
    name: "Medicare Advantage",
    planType: "medicareAdvantage",
    shortDescription: "Basic Medicare Advantage plan",
    keyFeatures: [
      { feature: "Low monthly premiums" },
      { feature: "In-network coverage" },
      { feature: "Prescription drug coverage" }
    ],
    bestFor: [
      { point: "Budget-conscious individuals" },
      { point: "People preferring managed care" }
    ],
    considerations: [
      { point: "Limited out-of-network coverage" },
      { point: "May require referrals" }
    ],
    coverage: {
      monthlyPremiumRange: { min: 20, max: 50 },
      annualDeductibleRange: { min: 100, max: 300 },
      networkRestrictions: "moderate"
    },
    additionalBenefits: {
      dental: true,
      vision: true,
      hearing: false,
      fitness: true,
      transportation: false,
      mealDelivery: false,
      other: []
    },
    status: "published"
  },
  {
    name: "Medicare Supplemen",
    planType: "medicareSupplement",
    shortDescription: "Comprehensive coverage with predictable costs",
    keyFeatures: [
      { feature: "Nationwide coverage" },
      { feature: "Predictable expenses" },
      { feature: "No network restrictions" }
    ],
    bestFor: [
      { point: "Frequent travelers" },
      { point: "People preferring stability" }
    ],
    considerations: [
      { point: "Higher monthly premiums" },
      { point: "Requires separate drug coverage" }
    ],
    coverage: {
      monthlyPremiumRange: { min: 100, max: 250 },
      annualDeductibleRange: { min: 0, max: 100 },
      networkRestrictions: "none"
    },
    additionalBenefits: {
      dental: false,
      vision: false,
      hearing: true,
      fitness: true,
      transportation: true,
      mealDelivery: true,
      other: []
    },
    status: "published"
  }
]

export const seedPlans = async (payload: Payload): Promise<void> => {
  console.log("🌱 Seeding plans...")

  for (const plan of plansData) {
    try {
      const result = await payload.create({
        collection: "plans",
        data: plan as any,
      })
      console.log(`✅ Successfully created plan: ${result.id}`)
    } catch (error) {
      console.error(`❌ Failed to seed plan "${plan.name}":`, error)
    }
  }

  console.log("✅ Plans seeding completed")
}
