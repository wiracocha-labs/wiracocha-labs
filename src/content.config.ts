import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

// Whitepapers sincronizados desde github.com/wiracocha-labs/research con `pnpm paper`.
const research = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    version: z.string(),
    date: z.string(),
    source: z.string(),
  }),
})

export const collections = { research }
