// Engineering notes (blog). Each post is a list of blocks rendered by pages/Note.
// Block types: p, h2, list, code, callout, diagram.
// Set `draft: true` to hide a post from the Notes index (it stays reachable by URL for review).

export const NOTES = [
  {
    slug: 'migrating-suretalk-without-hanging-up',
    no: 'N-01',
    draft: false,
    title: 'Two databases, one truth: migrating SureTalk without hanging up on anyone',
    dek: 'How we moved a live voice platform from 16 Lambda functions on DynamoDB to a Postgres backend, while the phone line kept taking calls.',
    date: '2026-11-14',
    tags: ['Migration', 'AWS Lambda', 'PostgreSQL', 'Reliability'],
    project: 'suretalk',
    blocks: [
      { type: 'p', text: 'SureTalk lets people record voice notes and voice wills and have them delivered to the people they love, sometimes years later. Customers reach it two ways: by calling a phone line, or through a web app. Both have to agree on who you are, what plan you pay for and which recordings you have. If they disagree, someone’s last message to their family goes missing.' },
      { type: 'p', text: 'The phone line came first. It was built as a fleet of more than sixteen single-purpose AWS Lambda functions on DynamoDB, one function per job: save a voice will, check a free slot, verify a caller, and so on. Twilio calls them directly during a call. It worked, but the web app, billing and admin tools needed a proper relational backend, so SureTalk 2.0 moved them onto Node.js and PostgreSQL.' },
      { type: 'p', text: 'The obvious plan is a big-bang cutover: freeze everything, migrate the data, point the phone line at the new backend, and hope. We didn’t do that. Real customers call every day, and a voice platform that drops calls during a migration is not one you trust with a voice will.' },

      { type: 'h2', text: 'Both systems stay live' },
      { type: 'p', text: 'Instead of replacing the phone line, we connected it. Postgres became the source of truth for accounts, plans and billing, and the Lambda fleet kept serving calls. Every change on one side is sent to the other, in both directions, and nothing is lost if the other side is down.' },
      {
        type: 'diagram',
        caption: 'Two lanes: phone line → app on top, app → phone line below. Every change is written locally first, then delivered with retries',
        diagram: {
          nodes: [
            { id: 'call', label: 'Phone call', sub: 'Twilio', c: 0, r: 0 },
            { id: 'lambda', label: 'Lambda fleet', sub: 'DynamoDB', c: 1, r: 0 },
            { id: 'sync', label: '/api/sync/*', sub: 'bearer token', c: 2, r: 0 },
            { id: 'pg', label: 'Postgres', sub: 'source of truth', c: 3, r: 0 },
            { id: 'web', label: 'Web app', sub: 'Next.js', c: 0, r: 1 },
            { id: 'api', label: 'Express API', sub: 'Node.js', c: 1, r: 1 },
            { id: 'outbox', label: 'sync_outbox', sub: 'retry worker', c: 2, r: 1 },
            { id: 'phone', label: 'Phone line', sub: 'Lambda · DynamoDB', c: 3, r: 1 },
          ],
          edges: [
            { from: 'call', to: 'lambda' },
            { from: 'lambda', to: 'sync', label: 'push change' },
            { from: 'sync', to: 'pg', label: 'idempotent' },
            { from: 'web', to: 'api' },
            { from: 'api', to: 'outbox', label: 'queue change' },
            { from: 'outbox', to: 'phone', label: 'deliver, retry' },
          ],
        },
      },
      { type: 'list', items: [
        'Phone line → app: the Lambdas call a small set of sync endpoints (/api/sync/user, /slot, /schedule, /will, /credential), protected by a shared bearer token. Writes are idempotent: if the same voice will arrives twice, it is stored once.',
        'App → phone line: the app never calls the phone line directly in the middle of a request. It writes the change to a sync_outbox table in the same database, and a background worker delivers it.',
        'The Lambda side does the same thing in reverse, with its own outbox table in DynamoDB and a small retry function that resends anything that didn’t go through.',
      ] },

      { type: 'h2', text: 'An outbox that retries patiently' },
      { type: 'p', text: 'The outbox worker runs every two minutes. It picks up to twenty pending changes, sends each one, and marks it sent. If the phone line is down, it waits longer each time: 4 minutes, then 8, 16, 32, 64, 128, then every 4 hours. Twelve tries cover about a day, so a short outage fixes itself and nobody has to press Retry.' },
      { type: 'code', lang: 'sql', text: `SELECT id, event_type, payload, attempts
FROM sync_outbox
WHERE status IN ('pending', 'failed')
  AND attempts < $1
  AND (last_attempt_at IS NULL
       OR last_attempt_at < NOW() - LEAST(power(2, attempts) * INTERVAL '2 minutes', INTERVAL '4 hours'))
FOR UPDATE SKIP LOCKED
LIMIT 20` },
      { type: 'p', text: 'Two details matter here. FOR UPDATE SKIP LOCKED means two copies of the backend can run the worker at the same time without sending the same change twice. And the database connection is released before any network call, so a slow phone line can’t tie up the connection pool for the web app.' },
      { type: 'callout', text: 'After the twelfth failed try, a change is marked dead, an alert email goes out, and it shows up in the admin "Failed syncs" screen with the error. Failures are loud, never silent.' },

      { type: 'h2', text: 'Trust, but check every night' },
      { type: 'p', text: 'Retries handle outages. They don’t handle bugs, or a change someone made by hand. So every night a reconciler compares every customer in Postgres with their phone-line account in DynamoDB.' },
      { type: 'list', items: [
        'Where the app is clearly the source of truth (plan, suspension, deletion), it fixes the phone line automatically.',
        'Where it is ambiguous, for example a customer who subscribed during a phone call with a Stripe subscription the app hasn’t seen yet, it only reports the difference for a person to review.',
        'Recordings are matched by the recording itself, so a voice note that exists on one side but not the other is flagged and can be copied across in one click.',
        'A safety brake: if it finds more than 25 differences in one night, it changes nothing and reports instead. That many differences means something upstream is wrong, and an automatic fix would make it worse.',
        'A Postgres advisory lock makes sure only one copy of the backend runs it.',
      ] },

      { type: 'h2', text: 'Going live in reversible steps' },
      { type: 'p', text: 'The Lambda functions were exported and updated in phases rather than all at once, so each group could be tested against real calls before the next. The final go-live was a scripted checklist: back up first, clean up old test data in the app, clean up the phone line, then lock down database access. Every step that changed data saved a "before" snapshot and had a matching undo script.' },
      { type: 'p', text: 'None of this is clever. It is the same thinking you would use to replace a pump in a running factory: keep the old one running, install the new one beside it, connect them, check they agree, and only then switch the load over, with a way back at every step.' },

      { type: 'h2', text: 'What we’d tell anyone doing this' },
      { type: 'list', items: [
        'Never call the other system inside a user’s request. Write the change locally, then deliver it in the background.',
        'Make every incoming sync idempotent. Retries mean duplicates are normal, not rare.',
        'Back off on failure, give up loudly, and show failures somewhere a human will see them.',
        'Reconcile on a schedule, and put a limit on how much an automatic fix is allowed to change.',
        'Make every destructive step reversible before you run it.',
      ] },
    ],
  },
]

// Drafts appear in the index only during local development (npm run dev).
export const PUBLISHED = NOTES.filter((n) => !n.draft || import.meta.env.DEV)

export function getNote(slug) {
  return NOTES.find((n) => n.slug === slug)
}

export function readingTime(note) {
  const words = note.blocks
    .map((b) => b.text || (b.items || []).join(' ') || '')
    .join(' ')
    .split(/\s+/).length
  return Math.max(1, Math.round(words / 220))
}
