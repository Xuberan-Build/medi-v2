// src/seeds/pageData/categoryData.ts
import { Payload } from 'payload'

interface CategoryData {
  name: string
  slug: string
  description: string
  order: number
  isMainPillar: boolean
  showInMainNav: boolean
  showInFooter: boolean
  parentCategory?: string // Slug of parent category
}

export const categoryData: CategoryData[] = [
  // Main pillars
  {
    name: 'Medicare Basics',
    slug: 'medicare-basics',
    description:
      'Foundational information about the Medicare program, what it covers, and how it works.',
    order: 10,
    isMainPillar: true,
    showInMainNav: true,
    showInFooter: true,
  },
  {
    name: 'Sign Up for Medicare',
    slug: 'sign-up-for-medicare',
    description: 'Information about Medicare enrollment periods, eligibility, and how to apply.',
    order: 20,
    isMainPillar: true,
    showInMainNav: true,
    showInFooter: true,
  },
  {
    name: 'Get More Coverage',
    slug: 'get-more-coverage',
    description:
      'Details about Medicare Advantage, Medicare Supplement, and other coverage options.',
    order: 30,
    isMainPillar: true,
    showInMainNav: true,
    showInFooter: true,
  },
  {
    name: 'Medicare Benefits',
    slug: 'medicare-benefits',
    description: 'Comprehensive information about benefits and services covered by Medicare.',
    order: 40,
    isMainPillar: true,
    showInMainNav: true,
    showInFooter: true,
  },
  {
    name: 'Medicare Rights',
    slug: 'medicare-rights',
    description: 'Information about your rights and protections as a Medicare beneficiary.',
    order: 50,
    isMainPillar: true,
    showInMainNav: true,
    showInFooter: true,
  },
  {
    name: 'Resources',
    slug: 'resources',
    description: 'Helpful resources, forms, and tools for Medicare beneficiaries.',
    order: 60,
    isMainPillar: true,
    showInMainNav: true,
    showInFooter: true,
  },

  // Medicare Basics subcategories
  {
    name: 'Parts of Medicare',
    slug: 'parts-of-medicare',
    description: 'Explanation of Medicare Parts A, B, C, and D.',
    order: 10,
    isMainPillar: false,
    showInMainNav: false,
    showInFooter: false,
    parentCategory: 'medicare-basics',
  },
  {
    name: 'What Does Medicare Cover',
    slug: 'what-does-medicare-cover',
    description: 'Overview of services and items covered by Medicare.',
    order: 20,
    isMainPillar: false,
    showInMainNav: false,
    showInFooter: false,
    parentCategory: 'medicare-basics',
  },
  {
    name: 'How Does Medicare Work',
    slug: 'how-does-medicare-work',
    description: 'Explanation of how Medicare coverage and benefits work.',
    order: 30,
    isMainPillar: false,
    showInMainNav: false,
    showInFooter: false,
    parentCategory: 'medicare-basics',
  },
  {
    name: 'Working Past 65',
    slug: 'working-past-65',
    description: 'Information for people who continue working beyond age 65.',
    order: 40,
    isMainPillar: false,
    showInMainNav: false,
    showInFooter: false,
    parentCategory: 'medicare-basics',
  },

  // Get More Coverage subcategories
  {
    name: 'Coverage Options',
    slug: 'coverage-options',
    description: 'Overview of different Medicare coverage options.',
    order: 10,
    isMainPillar: false,
    showInMainNav: false,
    showInFooter: false,
    parentCategory: 'get-more-coverage',
  },
  {
    name: 'Medicare vs Advantage',
    slug: 'medicare-vs-advantage',
    description: 'Comparison of Original Medicare and Medicare Advantage plans.',
    order: 20,
    isMainPillar: false,
    showInMainNav: false,
    showInFooter: false,
    parentCategory: 'get-more-coverage',
  },
  {
    name: 'Joining a Plan',
    slug: 'joining-a-plan',
    description: 'Steps to join a Medicare Advantage or Part D plan.',
    order: 30,
    isMainPillar: false,
    showInMainNav: false,
    showInFooter: false,
    parentCategory: 'get-more-coverage',
  },
  {
    name: 'Enrollment Periods',
    slug: 'enrollment-periods',
    description: 'Information about Medicare enrollment periods and deadlines.',
    order: 40,
    isMainPillar: false,
    showInMainNav: false,
    showInFooter: false,
    parentCategory: 'get-more-coverage',
  },
  {
    name: 'Buying Medigap Policy',
    slug: 'buying-medigap-policy',
    description: 'Guide to purchasing Medicare Supplement (Medigap) policies.',
    order: 50,
    isMainPillar: false,
    showInMainNav: false,
    showInFooter: false,
    parentCategory: 'get-more-coverage',
  },

  // Medicare Benefits subcategories
  {
    name: 'Medicare Coverage',
    slug: 'medicare-coverage',
    description: 'Details about Medicare coverage and benefits.',
    order: 10,
    isMainPillar: false,
    showInMainNav: false,
    showInFooter: false,
    parentCategory: 'medicare-benefits',
  },
  {
    name: 'Mandatory Benefits',
    slug: 'mandatory-benefits',
    description: 'Required benefits that all Medicare plans must cover.',
    order: 20,
    isMainPillar: false,
    showInMainNav: false,
    showInFooter: false,
    parentCategory: 'medicare-benefits',
  },
  {
    name: 'Optional Benefits',
    slug: 'optional-benefits',
    description: 'Additional benefits that may be included in Medicare Advantage plans.',
    order: 30,
    isMainPillar: false,
    showInMainNav: false,
    showInFooter: false,
    parentCategory: 'medicare-benefits',
  },

  // Medicare Rights subcategories
  {
    name: 'Your Rights',
    slug: 'your-rights',
    description: 'Overview of your rights as a Medicare beneficiary.',
    order: 10,
    isMainPillar: false,
    showInMainNav: false,
    showInFooter: false,
    parentCategory: 'medicare-rights',
  },
  {
    name: 'Your Protections',
    slug: 'your-protections',
    description: 'Protections against fraud and abuse in the Medicare program.',
    order: 20,
    isMainPillar: false,
    showInMainNav: false,
    showInFooter: false,
    parentCategory: 'medicare-rights',
  },
  {
    name: 'Help with Rights',
    slug: 'help-with-rights',
    description: 'Resources for getting help with Medicare rights issues.',
    order: 30,
    isMainPillar: false,
    showInMainNav: false,
    showInFooter: false,
    parentCategory: 'medicare-rights',
  },
]

export const seedPageCategories = async (payload: Payload): Promise<void> => {
  try {
    console.log('Starting to seed page categories...')

    // Create a map to store parent category IDs
    const categoryIdMap: Record<string, string> = {}

    // First, create all parent categories
    for (const category of categoryData.filter((cat) => !cat.parentCategory)) {
      try {
        const existingCategory = await payload.find({
          collection: 'page-categories',
          where: {
            slug: {
              equals: category.slug,
            },
          },
        })

        if (existingCategory.totalDocs > 0) {
          console.log(`Category "${category.name}" already exists, using existing ID`)
          categoryIdMap[category.slug] = existingCategory.docs[0].id
          continue
        }

        const newCategory = await payload.create({
          collection: 'page-categories',
          data: {
            name: category.name,
            slug: category.slug,
            description: category.description,
            order: category.order,
            isMainPillar: category.isMainPillar,
            showInMainNav: category.showInMainNav,
            showInFooter: category.showInFooter,
          },
        })

        console.log(`Created category: ${category.name}`)
        categoryIdMap[category.slug] = newCategory.id
      } catch (err) {
        console.error(`Error creating category ${category.name}:`, err)
      }
    }

    // Then create subcategories, linking to parents
    for (const category of categoryData.filter((cat) => cat.parentCategory)) {
      try {
        const existingCategory = await payload.find({
          collection: 'page-categories',
          where: {
            slug: {
              equals: category.slug,
            },
          },
        })

        if (existingCategory.totalDocs > 0) {
          console.log(`Subcategory "${category.name}" already exists, skipping`)
          continue
        }

        // Get parent category ID
        const parentId = categoryIdMap[category.parentCategory as string]

        if (!parentId) {
          console.error(
            `Parent category "${category.parentCategory}" not found for "${category.name}"`,
          )
          continue
        }

        await payload.create({
          collection: 'page-categories',
          data: {
            name: category.name,
            slug: category.slug,
            description: category.description,
            parentCategory: parentId,
            order: category.order,
            isMainPillar: category.isMainPillar,
            showInMainNav: category.showInMainNav,
            showInFooter: category.showInFooter,
          },
        })

        console.log(`Created subcategory: ${category.name}`)
      } catch (err) {
        console.error(`Error creating subcategory ${category.name}:`, err)
      }
    }

    console.log('Page categories seeding completed')
  } catch (error) {
    console.error('Error in page categories seed process:', error)
    throw error
  }
}
