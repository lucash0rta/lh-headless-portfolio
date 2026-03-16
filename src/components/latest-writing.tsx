import Link from 'next/link'
import {
  formatWriteFreelyDate,
  getWriteFreelyPosts,
} from '../lib/writefreely'

export default async function LatestWriting() {
  const posts = await getWriteFreelyPosts(3)

  if (!posts.length) {
    return null
  }

  return (
    <section style={{ marginBottom: '3rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: '1rem',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
        }}
      >
        <div>
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
          <h3
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '2rem',
              fontWeight: 500,
              color: '#222222',
            }}
          >
            Blogposts
          </h3>
        </div>

        <Link
          href="/writing"
          style={{
            color: '#111111',
            textDecoration: 'none',
            borderBottom: '1px solid rgba(0, 0, 0, 0.25)',
            fontSize: '0.95rem',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          View all writing
        </Link>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
        }}
      >
        {posts.map((post) => (
          <article
            key={post.link}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
              padding: '1rem',
            }}
          >
            <div
              style={{
                marginBottom: '0.75rem',
                fontSize: '0.8rem',
                color: '#777777',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {formatWriteFreelyDate(post.pubDate)}
            </div>

            <h4
              style={{
                margin: '0 0 0.75rem 0',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.6rem',
                fontWeight: 500,
                lineHeight: 1.1,
                color: '#222222',
              }}
            >
              {post.title}
            </h4>

            <p
              style={{
                margin: '0 0 1rem 0',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.05rem',
                lineHeight: 1.6,
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
        ))}
      </div>
    </section>
  )
}
