import { ImageResponse } from 'next/og';

import { brand, contact, seo } from '@/content/business';

export const runtime = 'nodejs';
export const alt = `${brand.name} — ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * OG image gerada em build como PNG real — redes sociais não renderizam SVG.
 * Usa as fontes padrão do next/og de propósito: não há download de fonte,
 * então a geração não depende de rede.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #F8F2EC 0%, #E3CFC3 55%, #C9A2A4 100%)',
          color: '#2A2422',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: '#B76E79',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 38,
              fontWeight: 700,
            }}
          >
            D
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: 6 }}>
              {brand.name}
            </span>
            <span style={{ fontSize: 18, letterSpacing: 4, color: '#7A5F58' }}>
              {brand.tagline.toUpperCase()}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span style={{ fontSize: 62, lineHeight: 1.1, fontWeight: 600, maxWidth: 900 }}>
            {brand.slogan}
          </span>
          <span style={{ fontSize: 26, color: '#5C4A44', maxWidth: 820, lineHeight: 1.4 }}>
            {seo.description.split('.')[0]}.
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 22,
            color: '#7A5F58',
          }}
        >
          <span>
            {contact.address.city}/{contact.address.state}
          </span>
          <span>·</span>
          <span>{contact.instagramHandle}</span>
        </div>
      </div>
    ),
    size
  );
}
