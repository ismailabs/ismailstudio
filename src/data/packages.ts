export const packages = [
  { name: 'Starter', price: '599', pages: '1 page', revisions: '1 revision round', description: 'For a focused online presence.', approach: 'Template-informed design', scope: 'One focused page' },
  { name: 'Business', price: '1,299', pages: 'Up to 5 pages', revisions: '2 revision rounds', description: 'For growing businesses with more to explain.', approach: 'More custom reusable layouts', scope: 'Room for your services' },
  { name: 'Premium', price: '2,999', pages: 'Up to 12 pages', revisions: '2 revision rounds', description: 'For businesses needing a broader website.', approach: 'More extensive reusable layouts', scope: 'A broader website' },
] as const;

export type PackageName = typeof packages[number]['name'];
