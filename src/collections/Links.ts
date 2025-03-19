// src/collections/Links.ts
import type { CollectionConfig } from 'payload'

export const Links: CollectionConfig = {
  slug: 'links',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'linkType', 'linkCategory', 'order'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      label: 'Link Text',
    },
    {
      name: 'linkType',
      type: 'select',
      required: true,
      defaultValue: 'internal',
      options: [
        { label: 'Internal Page', value: 'internal' },
        { label: 'External URL', value: 'external' },
        { label: 'File Download', value: 'file' },
        { label: 'Email Address', value: 'email' },
      ],
    },
    {
      name: 'internalPage',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      admin: {
        condition: (data) => data?.linkType === 'internal',
        description: 'Select the page to link to',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        condition: (data) => ['external', 'file'].includes(data?.linkType),
        description: 'Enter the full URL, including https://',
      },
    },
    {
      name: 'emailAddress',
      type: 'email',
      required: true,
      admin: {
        condition: (data) => data?.linkType === 'email',
        description: 'Enter the email address',
      },
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Open link in a new browser tab',
        condition: (data) => data?.linkType !== 'email',
      },
    },
    {
      name: 'linkCategory',
      type: 'select',
      required: true,
      defaultValue: 'in-content',
      options: [
        { label: 'Main Navigation', value: 'main-navigation' },
        { label: 'Footer', value: 'footer' },
        { label: 'Sidebar', value: 'sidebar' },
        { label: 'In-Content Link', value: 'in-content' },
        { label: 'Resource Link', value: 'resource' },
      ],
      admin: {
        description: 'Where this link will be used',
      },
    },
    {
      name: 'parentLink',
      type: 'relationship',
      relationTo: 'links',
      admin: {
        description: 'If this is a child link in a dropdown, select the parent link',
        condition: (data) => ['main-navigation', 'footer'].includes(data?.linkCategory),
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Controls the display order',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional icon for the link',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional description text (for mega-menus or tooltips)',
      },
    },
  ],
  timestamps: true,
}

export default Links
