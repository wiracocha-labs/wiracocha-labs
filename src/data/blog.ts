import raw from './blog.json'
import { SUBSTACK } from './site'

export interface Post {
  slug: string
  title: string
  subtitle: string
  /** Primer párrafo del post, literal; la tarjeta lo recorta con line-clamp. */
  excerpt: string
  date: string
  /** Portada de Substack, ya pedida a 640×360 (w_640). */
  image: string
}

// Lo escribe `pnpm post <url>`. Ordenado de más viejo a más nuevo.
export const posts: Post[] = [...raw].sort((a, b) => a.date.localeCompare(b.date))

/** Solo el slug hace falta: el resto de la URL es siempre el mismo. */
export const postUrl = (slug: string) => `${SUBSTACK}/p/${slug}`
