import { client } from '../../lib/sanity'
import Image from 'next/image'
import GradualBlur from '../components/GradualBlur'
import VideoCardGrid from '../components/video-grid/VideoCardGrid'
import Footer from '../components/footer'
 

interface GalleryImage {
  asset?: {
    url: string
  }
  caption?: string | null
}

interface Project {
  _id: string
  title: string
  client: string
  role: string
  year: number
  introText: string
  compressedVideo?: string
  longVideo?: string | null
  gallery?: GalleryImage[]
}

interface AboutData {
  name: string
  title: string
  intro: string
  photoURL: string
  instagram?: string
  linkedin?: string
}

export default async function Home() {
  // Fetch showreel
  const showreelData = await client.fetch(`*[_type == "showreelURL"][0]{
    _id,
    url
  }`)
  
  // Fetch about data
  const aboutData: AboutData | null = await client.fetch(`*[_type == "about"][0]{
    name,
    title,
    intro,
    "photoURL": photo.asset->url,
    instagram,
    linkedin
  }`)
  
  // Fetch projects with the correct capitalization, sorted by year descending
  const projects: Project[] = await client.fetch(`*[_type == "Projects"] | order(year desc){
    _id,
    title,
    client,
    role,
    year,
    introText,
    compressedVideo,
    longVideo,
    gallery[]{
      asset->{
        url
      },
      caption
    }
  }`)

  return (
    <>
      <div style={{ padding: '2rem 2rem 8rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Name & Title - Above Showreel */}
        {aboutData && (
          <section style={{
            marginBottom: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {/* Name - Left Aligned */}
            <div>
              <h1 style={{
                fontFamily: "'Felix Titling', serif",
                fontSize: '28px',
                fontWeight: 400,
                color: '#333333',
                margin: 0,
                textAlign: 'left'
              }}>
                {aboutData.name}
              </h1>
            </div>
            
            {/* Title - Right Aligned */}
            <div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '20px',
                fontWeight: 400,
                color: '#666666',
                margin: 0,
                textAlign: 'right'
              }}>
                {aboutData.title}
              </h2>
            </div>
          </section>
        )}

        {/* Showreel Section */}
        {showreelData?.url && (
          <section style={{ 
            marginBottom: '3rem',
            overflow: 'hidden'
          }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ 
                width: '100%',
                maxHeight: '80vh',
                objectFit: 'cover',
                display: 'block'
              }}
            >
              <source src={showreelData.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </section>
        )}

        {/* About Intro - Below Showreel */}
        {aboutData?.intro && (
          <section style={{
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '1rem 2rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
              maxWidth: '800px',
              width: '100%'
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '18px',
                fontWeight: 300,
                lineHeight: '1.6',
                color: '#333333',
                margin: 0,
                textAlign: 'center'
              }}>
                {aboutData.intro}
              </p>
            </div>
          </section>
        )}

      <VideoCardGrid projects={projects} />
    </div>
    
    {/* Page-level blur at the bottom covering 30% of viewport */}
{/*     <GradualBlur
      target="page"
      position="bottom"
      height="10vh"
      strength={2}
      divCount={2}
      curve="ease-in"
      exponential={true}
      opacity={1}
      zIndex={1000}
    />
 */}
    <Footer aboutData={aboutData} />
    </>
  )
}
