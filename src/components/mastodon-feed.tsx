const DEFAULT_MASTODON_URL = 'https://mastodon.social/@lucashorta'
const DEFAULT_MASTODON_HANDLE = 'lucashorta'
const DEFAULT_MASTODON_HOST = 'mastodon.social'

interface MastodonFeedProps {
  mastodonUrl?: string | null
}

interface MastodonAccount {
  id: string
  acct: string
  url: string
  display_name: string
  avatar: string
}

interface MastodonStatus {
  id: string
  url: string
  created_at: string
  content: string
  replies_count: number
  reblogs_count: number
  favourites_count: number
}

function parseMastodonProfile(mastodonUrl?: string | null) {
  if (!mastodonUrl) {
    return {
      profileUrl: DEFAULT_MASTODON_URL,
      host: DEFAULT_MASTODON_HOST,
      handle: DEFAULT_MASTODON_HANDLE,
    }
  }

  try {
    const url = new URL(mastodonUrl)
    const lastSegment = url.pathname.replace(/\/$/, '').split('/').pop()
    const handle = lastSegment?.startsWith('@')
      ? lastSegment.slice(1)
      : DEFAULT_MASTODON_HANDLE

    return {
      profileUrl: mastodonUrl,
      host: url.hostname,
      handle,
    }
  } catch {
    return {
      profileUrl: DEFAULT_MASTODON_URL,
      host: DEFAULT_MASTODON_HOST,
      handle: DEFAULT_MASTODON_HANDLE,
    }
  }
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString))
}

async function getAccount(profileUrl: string, host: string, handle: string) {
  const searchParams = new URLSearchParams({
    q: handle,
    type: 'accounts',
    limit: '5',
  })

  const response = await fetch(`https://${host}/api/v2/search?${searchParams}`, {
    next: { revalidate: 900 },
  })

  if (!response.ok) {
    throw new Error('Unable to fetch Mastodon account')
  }

  const data = await response.json()
  const normalizedProfileUrl = profileUrl.replace(/\/$/, '')
  const account = (data.accounts as MastodonAccount[]).find((candidate) => {
    const candidateUrl = candidate.url.replace(/\/$/, '')
    return (
      candidateUrl === normalizedProfileUrl ||
      candidate.acct === handle ||
      candidate.acct === `${handle}@${host}`
    )
  })

  if (!account) {
    throw new Error('Mastodon account not found')
  }

  return account
}

async function getStatuses(host: string, accountId: string) {
  const searchParams = new URLSearchParams({
    limit: '3',
    exclude_replies: 'true',
    exclude_reblogs: 'true',
  })

  const response = await fetch(
    `https://${host}/api/v1/accounts/${accountId}/statuses?${searchParams}`,
    {
      next: { revalidate: 900 },
    }
  )

  if (!response.ok) {
    throw new Error('Unable to fetch Mastodon statuses')
  }

  return (await response.json()) as MastodonStatus[]
}

export default async function MastodonFeed({ mastodonUrl }: MastodonFeedProps) {
  const { profileUrl, host, handle } = parseMastodonProfile(mastodonUrl)

  try {
    const account = await getAccount(profileUrl, host, handle)
    const statuses = await getStatuses(host, account.id)

    if (!statuses.length) {
      return null
    }

    return (
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <a
            href={account.url}
            target="_blank"
            rel="me noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.7rem',
              background: 'linear-gradient(135deg, #6364ff 0%, #563acc 100%)',
              color: '#ffffff',
              textDecoration: 'none',
              padding: '0.95rem 1.3rem',
              boxShadow: '0 12px 28px rgba(86, 58, 204, 0.28)',
              fontFamily: "'Felix Titling', serif",
              fontSize: '0.82rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 61 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M60.7539 14.3904C59.8143 7.40642 53.7273 1.90257 46.5117 0.836066C45.2943 0.655854 40.6819 0 29.9973 0H29.9175C19.2299 0 16.937 0.655854 15.7196 0.836066C8.70488 1.87302 2.29885 6.81852 0.744617 13.8852C-0.00294988 17.3654 -0.0827298 21.2237 0.0561464 24.7629C0.254119 29.8384 0.292531 34.905 0.753482 39.9598C1.07215 43.3175 1.62806 46.6484 2.41704 49.9276C3.89445 55.9839 9.87499 61.0239 15.7344 63.0801C22.0077 65.2244 28.7542 65.5804 35.2184 64.1082C35.9295 63.9428 36.6318 63.7508 37.3252 63.5321C38.8971 63.0329 40.738 62.4745 42.0913 61.4937C42.1099 61.4799 42.1251 61.4621 42.1358 61.4417C42.1466 61.4212 42.1526 61.3986 42.1534 61.3755V56.4773C42.153 56.4557 42.1479 56.4345 42.1383 56.4151C42.1287 56.3958 42.1149 56.3788 42.0979 56.3655C42.0809 56.3522 42.0611 56.3429 42.04 56.3382C42.019 56.3335 41.9971 56.3336 41.9761 56.3384C37.8345 57.3276 33.5905 57.8234 29.3324 57.8156C22.0045 57.8156 20.0336 54.3384 19.4693 52.8908C19.0156 51.6397 18.7275 50.3346 18.6124 49.0088C18.6112 48.9866 18.6153 48.9643 18.6243 48.9439C18.6333 48.9236 18.647 48.9056 18.6643 48.8915C18.6816 48.8774 18.7019 48.8675 18.7237 48.8628C18.7455 48.858 18.7681 48.8585 18.7897 48.8641C22.8622 49.8465 27.037 50.3423 31.2265 50.3412C32.234 50.3412 33.2387 50.3412 34.2463 50.3146C38.4598 50.1964 42.9009 49.9808 47.0465 49.1713C47.1499 49.1506 47.2534 49.1329 47.342 49.1063C53.881 47.8507 60.1038 43.9097 60.7362 33.9301C60.7598 33.5372 60.8189 29.8148 60.8189 29.4071C60.8218 28.0215 61.2651 19.5781 60.7539 14.3904Z" fill="#ffffff" />
              <path d="M50.3943 22.237V39.5876H43.5185V22.7481C43.5185 19.2029 42.0411 17.3949 39.036 17.3949C35.7325 17.3949 34.0778 19.5338 34.0778 23.7585V32.9759H27.2434V23.7585C27.2434 19.5338 25.5857 17.3949 22.2822 17.3949C19.2949 17.3949 17.8027 19.2029 17.8027 22.7481V39.5876H10.9298V22.237C10.9298 18.6918 11.835 15.8754 13.6453 13.7877C15.5128 11.7049 17.9623 10.6355 21.0028 10.6355C24.522 10.6355 27.1813 11.9885 28.9542 14.6917L30.665 17.5633L32.3788 14.6917C34.1517 11.9885 36.811 10.6355 40.3243 10.6355C43.3619 10.6355 45.8114 11.7049 47.6847 13.7877C49.4931 15.8734 50.3963 18.6899 50.3943 22.237Z" fill="#2f195f" />
            </svg>
            Follow me on Mastodon
          </a>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
          }}
        >
          {statuses.map((status) => (
            <article
              key={status.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                padding: '1rem',
              }}
            >
              <div
                style={{
                  marginBottom: '0.8rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'center',
                    minWidth: 0,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={account.avatar}
                    alt={account.display_name || account.acct}
                    style={{
                      width: '2.25rem',
                      height: '2.25rem',
                      borderRadius: '999px',
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '1.1rem',
                        color: '#1f1f1f',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {account.display_name || 'Lucas Horta'}
                    </div>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        color: '#777777',
                      }}
                    >
                      @{account.acct}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: '#777777',
                    flexShrink: 0,
                  }}
                >
                  {formatDate(status.created_at)}
                </div>
              </div>

              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                  color: '#222222',
                }}
                dangerouslySetInnerHTML={{ __html: status.content }}
              />

              <a
                href={status.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: '1rem',
                  display: 'inline-block',
                  color: '#111111',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.25)',
                  fontSize: '0.9rem',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                View post
              </a>
            </article>
          ))}
        </div>
      </section>
    )
  } catch {
    return (
      <section style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <a
          href={profileUrl}
          target="_blank"
          rel="me noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.7rem',
            background: 'linear-gradient(135deg, #6364ff 0%, #563acc 100%)',
            color: '#ffffff',
            textDecoration: 'none',
            padding: '0.95rem 1.3rem',
            boxShadow: '0 12px 28px rgba(86, 58, 204, 0.28)',
            fontFamily: "'Felix Titling', serif",
            fontSize: '0.82rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 61 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M60.7539 14.3904C59.8143 7.40642 53.7273 1.90257 46.5117 0.836066C45.2943 0.655854 40.6819 0 29.9973 0H29.9175C19.2299 0 16.937 0.655854 15.7196 0.836066C8.70488 1.87302 2.29885 6.81852 0.744617 13.8852C-0.00294988 17.3654 -0.0827298 21.2237 0.0561464 24.7629C0.254119 29.8384 0.292531 34.905 0.753482 39.9598C1.07215 43.3175 1.62806 46.6484 2.41704 49.9276C3.89445 55.9839 9.87499 61.0239 15.7344 63.0801C22.0077 65.2244 28.7542 65.5804 35.2184 64.1082C35.9295 63.9428 36.6318 63.7508 37.3252 63.5321C38.8971 63.0329 40.738 62.4745 42.0913 61.4937C42.1099 61.4799 42.1251 61.4621 42.1358 61.4417C42.1466 61.4212 42.1526 61.3986 42.1534 61.3755V56.4773C42.153 56.4557 42.1479 56.4345 42.1383 56.4151C42.1287 56.3958 42.1149 56.3788 42.0979 56.3655C42.0809 56.3522 42.0611 56.3429 42.04 56.3382C42.019 56.3335 41.9971 56.3336 41.9761 56.3384C37.8345 57.3276 33.5905 57.8234 29.3324 57.8156C22.0045 57.8156 20.0336 54.3384 19.4693 52.8908C19.0156 51.6397 18.7275 50.3346 18.6124 49.0088C18.6112 48.9866 18.6153 48.9643 18.6243 48.9439C18.6333 48.9236 18.647 48.9056 18.6643 48.8915C18.6816 48.8774 18.7019 48.8675 18.7237 48.8628C18.7455 48.858 18.7681 48.8585 18.7897 48.8641C22.8622 49.8465 27.037 50.3423 31.2265 50.3412C32.234 50.3412 33.2387 50.3412 34.2463 50.3146C38.4598 50.1964 42.9009 49.9808 47.0465 49.1713C47.1499 49.1506 47.2534 49.1329 47.342 49.1063C53.881 47.8507 60.1038 43.9097 60.7362 33.9301C60.7598 33.5372 60.8189 29.8148 60.8189 29.4071C60.8218 28.0215 61.2651 19.5781 60.7539 14.3904Z" fill="#ffffff" />
            <path d="M50.3943 22.237V39.5876H43.5185V22.7481C43.5185 19.2029 42.0411 17.3949 39.036 17.3949C35.7325 17.3949 34.0778 19.5338 34.0778 23.7585V32.9759H27.2434V23.7585C27.2434 19.5338 25.5857 17.3949 22.2822 17.3949C19.2949 17.3949 17.8027 19.2029 17.8027 22.7481V39.5876H10.9298V22.237C10.9298 18.6918 11.835 15.8754 13.6453 13.7877C15.5128 11.7049 17.9623 10.6355 21.0028 10.6355C24.522 10.6355 27.1813 11.9885 28.9542 14.6917L30.665 17.5633L32.3788 14.6917C34.1517 11.9885 36.811 10.6355 40.3243 10.6355C43.3619 10.6355 45.8114 11.7049 47.6847 13.7877C49.4931 15.8734 50.3963 18.6899 50.3943 22.237Z" fill="#2f195f" />
          </svg>
          Follow me on Mastodon
        </a>
      </section>
    )
  }
}
