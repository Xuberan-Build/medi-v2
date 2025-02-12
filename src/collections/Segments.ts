//Segments.ts
import type { CollectionConfig } from 'payload'

export const Segments: CollectionConfig = {
  slug: 'segments',
  admin: {
    useAsTitle: 'name',
    group: 'Medicare',
    description: 'User segments for Medicare plan recommendations'
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
      label: 'Segment Name',
    },
    {
      name: 'segmentId',
      type: 'select',
      required: true,
      options: [
        { label: 'Minimizer', value: 'minimizer' },
        { label: 'Protector', value: 'protector' },
        { label: 'Preventer', value: 'preventer' },
        { label: 'Manager', value: 'manager' },
        { label: 'Loyalist', value: 'loyalist' },
      ],
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'characteristics',
      type: 'array',
      required: true,
      minRows: 3,
      maxRows: 10,
      fields: [
        {
          name: 'trait',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'scoringCriteria',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'dimension',
          type: 'select',
          required: true,
          options: [
            { label: 'Provider Preference', value: 'provider' },
            { label: 'Cost Sensitivity', value: 'cost' },
            { label: 'Health Status', value: 'health' },
            { label: 'Prescription Needs', value: 'prescriptions' },
            { label: 'Additional Benefits', value: 'benefits' },
          ],
        },
        {
          name: 'weight',
          type: 'number',
          required: true,
          min: 0,
          max: 1,
          admin: {
            description: 'Weight between 0 and 1',
          },
        },
        {
          name: 'preferredScore',
          type: 'number',
          required: true,
          min: 1,
          max: 5,
          admin: {
            description: 'Ideal score for this dimension (1-5)',
          },
        },
      ],
    },
    {
      name: 'planAffinities',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'planType',
          type: 'relationship',
          relationTo: 'plans',
          required: true,
        },
        {
          name: 'affinityScore',
          type: 'number',
          required: true,
          min: 0,
          max: 100,
          admin: {
            description: 'How well this segment matches with the plan type (0-100)',
          },
        },
        {
          name: 'reasonings',
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
      name: 'matchThresholds',
      type: 'group',
      fields: [
        {
          name: 'highConfidence',
          type: 'number',
          required: true,
          min: 0,
          max: 100,
          defaultValue: 80,
        },
        {
          name: 'mediumConfidence',
          type: 'number',
          required: true,
          min: 0,
          max: 100,
          defaultValue: 60,
        },
        {
          name: 'lowConfidence',
          type: 'number',
          required: true,
          min: 0,
          max: 100,
          defaultValue: 40,
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
