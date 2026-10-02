# 🌌 Wiracocha Labs — website

Source of [wiracochalabs.com](https://wiracochalabs.com) — the public site of
Wiracocha Labs, an open-source research and incubation organization focused on
decentralized infrastructure, built from Latin America.

- **Organization profile:** [github.com/wiracocha-labs](https://github.com/wiracocha-labs)
- **Contact:** wiracochalabs@protonmail.com

## Projects

| Project | Description | Status |
|---|---|---|
| [chasqui-app](https://github.com/wiracocha-labs/chasqui-app) | Decentralized communication platform for remote teams | In development |
| [quipu-ipfs](https://github.com/wiracocha-labs/quipu-ipfs) | Decentralized P2P network in Rust | In development |
| [chaka](https://github.com/wiracocha-labs/chaka) | Research: delta compression between model versions | Researching |
| [yachay](https://github.com/wiracocha-labs/yachay) | Local AI model recommender for your hardware | Released (v0.1.0) |
| [research](https://github.com/wiracocha-labs/research) | Whitepapers and experiment logs | Active |

Vision, principles, and roadmap live in the
[org profile README](https://github.com/wiracocha-labs/.github).

## Stack

- [Astro](https://astro.build) — static site, no server runtime
- Tailwind CSS v4
- Node >= 22.12, pnpm

## Development

```bash
pnpm install

# Dev server — run it in background mode (see AGENTS.md)
pnpm astro dev --background
pnpm astro dev status   # / stop / logs

# Production build → dist/
pnpm build
pnpm preview
```

Content and copy live in `src/pages/index.astro` (single-page site).

## Deployment

Fully static build (`dist/`). Deployment is configured in the hosting
provider connected to this repository — there is no CI workflow in this repo.

## License

AGPL-3.0 — see [LICENSE](./LICENSE).

---

*Named after Wiracocha — the Andean creator deity. Open research, built in
public.*
