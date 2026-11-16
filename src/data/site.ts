export const SUBSTACK = 'https://wiracochalabs.substack.com'

// Rutas absolutas a propósito: el mismo nav sirve en /, /blog, /privacy y /terms.
// En la home, /#projects no recarga porque la URL sin el hash es la misma.
export const nav = {
  brand: { label: 'Wiracocha Labs', href: '/' },
  logo: { src: '/logo.png', alt: 'Wiracocha Labs logo' },
  links: [
    { label: 'Projects', href: '/#projects' },
    { label: 'Roadmap', href: '/#roadmap' },
    { label: 'How to help', href: '/#help' },
    { label: 'Blog', href: '/#blog' },
  ],
}

export const footer = {
  tagline: 'Wiracocha Labs — Open research, built in public.',
  license: 'AGPL-3.0 — Open source',
  links: [
    { label: 'GitHub', href: 'https://github.com/wiracocha-labs' },
    { label: 'Instagram', href: 'https://www.instagram.com/wiracocha_labs/' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
}
