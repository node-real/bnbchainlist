import assert from 'node:assert/strict';

const [origin, expectedBuildId] = process.argv.slice(2);
assert(origin && expectedBuildId, 'Usage: node tests/smoke-assets.mjs <origin> <build-id>');
const base = new URL(origin);
const homepage = await fetch(base, { redirect: 'error', signal: AbortSignal.timeout(10000) });
assert(homepage.ok, `Homepage returned ${homepage.status}`);
const html = await homepage.text();
const nextData = html.match(/<script\b[^>]*\bid="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
assert(nextData, 'Missing Next.js page data');
assert.equal(JSON.parse(nextData[1]).buildId, expectedBuildId);

const resources = [...html.matchAll(/<(?:script|link|img)\b[^>]*\b(?:src|href)=(["'])(.*?)\1/gi)]
  .map((match) => new URL(match[2], base))
  .filter((url) => /\/(?:_next\/static|fonts|images|connectors)\/|\/(?:favicon\.ico|unknown-logo\.png)$/.test(url.pathname));
assert(resources.some((url) => url.pathname.startsWith('/_next/static/')), 'Missing Next.js static resources');
assert(resources.some((url) => url.pathname.startsWith('/fonts/')), 'Missing same-origin font stylesheets');
for (const url of resources) {
  assert.equal(url.origin, base.origin, `Application asset points outside the container origin: ${url.pathname}`);
  assert(!url.pathname.startsWith('/static/'), `Application asset still uses the old static prefix: ${url.pathname}`);
}

const assets = new Set([
  ...resources.map((url) => url.href),
  new URL('/fonts/Inter/Inter-Regular.woff2', base).href,
  new URL('/images/rsz_bnb.svg', base).href,
  new URL('/favicon.ico', base).href,
]);
await Promise.all([...assets].map(async (asset) => {
  const url = new URL(asset);
  const response = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(10000) });
  assert(response.ok, `${url.pathname} returned ${response.status}`);
  if (url.pathname.endsWith('.js')) assert(response.headers.get('content-type')?.includes('javascript'));
  if (url.pathname.endsWith('.css')) assert(response.headers.get('content-type')?.includes('text/css'));
  assert((await response.arrayBuffer()).byteLength > 0, `${url.pathname} is empty`);
}));
console.log(`Build ID and ${assets.size} same-origin JS/CSS/font/image assets verified.`);
