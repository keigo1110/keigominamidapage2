import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Keigo Minamida - HCI Researcher & Creative Technologist'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '60px',
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '56px',
              color: 'white',
              fontWeight: 700,
            }}
          >
            K
          </div>
          <div
            style={{
              fontSize: '48px',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '-1px',
            }}
          >
            Keigo Minamida
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#94a3b8',
              textAlign: 'center',
            }}
          >
            HCI Researcher & Creative Technologist
          </div>
          <div
            style={{
              fontSize: '20px',
              color: '#64748b',
              textAlign: 'center',
            }}
          >
            The University of Tokyo | Rekimoto Laboratory
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
