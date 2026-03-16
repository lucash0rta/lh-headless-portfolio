import { formatWriteFreelyDate, getWriteFreelyPosts } from '../../lib/writefreely'

export default async function WritingPage() {
  const posts = await getWriteFreelyPosts()

  return (
    <main style={{ padding: '2rem 2rem 6rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <p
          style={{
            margin: '0 0 0.35rem 0',
            fontFamily: "'Felix Titling', serif",
            fontSize: '0.8rem',
            letterSpacing: '0.14em',
            color: '#666666',
            textTransform: 'uppercase',
          }}
        >
          Writing
        </p>
        <h1
          style={{
            margin: '0 0 0.75rem 0',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '3rem',
            fontWeight: 500,
            color: '#222222',
          }}
        >
          Notes, research, and longer posts
        </h1>
        <p
          style={{
            margin: 0,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.2rem',
            lineHeight: 1.6,
            color: '#3b3b3b',
          }}
        >
          This page pulls in the latest posts from the self-hosted WriteFreely
          blog running on the Pi.
        </p>
      </header>

      <section style={{ display: 'grid', gap: '1rem' }}>
        {posts.length ? (
          posts.map((post) => (
            <article
              key={post.link}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                padding: '1.25rem',
              }}
            >
              <div
                style={{
                  marginBottom: '0.6rem',
                  fontSize: '0.8rem',
                  color: '#777777',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {formatWriteFreelyDate(post.pubDate)}
              </div>

              <h2
                style={{
                  margin: '0 0 0.75rem 0',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '2rem',
                  fontWeight: 500,
                  lineHeight: 1.1,
                  color: '#222222',
                }}
              >
                {post.title}
              </h2>

              <p
                style={{
                  margin: '0 0 1rem 0',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  color: '#3b3b3b',
                }}
              >
                {post.description}
              </p>

              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#111111',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.25)',
                  fontSize: '0.9rem',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                Read on blog
              </a>
            </article>
          ))
        ) : (
          <p
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.15rem',
              lineHeight: 1.6,
              color: '#3b3b3b',
            }}
          >
            The blog feed is currently unavailable, but the self-hosted writing
            section will appear here whenever the Pi is reachable.
          </p>
        )}
      </section>
    </main>
  )
}
