import { buildConfig } from 'payload/config'
import { slateEditor } from '@payloadcms/richtext-slate'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { Users } from './collections/Users'
import { Products } from './collections/Products'
import { Media } from './collections/Media'
import { ProductFiles } from './collections/ProductFiles'
import { Orders } from './collections/Orders'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [Users, Products, Media, ProductFiles, Orders],
  routes: {
    admin: '/admin',
  },
  admin: {
    user: 'users',
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- Payload Store',
      favicon: '/favicon.ico',
      ogImage: '/og.jpg',
    },
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
