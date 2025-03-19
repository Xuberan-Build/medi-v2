// payload.config.ts
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Questions } from './collections/Questions'
import { Plans } from './collections/Plans'
import { Segments } from './collections/Segments'
import { Recommendations } from './collections/Recommendations'
import { Questionnaires } from './collections/Questionnaires'
import { Pages } from './collections/Pages'
import { PageCategories } from './collections/PageCategories'
import { Links } from './collections/Links'

import { seed } from './seeds/seedData'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Questions,
    Plans,
    Segments,
    Recommendations,
    Questionnaires,
    Pages,
    PageCategories,
    Links,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [payloadCloudPlugin()],
  onInit: async (payload) => {
    console.log('Starting initialization and seeding process...')
    try {
      await seed(payload)
      console.log('Seeding completed successfully')
    } catch (err) {
      console.error('Error during seeding:', err)
    }
  },
})
