// Site-wide content: company details, services, process, founder timeline and toolkit.

export const COMPANY = {
  brand: 'Stack Technologies',
  legalName: 'StackCoding Technologies',
  regNo: 'BN 9598602',
  city: 'Ibadan, Nigeria',
  email: 'stacktechnologies0@gmail.com',
  github: 'https://github.com/stack-Tech-1',
  linkedin: 'https://www.linkedin.com/in/precious-adetipe',
  founder: 'Precious Oreoluwa Adetipe',
  url: 'https://stackcodes.tech',
}

export const SERVICES = [
  {
    code: 'S-01',
    title: 'Web platforms & SaaS',
    body: 'Dashboards, portals and subscription products, from the database schema to the last loading state.',
    deliverables: ['Next.js / React apps', 'REST & realtime APIs', 'Auth, roles & 2FA', 'Subscriptions & billing'],
    proof: ['suretalk', 'dept-exec', 'amah'],
  },
  {
    code: 'S-02',
    title: 'E-commerce & payments',
    body: 'Stores that take real money safely, with payment webhooks that are verified and idempotent.',
    deliverables: ['Storefront & checkout', 'Paystack / Stripe', 'Order & admin dashboards', 'Brand-led design'],
    proof: ['elevens-touch', 'suretalk'],
  },
  {
    code: 'S-03',
    title: 'Business systems & ERP',
    body: 'Internal tools that replace spreadsheets and WhatsApp: workflows, approvals, documents and reports.',
    deliverables: ['Approval workflows', 'Vendor & procurement', 'Bilingual (EN/AR, RTL)', 'Excel & PDF exports'],
    proof: ['procurement-erp', 'dept-exec', 'dpms'],
  },
  {
    code: 'S-04',
    title: 'AI, automation & bots',
    body: 'AI that does real work inside your system, plus bots, telephony and integrations that run unattended.',
    deliverables: ['Claude / Gemini integration', 'Telegram & IVR bots', 'Scheduled automation', 'Trading & data bridges'],
    proof: ['procurement-erp', 'telegram-bot', 'tradingbot', 'ayo'],
  },
]

// Engineering-style process: the same stages used to commission a physical system.
export const PROCESS = [
  {
    step: '01',
    title: 'Survey',
    body: 'We map how the work actually happens today: who does what, where it breaks, and what success looks like in numbers.',
    out: 'Scope & success metrics',
  },
  {
    step: '02',
    title: 'Draft',
    body: 'Architecture and data model drawn up before code. You see the system on paper and sign off on it.',
    out: 'System drawing & plan',
  },
  {
    step: '03',
    title: 'Build',
    body: 'Short cycles with working software you can click every week, not a big reveal at the end.',
    out: 'Weekly working builds',
  },
  {
    step: '04',
    title: 'Commission',
    body: 'Launch, hand-over and support: monitoring, documentation and a system your team can run.',
    out: 'Live system & handover',
  },
]

// Founder revision history, newest first.
export const TIMELINE = [
  {
    rev: 'R5',
    when: '2026 — now',
    title: 'Founder, Amah',
    body: 'Designed, built and launched a realtime games platform at playamah.app.',
  },
  {
    rev: 'R4',
    when: '2026',
    title: 'Registered Stack Technologies',
    body: 'Registered with the Corporate Affairs Commission as StackCoding Technologies.',
  },
  {
    rev: 'R3',
    when: '2026',
    title: 'Freelance software developer',
    body: 'Procurement ERP for a Saudi real-estate developer, and a live store for Eleven’s Touch, via Upwork and Fiverr.',
  },
  {
    rev: 'R2',
    when: '2025 — now',
    title: 'Lead developer, SureTalk',
    body: 'Leading the web app, phone-call system and company site for a voice platform with paying users.',
  },
  {
    rev: 'R1',
    when: 'Graduating Dec 2026',
    title: 'B.Sc. Industrial & Production Engineering',
    body: 'University of Ibadan. General Secretary of the Industrial Engineering Students’ Association (IESA).',
  },
]

// Toolkit, laid out as a bill of materials.
export const TOOLKIT = [
  { part: 'Interface', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { part: 'Services', items: ['Node.js', 'Express', 'Python', 'REST', 'WebSockets'] },
  { part: 'Data', items: ['PostgreSQL', 'Prisma', 'MongoDB', 'DynamoDB', 'Supabase'] },
  { part: 'Cloud', items: ['AWS (Lambda, S3, SES, App Runner)', 'Docker', 'Vercel', 'Railway', 'Netlify'] },
  { part: 'Integrations', items: ['Stripe', 'Paystack', 'Twilio', 'Telegram API', 'Webhooks'] },
  { part: 'AI & other', items: ['Claude API', 'Gemini', 'MQL5', 'Godot / GDScript'] },
]
