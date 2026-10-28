import { ImageResponse } from 'next/og';

export const SOCIAL_IMAGE_SIZE = { width: 1200, height: 630 };
export const SOCIAL_IMAGE_ALT = 'AlgoViz — interactive, step-by-step algorithm visualizations';

const BARS = [38, 62, 24, 80, 50, 92, 30, 70, 44, 86];

// Shared artwork for the Open Graph and Twitter preview images.
export function renderSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: '#0b1120',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: 88, fontWeight: 700, color: '#60a5fa' }}>AlgoViz</div>
          <div style={{ fontSize: 40, color: '#cbd5e1' }}>See algorithms run, one step at a time.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '18px', height: '220px' }}>
          {BARS.map((height, i) => (
            <div
              key={i}
              style={{
                width: '72px',
                height: `${height}%`,
                borderRadius: '8px',
                background: i === 3 || i === 4 ? '#f59e0b' : '#3b82f6',
              }}
            />
          ))}
        </div>
      </div>
    ),
    SOCIAL_IMAGE_SIZE,
  );
}
