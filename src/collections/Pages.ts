// src/collections/Pages.ts
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Basic fields
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'This will be used as the URL for this page',
      },
    },

    // Relationships and hierarchy
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'page-categories',
      required: true,
      admin: {
        description: 'Select the primary category/pillar for this page',
      },
    },
    {
      name: 'parentPage',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        description: 'Select a parent page if this page should be nested under another page',
      },
    },
    {
      name: 'breadcrumb',
      type: 'array',
      admin: {
        description: 'Custom breadcrumb path (leave empty to use the default path)',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
        },
      ],
    },

    // Display and template options
    {
      name: 'pageTemplate',
      type: 'select',
      required: true,
      defaultValue: 'standard',
      options: [
        { label: 'Standard Page', value: 'standard' },
        { label: 'Landing Page', value: 'landing' },
        { label: 'Comparison Page', value: 'comparison' },
        { label: 'FAQ Page', value: 'faq' },
      ],
    },
    {
      name: 'isVisible',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Controls visibility in navigation',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Controls sorting within category',
      },
    },

    // Content blocks
    {
      name: 'content',
      type: 'blocks',
      blocks: [
        {
          slug: 'text',
          labels: {
            singular: 'Text',
            plural: 'Texts'
          },
          fields: [
            {
              name: 'text',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          slug: 'image',
          labels: {
            singular: 'Image',
            plural: 'Images'
          },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'caption',
              type: 'text',
            },
            {
              name: 'size',
              type: 'select',
              defaultValue: 'normal',
              options: [
                { label: 'Small', value: 'small' },
                { label: 'Normal', value: 'normal' },
                { label: 'Large', value: 'large' },
                { label: 'Full Width', value: 'fullWidth' },
              ],
            },
          ],
        },
        {
          slug: 'callToAction',
          labels: {
            singular: 'Call to Action',
            plural: 'Call to Actions'
          },
          fields: [
            {
              name: 'headline',
              type: 'text',
              required: true,
            },
            {
              name: 'text',
              type: 'textarea',
            },
            {
              name: 'buttonText',
              type: 'text',
            },
            {
              name: 'buttonLink',
              type: 'text',
            },
          ],
        },
        {
          slug: 'benefitsList',
          labels: {
            singular: 'Benefits List',
            plural: 'Benefits Lists'
          }
          ,
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'benefits',
              type: 'array',
              fields: [
                {
                  name: 'benefit',
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
          slug: 'faqBlock',
          labels: {
            singular: 'Faq Section',
            plural: 'Faq Sections',
          },          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'faqs',
              type: 'array',
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'answer',
                  type: 'richText',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          slug: 'planComparisonTable',
          labels: {
            singular: 'Plan Comparison Table',
            plural: 'Plan Comparison Tables',
          },          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'plans',
              type: 'array',
              fields: [
                {
                  name: 'planName',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'planFeatures',
                  type: 'array',
                  fields: [
                    {
                      name: 'feature',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    // Related content
    {
      name: 'relatedPages',
      type: 'relationship',
      relationTo: 'pages',
      hasMany: true,
      admin: {
        description: 'Select pages that are related to this content',
      },
    },

    // Canonicalization
    {
      name: 'canonicalType',
      type: 'select',
      defaultValue: 'self',
      options: [
        { label: 'Self (Default)', value: 'self' },
        { label: 'Other Page', value: 'other' },
        { label: 'None', value: 'none' },
      ],
      admin: {
        description:
          'Controls how search engines understand this page in relation to similar content',
      },
    },
    {
      name: 'canonicalPage',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        condition: (data) => data?.canonicalType === 'other',
        description: 'Select the canonical version of this page',
      },
    },
    {
      name: 'canonicalURL',
      type: 'text',
      admin: {
        condition: (data) => data?.canonicalType === 'other' && !data?.canonicalPage,
        description: 'Enter external canonical URL (only if "Other Page" is not selected)',
      },
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Prevent search engines from indexing this page',
      },
    },

    // SEO fields
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: {
            description:
              'Override the default page title for search engines (leave blank to use page title)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: {
            description: 'Brief description of this page for search results and social sharing',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Image for social sharing (Facebook, Twitter, etc.)',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          admin: {
            description: 'Comma-separated keywords (less important for modern SEO)',
          },
        },
      ],
    },

    // Publishing status
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

export default Pages
