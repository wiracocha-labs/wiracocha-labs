// Agrega un post de Substack a src/data/blog.json a partir de su URL.
// Uso: pnpm post https://wiracochalabs.substack.com/p/mi-post
//      pnpm post mi-post
import { readFile, writeFile } from 'node:fs/promises'

const FEED = 'https://wiracochalabs.substack.com/feed'
const FILE = new URL('../src/data/blog.json', import.meta.url)

const arg = process.argv[2]
if (!arg) {
  console.error('Falta la URL. Uso: pnpm post <url de Substack o slug>')
  process.exit(1)
}

const slug = arg.match(/\/p\/([^/?#]+)/)?.[1] ?? arg.replace(/^\/+|\/+$/g, '')

const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')

const clean = (s) => {
  const text = s
    .replace(/^<!\[CDATA\[|\]\]>$/g, '')
    .replace(/<[^>]+>/g, '')
  return decode(text)
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/ ,/g, ',')
    .replace(/ \./g, '.')
}

const pick = (re, text) => text.match(re)?.[1] ?? ''

const res = await fetch(FEED)
if (!res.ok) {
  console.error(`El feed respondió ${res.status}. No escribí nada.`)
  process.exit(1)
}

const item = (await res.text())
  .match(/<item>[\s\S]*?<\/item>/g)
  ?.find((it) => clean(pick(/<link>([\s\S]*?)<\/link>/, it)).endsWith(`/p/${slug}`))

if (!item) {
  console.error(`"${slug}" no aparece en el feed. ¿Está publicado y es público?`)
  process.exit(1)
}

const body = pick(/<content:encoded>([\s\S]*?)<\/content:encoded>/, item).replace(
  /<figure[\s\S]*?<\/figure>/g,
  ' ',
)

const paragraphs = [...body.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)]
  .map((m) => clean(m[1]))
  .filter((p) => p.length > 60 && !p.toLowerCase().includes('bitácora'))

const post = {
  slug,
  title: clean(pick(/<title>([\s\S]*?)<\/title>/, item)),
  subtitle: clean(pick(/<description>([\s\S]*?)<\/description>/, item)).replace(/^\*|\*$/g, ''),
  excerpt: paragraphs[0] ?? '',
  date: new Date(pick(/<pubDate>([\s\S]*?)<\/pubDate>/, item)).toISOString().slice(0, 10),
  image: pick(/<enclosure url="([^"]+)"/, item).replace(
    /f_auto,q_auto:good,[^/]*/,
    'f_auto,q_auto:good,w_640',
  ),
}

if (!post.excerpt) {
  console.error('No encontré un primer párrafo usable. No escribí nada.')
  process.exit(1)
}

const posts = JSON.parse(await readFile(FILE, 'utf8'))
if (posts.some((p) => p.slug === slug)) {
  console.log(`"${slug}" ya estaba. No dupliqué nada.`)
  process.exit(0)
}

posts.push(post)
posts.sort((a, b) => a.date.localeCompare(b.date))
await writeFile(FILE, `${JSON.stringify(posts, null, 2)}\n`)

console.log(`Agregado: ${post.date} · ${post.title}`)
console.log(`Total: ${posts.length} posts (se muestran los 3 últimos).`)
