import {
  about,
  brand,
  contact,
  faq,
  googleRating,
  openingHours,
  services,
  seo,
  testimonials,
  testimonialsArePlaceholder,
} from '@/content/business';

/**
 * Dados estruturados Schema.org.
 *
 * ⚠️ `aggregateRating` e `review` só entram no JSON-LD quando os depoimentos
 * são reais. Publicar avaliação fictícia como dado estruturado viola as
 * diretrizes de spam do Google e pode gerar penalização manual — por isso a
 * flag `testimonialsArePlaceholder` corta esses blocos automaticamente.
 */
export function buildSchema() {
  const businessId = `${brand.siteUrl}/#loja`;

  const localBusiness: Record<string, unknown> = {
    '@type': ['ClothingStore', 'LocalBusiness'],
    '@id': businessId,
    name: brand.name,
    legalName: brand.legalName,
    description: seo.description,
    slogan: brand.slogan,
    url: brand.siteUrl,
    telephone: contact.phoneHref,
    email: contact.email,
    image: `${brand.siteUrl}${seo.ogImage}`,
    logo: `${brand.siteUrl}${seo.ogImage}`,
    priceRange: '$$',
    currenciesAccepted: 'BRL',
    paymentAccepted: 'Pix, Dinheiro, Cartão de débito, Cartão de crédito',
    foundingDate: String(brand.foundedYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressRegion: contact.address.state,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: contact.address.lat,
      longitude: contact.address.lng,
    },
    openingHoursSpecification: openingHours
      .filter((slot) => slot.opens && slot.closes)
      .map((slot) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: slot.days.map((d) => `https://schema.org/${DAY_MAP[d]}`),
        opens: slot.opens,
        closes: slot.closes,
      })),
    sameAs: [contact.instagram],
    areaServed: {
      '@type': 'City',
      name: contact.address.city,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Coleções',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
        },
      })),
    },
  };

  if (!testimonialsArePlaceholder) {
    localBusiness.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: googleRating.value,
      reviewCount: googleRating.count,
      bestRating: 5,
      worstRating: 1,
    };
    localBusiness.review = testimonials.map((item) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: item.name },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: item.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: item.text,
    }));
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      localBusiness,
      {
        '@type': 'WebSite',
        '@id': `${brand.siteUrl}/#site`,
        url: brand.siteUrl,
        name: brand.name,
        inLanguage: 'pt-BR',
        publisher: { '@id': businessId },
      },
      {
        '@type': 'WebPage',
        '@id': `${brand.siteUrl}/#pagina`,
        url: brand.siteUrl,
        name: seo.title,
        description: seo.description,
        isPartOf: { '@id': `${brand.siteUrl}/#site` },
        about: { '@id': businessId },
        inLanguage: 'pt-BR',
      },
      {
        '@type': 'Organization',
        '@id': `${brand.siteUrl}/#organizacao`,
        name: brand.name,
        url: brand.siteUrl,
        description: about.mission.text,
        sameAs: [contact.instagram],
      },
      {
        '@type': 'FAQPage',
        '@id': `${brand.siteUrl}/#faq`,
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${brand.siteUrl}/#trilha`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: brand.siteUrl },
        ],
      },
    ],
  };
}

const DAY_MAP: Record<string, string> = {
  Mo: 'Monday',
  Tu: 'Tuesday',
  We: 'Wednesday',
  Th: 'Thursday',
  Fr: 'Friday',
  Sa: 'Saturday',
  Su: 'Sunday',
};
