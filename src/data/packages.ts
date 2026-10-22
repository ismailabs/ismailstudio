export const packages = [
  { name: 'Starter', price: '599', pages: '1 page', revisions: '1 revision round', description: 'One focused page to introduce your business.', approach: 'Template-informed design', scope: 'Get the essentials right.', seo: 'Basic On-Page SEO', seoDetail: 'Page title, meta description, clear headings, descriptive links and meaningful image alt text.', icon: 'zap' },
  { name: 'Business', price: '1,299', pages: 'Up to 5 pages', revisions: '2 revision rounds', description: 'More space for your services and story.', approach: 'More custom reusable layouts', scope: 'Make more information easy to find.', seo: 'Technical SEO setup', seoDetail: 'On-page foundations, plus canonical URLs, sitemap and robots checks, mobile reflow and diagnosed speed basics.', icon: 'chart' },
  { name: 'Premium', price: '2,999', pages: 'Up to 12 pages', revisions: '2 revision rounds', description: 'A broader website with a considered search structure.', approach: 'More extensive reusable layouts', scope: 'Give a bigger site a clear direction.', seo: 'Advanced On-Site SEO', seoDetail: 'Technical foundations, plus search-intent mapping, content alignment, eligible structured data, internal-link review and prioritized audit findings.', icon: 'crown' },
] as const;

export type PackageName = typeof packages[number]['name'];
