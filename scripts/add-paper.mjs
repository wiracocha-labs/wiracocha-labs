// Sincroniza los whitepapers del repo de research a src/content/research/.
// Uso: pnpm paper
//
// El markdown se commitea al repo del sitio, así el build nunca depende de la red.
// Si el fetch falla, el script corta y deja los archivos como estaban.
import { writeFile, mkdir } from 'node:fs/promises'

const RAW = 'https://github.com/wiracocha-labs/research/raw/main/whitepapers'
const OUT = new URL('../src/content/research/', import.meta.url)

// Un objeto por paper. El slug es la URL: /research/<slug>
const PAPERS = [
  { slug: '0001', path: '0001-compresion-pesos-ia-introduccion/README.md' },
]

const HEADER = /\*\*Whitepaper \d+ · (v[\d.]+)\*\* · ([A-Za-z]+ \d{4})/

await mkdir(OUT, { recursive: true })

for (const paper of PAPERS) {
  const res = await fetch(`${RAW}/${paper.path}`)
  if (!res.ok) {
    console.error(`${paper.slug}: el repo respondió ${res.status}. No escribí nada.`)
    process.exit(1)
  }

  const md = await res.text()
  const title = md.match(/^#\s+(.+)$/m)?.[1]?.trim()
  const header = md.match(HEADER)

  if (!title || !header) {
    console.error(`${paper.slug}: no pude leer el título o la versión. ¿Cambió el formato?`)
    process.exit(1)
  }

  // El H1, los metadatos y el separador los renderiza la página, no el markdown.
  // Se corta en el primer `---` suelto, que marca el arranque del cuerpo.
  const lines = md.split('\n')
  const sep = lines.findIndex((line) => line.trim() === '---')
  const body = (sep >= 0 ? lines.slice(sep + 1) : lines).join('\n').trim()

  const front = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `version: "${header[1]}"`,
    `date: "${header[2]}"`,
    `source: "https://github.com/wiracocha-labs/research/blob/main/whitepapers/${paper.path}"`,
    '---',
    '',
  ].join('\n')

  await writeFile(new URL(`${paper.slug}.md`, OUT), front + body + '\n')
  console.log(`${paper.slug}: ${title} (${header[1]}, ${header[2]})`)
}
