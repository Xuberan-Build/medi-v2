// src/collections/PageCategories.ts
import type { CollectionConfig } from 'payload'

export const PageCategories: CollectionConfig = {
  slug: 'page-categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'isMainPillar', 'order'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Category Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the category name (no spaces or special characters)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Category Description',
    },
    {
      name: 'parentCategory',
      type: 'relationship',
      relationTo: 'page-categories',
      label: 'Parent Category',
      admin: {
        description: 'Select a parent category if this is a subcategory',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Controls the sorting order of categories',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Category Icon',
    },
    {
      name: 'isMainPillar',
      type: 'checkbox',
      defaultValue: false,
      label: 'Is Main Content Pillar',
      admin: {
        description: 'Check if this is a main content pillar for SEO purposes',
      },
    },
    {
      name: 'showInMainNav',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show in Main Navigation',
    },
    {
      name: 'showInFooter',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show in Footer',
    },
  ],
  timestamps: true,
}

export default PageCategories
