import { client } from '../../lib/sanity'
// import Image from 'next/image'
import GradualBlur from '../components/GradualBlur'
import VideoCardGrid from '../components/video-grid/VideoCardGrid'

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
  introText: string
  compressedVideo?: string
  longVideo?: string | null
  gallery?: GalleryImage[]
}

export default async function Home() {
  // Fetch showreel
  const showreelData = await client.fetch(`*[_type == "showreelURL"][0]{
    _id,
    url
  }`)
  
  // Fetch projects with the correct capitalization
  const projects: Project[] = await client.fetch(`*[_type == "Projects"]{
    _id,
    title,
    client,
    role,
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
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
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

      <VideoCardGrid projects={projects} />
    </div>
    
    {/* Page-level blur at the bottom covering 30% of viewport */}
    <GradualBlur
      target="page"
      position="bottom"
      height="20vh"
      strength={2}
      divCount={2}
      curve="ease-in"
      exponential={true}
      opacity={1}
      zIndex={1000}
    />
    </>
  )
}
