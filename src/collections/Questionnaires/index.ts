// /src/collections/Questionnaires/index.ts
import { type CollectionConfig } from 'payload'
import { submitQuestionnaire } from './endpoints/submitQuestionnaire'

const Questionnaires: CollectionConfig = {
  slug: 'Questionnaires',
  admin: {
    useAsTitle: 'id',
  },
  endpoints: [
    submitQuestionnaire
  ],
  fields: [
    {
      name: 'responses',
      type: 'json',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Started',
          value: 'started',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
      ],
      defaultValue: 'started',
      required: true,
    },
    {
      name: 'submittedAt',
      type: 'date',
      admin: {
        date: {
          displayFormat: 'yyyy-MM-dd HH:mm',
        },
      },
    },
  ],
}

// Export both as default and named export
export { Questionnaires }
export default Questionnaires
