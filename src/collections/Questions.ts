//Questions.ts
import type { CollectionConfig } from 'payload'

export const Questions: CollectionConfig = {
  slug: 'questions',
  admin: {
    useAsTitle: 'questionText',
    defaultColumns: ['questionText', 'dimensionId', 'questionType'],
    group: 'Medicare Content',
  },
  fields: [
    {
      name: 'questionText',
      type: 'text',
      required: true,
      label: 'Question Text',
    },
    {
      name: 'dimensionId',
      type: 'select',
      required: true,
      label: 'Question Dimension',
      options: [
        { label: 'Provider', value: 'provider' },
        { label: 'Cost', value: 'cost' },
        { label: 'Health', value: 'health' },
        { label: 'Prescriptions', value: 'prescriptions' },
        { label: 'Benefits', value: 'benefits' },
      ],
    },
    {
      name: 'questionType',
      type: 'select',
      required: true,
      label: 'Question Type',
      options: [
        { label: 'Rating (1-5)', value: 'rating' },
        { label: 'Multiple Choice', value: 'multipleChoice' },
        { label: 'Yes/No', value: 'boolean' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Help Text',
      admin: {
        description: 'Additional context or help text for this question',
      },
    },
    {
      name: 'options',
      type: 'array',
      label: 'Response Options',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'basePoints',
          type: 'number',
          required: true,
        },
        {
          name: 'segmentScores',
          type: 'group',
          fields: [
            {
              name: 'minimizer',
              type: 'number',
              required: true,
            },
            {
              name: 'protector',
              type: 'number',
              required: true,
            },
            {
              name: 'preventer',
              type: 'number',
              required: true,
            },
            {
              name: 'manager',
              type: 'number',
              required: true,
            },
            {
              name: 'loyalist',
              type: 'number',
              required: true,
            }
          ]
        }
      ]
    },
    {
      name: 'order',
      type: 'number',
      required: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    }
  ],
  timestamps: true,
}
