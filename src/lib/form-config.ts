// Public ID supplied by the owner; recipient and eligibility confirmed 2026-10-21.
// Delivery evidence is a separate release gate, recorded in docs/evidence.
const endpoint = import.meta.env.PUBLIC_FORM_ENDPOINT?.trim() ?? 'https://formspree.io/f/mljgyabo';
const enabled = import.meta.env.PUBLIC_FORM_ENABLED !== 'false';

if (endpoint && !/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint)) {
  throw new Error('PUBLIC_FORM_ENDPOINT must be an approved Formspree endpoint.');
}
if (enabled && !endpoint) throw new Error('An enabled form requires its public endpoint.');

export const formConfig = {
  endpoint: enabled ? endpoint : '',
  active: enabled && Boolean(endpoint),
  recipient: 'contact@ismailstudio.my',
} as const;
