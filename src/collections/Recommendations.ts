///Users/Worker/plan-it/medi-planit/src/collections/Recommendations.ts
import type { CollectionConfig } from 'payload'

export const Recommendations: CollectionConfig = {
  slug: 'recommendations',
  admin: {
    useAsTitle: 'id',
    group: 'Medicare',
    description: 'Medicare plan recommendations and results'
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'userPreferences',
      type: 'group',
      fields: [
        {
          name: 'doctorChoice',
          type: 'group',
          fields: [
            {
              name: 'value',
              type: 'number',
              required: true,
              min: 1,
              max: 5,
            },
            {
              name: 'comments',
              type: 'text',
            },
          ],
        },
        {
          name: 'managedCare',
          type: 'group',
          fields: [
            {
              name: 'value',
              type: 'number',
              required: true,
              min: 1,
              max: 5,
            },
            {
              name: 'comments',
              type: 'text',
            },
          ],
        },
        {
          name: 'domesticTravel',
          type: 'group',
          fields: [
            {
              name: 'value',
              type: 'number',
              required: true,
              min: 1,
              max: 5,
            },
            {
              name: 'comments',
              type: 'text',
            },
          ],
        },
        {
          name: 'yearlyMaximums',
          type: 'group',
          fields: [
            {
              name: 'value',
              type: 'number',
              required: true,
              min: 1,
              max: 5,
            },
            {
              name: 'comments',
              type: 'text',
            },
          ],
        },
        {
          name: 'monthlyPremiums',
          type: 'group',
          fields: [
            {
              name: 'value',
              type: 'number',
              required: true,
              min: 1,
              max: 5,
            },
            {
              name: 'comments',
              type: 'text',
            },
          ],
        },
        {
          name: 'prescriptionPlans',
          type: 'group',
          fields: [
            {
              name: 'value',
              type: 'number',
              required: true,
              min: 1,
              max: 5,
            },
            {
              name: 'comments',
              type: 'text',
            },
          ],
        },
        {
          name: 'dentalVision',
          type: 'group',
          fields: [
            {
              name: 'value',
              type: 'number',
              required: true,
              min: 1,
              max: 5,
            },
            {
              name: 'comments',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'scoringResults',
      type: 'group',
      fields: [
        {
          name: 'dimensionScores',
          type: 'group',
          fields: [
            {
              name: 'provider',
              type: 'number',
              required: true,
              min: 0,
              max: 100,
            },
            {
              name: 'cost',
              type: 'number',
              required: true,
              min: 0,
              max: 100,
            },
            {
              name: 'health',
              type: 'number',
              required: true,
              min: 0,
              max: 100,
            },
            {
              name: 'prescriptions',
              type: 'number',
              required: true,
              min: 0,
              max: 100,
            },
            {
              name: 'benefits',
              type: 'number',
              required: true,
              min: 0,
              max: 100,
            },
          ],
        },
        {
          name: 'segmentMatches',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'segment',
              type: 'relationship',
              relationTo: 'segments',
              required: true,
            },
            {
              name: 'score',
              type: 'number',
              required: true,
              min: 0,
              max: 100,
            },
            {
              name: 'confidence',
              type: 'number',
              required: true,
              min: 0,
              max: 1,
            },
          ],
        },
      ],
    },
    {
      name: 'recommendations',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'plan',
          type: 'relationship',
          relationTo: 'plans',
          required: true,
        },
        {
          name: 'matchScore',
          type: 'number',
          required: true,
          min: 0,
          max: 100,
        },
        {
          name: 'isPrimary',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'reasonsForMatch',
          type: 'array',
          fields: [
            {
              name: 'reason',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'metadata',
      type: 'group',
      fields: [
        {
          name: 'createdAt',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'lastViewed',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'source',
          type: 'text',
        },
      ],
    },
  ],
  timestamps: true,
}
