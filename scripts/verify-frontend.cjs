const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const ts = require('typescript');
function walk(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((x) =>
      x.isDirectory() ? walk(path.join(dir, x.name)) : [path.join(dir, x.name)],
    );
}
for (const file of walk('src')) {
  const source = fs.readFileSync(file, 'utf8');
  assert(
    !/\b(fetch\s*\(|XMLHttpRequest|WebSocket|EventSource|sendBeacon\s*\(|axios\b)/.test(
      source,
    ),
    `${file}: remote transport found`,
  );
  assert(!/\baction\s*=\s*["']https?:/.test(source), `${file}: external submit found`);
  if (/<iframe\b/.test(source))
    assert.equal(
      file,
      'src/components/venues/VenueMap.tsx',
      'Only the requested venue map may embed external content',
    );
  assert(
    !/from\s*['"](?:next|drizzle|cloudflare|wrangler)/.test(source),
    `${file}: backend dependency found`,
  );
}
for (const directory of ['db', 'drizzle', 'worker', 'app/api', '.openai', 'examples'])
  assert(!fs.existsSync(directory), `${directory} must not exist`);
assert(!fs.existsSync('pnpm-lock.yaml'));
assert(!fs.existsSync('package-lock.json'));
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
assert.deepEqual(Object.keys(pkg.dependencies).sort(), ['gsap', 'react', 'react-dom']);
console.log('PASS: frontend-only source and dependency audit.');
