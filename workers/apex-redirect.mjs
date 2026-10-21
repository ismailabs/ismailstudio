// No origin request, request body access, secrets, storage or background work.
export default {
  /** @param {Request} request */
  fetch(request) {
    const destination = new URL(request.url);
    destination.protocol = 'https:';
    destination.hostname = 'www.ismailstudio.my';
    destination.port = '';
    return new Response(null, {
      status: 308,
      headers: {
        Location: destination.href,
        'Cache-Control': 'public, max-age=3600',
        'Strict-Transport-Security': 'max-age=31536000',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    });
  },
};
