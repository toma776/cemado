/** @type {import('next').NextConfig} */
export default {
  trailingSlash: true,
  poweredByHeader: false,
  // Nimic nu intră în Google până la lansare: site, panou și API, inclusiv pe *.vercel.app.
  // Folosim antetul, nu robots.txt: un Disallow l-ar împiedica pe Google să vadă noindex și ar putea lista totuși adresele.
  // La lansare se scoate regula pentru site-ul public; /manage și /api rămân noindex.
  async headers() {
    const noindex = [{key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive'}];
    return [{source: '/:path*', headers: noindex}];
  }
};
