import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
          borderRadius: '36px',
          fontSize: '110px',
          fontWeight: 700,
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        K
      </div>
    ),
    {
      ...size,
    }
  )
}
