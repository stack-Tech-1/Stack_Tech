// Central project data — used by both the Projects grid and individual case-study pages.
// Fields: slug, name, tagline, summary (card blurb), tags (flat chips), overview (paragraphs),
// features, techStack ({ category: [items] }), highlights, github, live, screenshots.

export const PROJECTS = [
  {
    slug: 'suretalk',
    name: 'SureTalk 2.0',
    tagline: 'Voice legacy platform; record, schedule, and deliver voice messages that outlast the moment',
    summary:
      "A voice-messaging and digital-legacy platform: record voice notes and voice wills, then deliver them by phone, SMS, or email on a schedule (reachable by phone IVR or web dashboard).",
    tags: ['Next.js', 'Node.js', 'Postgres', 'Twilio', 'Stripe', 'AWS'],
    overview: [
      '"Your voice, preserved forever." SureTalk lets people record voice notes and voice wills and have them delivered to loved ones on demand, or scheduled for a future date or life event by phone call, SMS, or email. It\'s reachable two ways: through a traditional phone-based IVR system, and through a full web dashboard, both backed by the same data.',
      "The product has gone through a real architectural evolution rather than a rewrite-and-cutover. It started as a fleet of 16+ single-purpose AWS Lambda functions sitting on DynamoDB, built around the phone/IVR flow, one Lambda per operation (save a voice will, check slot availability, verify a user, update login state, and so on). Rather than discarding that fleet, SureTalk 2.0 consolidated the web, billing, and admin surface into one Next.js + Express application on Postgres, and kept the legacy Lambda fleet alive by having it push its writes into the new backend through a bearer-token-protected sync API, with idempotency checks and audit logging on every incoming write.",
    ],
    features: [
      'Voice notes and voice wills with per-tier storage limits, favoriting, and soft-delete, stored across three separate S3 buckets',
      'Scheduled delivery via a background worker — Twilio voice call or SMS, or AWS SES email — with delivery status tracked from Twilio webhooks',
      'A sync bridge (/api/sync/*) that lets the legacy Lambda/DynamoDB IVR fleet push user, slot, schedule, and will changes into the new Postgres backend, keeping both systems consistent during migration',
      'Three-tier Stripe subscription billing (Lite / Essential / Legacy Vault) enforced by tier-validation middleware, with full Checkout + webhook-driven state sync',
      'Admin tooling: time-limited user impersonation tokens, storage/bucket analytics, help-desk ticketing',
      'JWT access/refresh auth with TOTP 2FA, phone-OTP verification, and forced-logout support',
    ],
    techStack: {
      Frontend: ['Next.js 16 (App Router, Turbopack)', 'React 19', 'Tailwind CSS', 'Framer Motion', 'AWS Amplify'],
      Backend: ['Node.js', 'Express', 'Docker', 'AWS App Runner', 'PostgreSQL'],
      'Third-party services': ['Twilio (voice/SMS/IVR)', 'Stripe (billing)', 'AWS S3 + SES', 'AWS Lambda + DynamoDB (legacy IVR fleet)'],
    },
    highlights: [
      "A genuine incremental-migration pattern, not a demo architecture: the original 16+ Lambda functions still serve live phone traffic today, bridged into the new consolidated backend via a token-authenticated sync API with idempotency and audit logging — old and new systems kept consistent throughout the transition instead of a risky big-bang cutover.",
      'Full subscription commerce built in: real Stripe-backed pricing tiers gating feature access, not a placeholder paywall.',
    ],
    github: null,
    live: null,
    screenshots: [
      { src: '/images/projects/suretalk/login.jpg', alt: 'SureTalk login screen' },
      { src: '/images/projects/suretalk/signup.jpg', alt: 'SureTalk signup with pricing tiers' },
      { src: '/images/projects/suretalk/about.jpg', alt: 'SureTalk about/marketing page' },
    ],
  },
  {
    slug: 'tradingbot',
    name: 'TradingBot Pro',
    tagline: 'Algorithmic trading system with a live React dashboard',
    summary:
      'An algorithmic trading system for MetaTrader 5 — a custom Expert Advisor with tiered entry logic, bridged over WebSocket to a real-time React dashboard for monitoring and control.',
    tags: ['MQL5', 'Python', 'WebSockets', 'React', 'Vite'],
    overview: [
      "TradingBot Pro pairs an MQL5 Expert Advisor (EA) running inside MetaTrader 5 with a modern web dashboard. The EA evaluates a multi-layered technical strategy on every tick and manages trade entries/exits automatically, but MT5 has no native way to talk to a browser — so the EA writes its state (trades, settings, news events) to shared JSON files, a Python bridge watches those files with a filesystem watcher and re-broadcasts changes over WebSocket, and a React + Vite dashboard renders live candlesticks, positions, and risk in real time. Settings changes flow back the same way in reverse, validated against a typed schema before they ever reach the EA.",
      'The strategy itself is a 4-tier entry system: hard risk gates that can never be overridden, directional bias confirmation, confluence-scored entry signals, and a non-blocking supply/demand zone bonus — a clean separation between "must never trade" conditions and "probably a good trade" scoring.',
    ],
    features: [
      '4-tier entry engine: hard gates (drawdown cap, news blackout, session filter) → directional bias (EMA stacking / BB midline) → 2-of-4 signal confluence (BB breakout, RSI, MA crossover, candle pattern) → non-blocking supply/demand zone bonus (up to 1.5x position size)',
      'Live risk management: per-position tracking, daily drawdown cap, breakeven lock and hedge-on-adverse-move logic',
      'Automated supply/demand zone detection from H1 swing highs/lows, rebuilt every 4 hours with a strength score',
      'Economic calendar integration — pulls the ForexFactory high-impact calendar every 6 hours and blocks entries in a configurable window around news',
      'Per-symbol asset profiles (EURUSD, GBPUSD, XAUUSD, etc.) with their own pip multiplier, spread tolerance, and lot sizing',
      'Real-time dashboard: candlestick chart with EMA/BB/volume overlays, market depth, drawdown gauge, signal log, and a validated settings pipeline that rejects out-of-range input before it reaches the EA',
    ],
    techStack: {
      'Trading engine': ['MQL5 (MetaTrader 5 Expert Advisor)', 'custom JSON parser'],
      Bridge: ['Python', 'websockets', 'watchdog (file watching)', 'schedule'],
      Dashboard: ['React 18', 'Vite 5', 'Tailwind CSS v4', 'lightweight-charts', 'Recharts'],
    },
    highlights: [
      'Bridges a desktop-only trading terminal to a real-time web UI with zero native IPC — a JSON-file dead-drop plus a filesystem watcher stands in for a proper API, which is a pragmatic pattern for a closed platform like MT5.',
      'A validated, bidirectional settings pipeline: the bridge enforces a typed schema with per-field min/max ranges before writing settings back to the EA, so live tuning from the browser carries the same guardrails as a hard-coded input.',
    ],
    github: null,
    live: null,
    screenshots: [{ src: '/images/projects/tradingbot/dashboard.jpg', alt: 'TradingBot Pro dashboard' }],
  },
  {
    slug: 'dept-exec',
    name: 'IESA Exec Portal',
    tagline: 'Governance, elections, and operations platform for a 38-route student association portal',
    summary:
      "A full executive-management portal for a university student association — e-voting elections, task/meeting tracking, attendance via QR, welfare tickets, and an AI assistant, replacing spreadsheets and WhatsApp entirely.",
    tags: ['Next.js', 'TypeScript', 'Socket.io', 'Zod', 'Gemini AI'],
    overview: [
      "Built for the Industrial & Production Engineering Students' Association (IESA) at the University of Ibadan, this portal replaces the usual spreadsheets-and-WhatsApp mess of running a student association's executive committee with one system: governance (elections, handover between officers), operations (tasks, meetings, minutes, attendance, calendar), member services (welfare tickets, events, self-registration), and communication (real-time notifications, an AI assistant, reporting).",
      "It's a substantial build — 38 distinct page routes and roughly 26,000 lines of TypeScript across two roles (Admin and Exec, split into 11 named committee positions), fully contract-driven against a separate REST backend rather than bundling business logic into the frontend.",
    ],
    features: [
      'Full e-voting subsystem: candidate management, live open/pause/close control, shareable public ballots verified by matric number + one-time email code, and live vote tallies over WebSocket with a full audit trail',
      'QR-code attendance: admin generates a 6-character code + QR per session, members self-check-in, and the roster updates live over sockets',
      'Structured handover workflow: a 7-section executive transition document with autosave and a DRAFT → SUBMITTED → ACKNOWLEDGED flow between outgoing and incoming officers',
      'Welfare ticketing: anonymous or identified complaint submission, public status lookup, and admin triage with public/internal notes',
      'AI Assistant chat proxied server-side to Gemini, plus event/picnic ticketing with QR tickets gated on payment confirmation',
      'Role-aware route protection via Next.js middleware — an explicit allowlist for public routes (invite joins, public ballots, guest tickets) with everything else redirected to login',
    ],
    techStack: {
      Frontend: ['Next.js 16 (App Router, Turbopack)', 'TypeScript', 'React 19', 'Tailwind CSS 4', 'shadcn/ui (Radix)', 'Framer Motion'],
      Data: ['React Hook Form + Zod', 'Axios (auth-interceptor-based auto-logout)', 'Chart.js / Recharts'],
      'Real-time & testing': ['Socket.io-client', 'Vitest + React Testing Library'],
    },
    highlights: [
      'A genuinely full-scope governance system: live e-voting with identity verification and an audit trail is not a small feature to get right, and it sits alongside attendance, welfare, and handover workflows in the same portal.',
      '38 routes and ~26k lines of TypeScript, cleanly contract-driven against a separate backend — the kind of scale and separation of concerns that distinguishes a real internal tool from a CRUD demo.',
    ],
    github: null,
    live: null,
    screenshots: [
      { src: '/images/projects/dept-exec/login.jpg', alt: 'IESA Exec Portal login screen' },
      { src: '/images/projects/dept-exec/welfare.jpg', alt: 'Welfare ticket submission form' },
    ],
  },
  {
    slug: 'procurement-erp',
    name: 'Procurement ERP',
    tagline: 'AI-assisted procurement & contracts platform for a real-estate developer',
    summary:
      'A full internal ERP for a real-estate development firm’s procurement department — vendor qualification, RFQs, purchase orders, contracts, and multi-step approvals, with Claude wired directly into vendor scoring.',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Claude API', 'AWS S3'],
    overview: [
      'Built for KUN Real Estate, a Saudi Arabia-based real-estate developer, this ERP runs the entire supplier-to-payment lifecycle for its Procurement & Contracts Department: vendor onboarding and qualification, RFQ issuance and bid comparison, purchase orders, contracts, interim payment certificates, material submittals, shop drawings, deliveries, and project budgets — with a role-based dashboard for internal staff and a separate portal for external vendors to register, submit qualifications, and respond to RFQs.',
      'The data model reflects real construction-procurement complexity: 60+ interrelated Prisma models covering procurement, finance, and construction-specific documents, tied together by a configurable multi-step approval-workflow engine rather than a single hardcoded sign-off chain.',
    ],
    features: [
      'AI-assisted vendor qualification: live vendor/document/RFQ data is fed to Claude, which returns a structured 0–100 score, A–D class, and risk level that gets written back into the vendor record to drive downstream RFQ matching',
      'A bilingual (EN/AR, RTL-aware) internal Q&A assistant grounded in live vendor/RFQ/task/KPI data',
      'Configurable multi-step approval workflows via templated workflow/step/instance/action models',
      '2FA-secured accounts (TOTP + backup codes) gating JWT issuance behind a second factor',
      'S3-backed document pipeline for vendor documents and shop drawings, with server-generated Excel and PDF exports',
      'Scheduled automation via node-cron: daily/weekly digests, document-expiry alerts, and task escalation',
    ],
    techStack: {
      Frontend: ['Next.js 15', 'React 19', 'Material UI', 'i18next (EN/AR, RTL)', 'Recharts'],
      Backend: ['Node.js', 'Express 5', 'Prisma 6', 'PostgreSQL'],
      'Third-party services': ['Claude API (vendor scoring & assistant)', 'Supabase', 'AWS S3'],
    },
    highlights: [
      'Real AI-in-the-loop procurement, not a chatbot bolted on the side: Claude scores vendors from live database context and the structured result feeds directly back into the relational model that drives RFQ matching.',
      'A genuinely enterprise-shaped schema — 60+ Prisma models spanning procurement, finance, and construction documents, with a configurable approval-workflow engine underneath.',
    ],
    github: null,
    live: null,
    screenshots: [
      { src: '/images/projects/procurement-erp/login.jpg', alt: 'KUN Real Estate procurement login screen' },
    ],
  },
  {
    slug: 'elevens-touch',
    name: "Eleven's Touch",
    tagline: 'Full e-commerce storefront for a luxury fashion brand',
    summary:
      'A real, live e-commerce storefront for a Nigerian luxury fashion brand — full catalog, cart, wishlist, and checkout, with Paystack payments and a custom couture-inspired design system.',
    tags: ['Next.js', 'MongoDB', 'Paystack', 'Framer Motion', 'TypeScript'],
    overview: [
      'Eleven\'s Touch is a working online store for a Nigerian luxury fashion retailer founded in 2020 in Ibadan, Oyo State — curated women\'s fashion (dresses, sets, accessories, outerwear) with brand copy that leans into Nigerian heritage (Adire, Ankara, Aso-oke) as part of its luxury story. This isn\'t a template storefront: it\'s a full shopping experience — catalog, cart, wishlist, multi-step checkout, and order history — backed by a real Node/Express + MongoDB API handling live Paystack payments.',
      'The visual identity is distinct from a typical storefront: a deep burgundy and warm blush palette with a mauve accent, Cinzel Decorative display type paired with Playfair Display body text, full-bleed photography, and scroll-triggered animation throughout — built to feel like a boutique, not a discount retailer.',
    ],
    features: [
      'Full storefront: category browsing, filterable shop page, product detail pages, cart and wishlist sidebars, multi-step checkout — each backed by its own React context',
      'Live Paystack payment integration with a signed webhook (HMAC-SHA512 signature verification) that updates order status on successful charge, with idempotency handling against duplicate webhook delivery',
      'JWT authentication with bcrypt hashing and an admin dashboard with per-user order/spend analytics via MongoDB aggregation pipelines',
      'Animated landing page: staggered hero reveals, scroll-triggered section animations, and a marquee announcement strip, all via Framer Motion',
      'Validated contact form (React Hook Form + Zod)',
      'Hardened API: Helmet, origin-restricted CORS, rate limiting on auth routes, and NoSQL-injection sanitization',
    ],
    techStack: {
      Frontend: ['Next.js 16 (App Router, Turbopack)', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'shadcn / base-ui', 'Framer Motion'],
      Backend: ['Node.js', 'Express 5', 'MongoDB / Mongoose', 'JWT + bcrypt'],
      'Third-party services': ['Paystack (payments)', 'Cloudinary (media)', 'Railway (backend hosting)'],
    },
    highlights: [
      'A properly engineered payment webhook: the Paystack route is mounted before the JSON body parser (using a raw body) specifically so its HMAC signature can be verified — a subtlety that trips up a lot of Express webhook integrations — with duplicate-delivery guarding on top.',
      'A cohesive, non-generic brand identity carried all the way through: custom color palette, display typography, and motion design tuned for a luxury-fashion audience rather than a default component-library look.',
    ],
    github: null,
    live: null,
    screenshots: [
      { src: '/images/projects/elevens-touch/home.jpg', alt: "Eleven's Touch homepage" },
      { src: '/images/projects/elevens-touch/shop.jpg', alt: "Eleven's Touch shop page" },
      { src: '/images/projects/elevens-touch/about.jpg', alt: "Eleven's Touch brand story page" },
    ],
  },
  {
    slug: 'telegram-bot',
    name: 'Image Uniquification Bot',
    tagline: 'AI-powered Telegram bot for generating unique image variations',
    summary:
      'A Telegram bot for creators and sellers who need to post the same photo many times without it reading as duplicate content — generates AI-backed unique variations in bulk.',
    tags: ['Python', 'Telegram Bot API', 'Pillow', 'SQLite', 'Railway'],
    overview: [
      'Built for creators, dropshippers, and social-media sellers, this bot takes a single product or portrait photo and produces 1–10 pixel-different variations by compositing the subject onto freshly AI-generated backgrounds and running each copy through a randomized effects pipeline — so every post looks natural but no two are identical. Settings can be saved as shareable "templates" via export codes, and reused across accounts.',
      'The standout piece is the background-generation pipeline: six independent async workers continuously pull from six different AI image APIs (Pollinations, Stable Horde, Together.ai, fal.ai, Prodia, Gemini) into a warm SQLite-backed cache, with a self-healing scheduler that restarts dead workers and tops up the pool automatically — so users get instant results instead of waiting on a live generation call.',
    ],
    features: [
      'Menu-driven conversational UX (inline keyboards, not slash commands) with state persisted across restarts',
      'Batch generation of 1–10 unique variants per photo with per-user tunable settings',
      'Full effects pipeline: procedural noise, Gaussian blur, transparency, corner radius, film-grain/snow overlays',
      'Shareable template system — settings encoded into a checksummed export code and re-importable by any user',
      'Six-provider AI background pool with automatic dead-worker detection and self-replenishment',
      'Admin controls for manual background generation and pool monitoring',
    ],
    techStack: {
      Bot: ['Python 3.11', 'python-telegram-bot', 'APScheduler'],
      'Image processing': ['Pillow', 'NumPy'],
      Storage: ['SQLite'],
      'Third-party AI services': ['Pollinations', 'Stable Horde', 'Together.ai', 'fal.ai', 'Prodia', 'Google Gemini', 'Cloudflare Workers AI'],
      Deployment: ['Railway'],
    },
    highlights: [
      'A production-grade multi-provider AI pipeline with automatic failover across six independently flaky third-party APIs — most bot projects call one API and hope for the best.',
      'A self-contained template export/import system (checksummed, URL-safe codes) that lets users share configurations without any shared backend state.',
    ],
    github: null,
    live: null,
    screenshots: [],
  },
]

export function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug)
}
