//plans.ts
import type { CollectionConfig } from 'payload'

export const Plans: CollectionConfig = {
  slug: 'plans',
  admin: {
    useAsTitle: 'name',
    group: 'Medicare',
    description: 'Medicare plan types and their characteristics'
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Plan Name',
    },
    {
      name: 'planType',
      type: 'select',
      required: true,
      options: [
        { label: 'Medicare Advantage', value: 'medicareAdvantage' },
        { label: 'Medicare Supplement', value: 'medicareSupplement' },
        { label: 'Medicare Advantage Wellness', value: 'medicareAdvantageWellness' },
        { label: 'Medicare Advantage Condition', value: 'medicareAdvantageCondition' },
      ],
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief overview of the plan (1-2 sentences)',
      },
    },
    {
      name: 'longDescription',
      type: 'richText',
      required: false,
      admin: {
        description: 'Detailed description of the plan',
      },
    },
    {
      name: 'keyFeatures',
      type: 'array',
      required: true,
      minRows: 3,
      maxRows: 10,
      labels: {
        singular: 'Key Feature',
        plural: 'Key Features',
      },
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'bestFor',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 5,
      labels: {
        singular: 'Best For Point',
        plural: 'Best For Points',
      },
      fields: [
        {
          name: 'point',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'considerations',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 5,
      labels: {
        singular: 'Consideration',
        plural: 'Considerations',
      },
      fields: [
        {
          name: 'point',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'coverage',
      type: 'group',
      fields: [
        {
          name: 'monthlyPremiumRange',
          type: 'group',
          fields: [
            {
              name: 'min',
              type: 'number',
              required: true,
              min: 0,
            },
            {
              name: 'max',
              type: 'number',
              required: true,
              min: 0,
            },
          ],
        },
        {
          name: 'annualDeductibleRange',
          type: 'group',
          fields: [
            {
              name: 'min',
              type: 'number',
              required: true,
              min: 0,
            },
            {
              name: 'max',
              type: 'number',
              required: true,
              min: 0,
            },
          ],
        },
        {
          name: 'networkRestrictions',
          type: 'select',
          required: true,
          options: [
            { label: 'None', value: 'none' },
            { label: 'Low', value: 'low' },
            { label: 'Moderate', value: 'moderate' },
            { label: 'High', value: 'high' },
          ],
        },
      ],
    },
    {
      name: 'additionalBenefits',
      type: 'group',
      fields: [
        {
          name: 'dental',
          type: 'checkbox',
        },
        {
          name: 'vision',
          type: 'checkbox',
        },
        {
          name: 'hearing',
          type: 'checkbox',
        },
        {
          name: 'fitness',
          type: 'checkbox',
        },
        {
          name: 'transportation',
          type: 'checkbox',
        },
        {
          name: 'mealDelivery',
          type: 'checkbox',
        },
        {
          name: 'other',
          type: 'array',
          fields: [
            {
              name: 'benefitName',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
          ],
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
    },
  ],
  timestamps: true,
}
