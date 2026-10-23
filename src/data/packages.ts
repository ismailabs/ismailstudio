export const packages = [
  {
    name: 'Starter', price: '599', pages: '1 page', revisions: '1 revision round',
    description: 'One focused page to introduce your business.',
    approach: 'Template-informed design', scope: 'Get the essentials right.',
    suitability: 'A small business or sole trader with one clear offer to explain.',
    deliverables: ['Services, introduction and contact sections', 'Responsive, template-informed layout', 'Clear contact links and enquiry actions'],
    estimate: '2 working days',
    seo: 'Basic On-Page SEO',
    seoDetail: 'One-time page title, meta description, clear headings, descriptive links and meaningful image alt text.',
    icon: 'zap',
  },
  {
    name: 'Business', price: '1,299', pages: 'Up to 5 pages', revisions: '2 revision rounds',
    description: 'Room for distinct services, company information and contact details.',
    approach: 'More custom reusable layouts', scope: 'Make more information easy to find.',
    suitability: 'An SME whose services and company information need separate pages.',
    deliverables: ['Agreed page structure and navigation', 'Reusable layouts for services and company pages', 'Responsive contact paths across the website'],
    estimate: '3 working days',
    seo: 'Technical SEO setup',
    seoDetail: 'One-time on-page foundations, plus canonical URLs, sitemap and robots checks, mobile reflow and diagnosed speed basics.',
    icon: 'chart',
  },
  {
    name: 'Premium', price: '2,999', pages: 'Up to 12 pages', revisions: '2 revision rounds',
    description: 'A broader website with a considered content and search structure.',
    approach: 'More extensive reusable layouts', scope: 'Give a bigger site a clear direction.',
    suitability: 'A larger set of services or information that needs a coherent page hierarchy.',
    deliverables: ['Planned service and content hierarchy', 'More extensive reusable page layouts', 'Internal links connecting related information'],
    estimate: '7 working days',
    seo: 'Advanced On-Site SEO',
    seoDetail: 'One-time technical foundations, plus search-intent mapping, content alignment, valid applicable structured data, internal-link review and prioritized audit findings.',
    icon: 'crown',
  },
] as const;

export type PackageName = typeof packages[number]['name'];

export const optionalIntegrations = [
  { name: 'Google Maps directions link', detail: 'A link that opens directions to your business in Google Maps.' },
  { name: 'Embedded map', detail: 'A map inside a page, subject to the provider’s terms and privacy requirements.' },
  { name: 'Business WhatsApp link', detail: 'A click-to-chat link using your own business number.' },
  { name: 'Email or managed form actions', detail: 'An email link or a simple form using an eligible managed provider, with delivery and privacy checks.' },
  { name: 'External appointment booking', detail: 'A link or suitable embed for an independent booking provider. Its service handles the bookings.' },
  { name: 'Existing calendar link', detail: 'A link to a calendar or scheduling page your business already uses.' },
  { name: 'Social links or embeds', detail: 'Links to your business profiles or supported embedded content, assessed for privacy and page speed.' },
] as const;
