interface AboutData {
  name: string
  title: string
  intro: string
  photoURL: string
  instagram?: string
  linkedin?: string
  agdaBannerURL?: string
  agdaBannerAlt?: string
}

interface FooterProps {
  aboutData: AboutData | null
}

export default function Footer({ aboutData }: FooterProps) {

  return (
    <footer style={{ padding: '1rem', textAlign: 'center' }}>
      {aboutData && (
        <div>
          <div style={{ 
            marginBottom: '0.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {aboutData.instagram && (
              <a
                href={aboutData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                {/* Instagram SVG */}
                <svg 
                  width="20" 
                  height="20" 
                  fill="none" 
                  stroke="#000" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                  style={{ 
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                  }}
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17" cy="7" r="1.5" />
                </svg>
              </a>
            )}
            {aboutData.linkedin && (
              <a
                href={aboutData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                {/* LinkedIn SVG */}
                <svg 
                  width="20" 
                  height="20" 
                  fill="none" 
                  stroke="#000" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                  style={{ 
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                  }}
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M8 11v5M8 8v.01M12 11v5M12 14a2 2 0 1 1 4 0v2" />
                </svg>
              </a>
            )}
          </div>
          {aboutData.agdaBannerURL ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={aboutData.agdaBannerURL}
              alt={aboutData.agdaBannerAlt || 'AGDA membership banner'}
              style={{
                display: 'block',
                margin: '0 auto 0.75rem auto',
                width: '100%',
                maxWidth: '360px',
                height: 'auto',
                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
              }}
            />
          ) : null}
          <div style={{ 
            color: '#000', 
            fontSize: '0.8rem',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
          }}>
            &copy; {new Date().getFullYear()} {aboutData.name}
          </div>
        </div>
      )}
    </footer>
  )
}

