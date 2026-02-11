import LanyardClient from '../../components/lanyard/LanyardClient'

export default function LanyardPage() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#00ff00',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <LanyardClient position={[0, 0, 15]} gravity={[0, -40, 0]} fov={35} />
    </div>
  )
}


