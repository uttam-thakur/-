// Configuration-driven rendering checks. No browser, network, or production data is touched.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const ts = require('typescript');
for (const ext of ['.ts', '.tsx'])
  require.extensions[ext] = (module, file) => {
    const result = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    });
    module._compile(result.outputText, file);
  };
const root = path.resolve(__dirname, '..');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { default: Page } = require('../src/app/App.tsx');
const { bride } = require('../src/data/bride.ts');
const { groom } = require('../src/data/groom.ts');
const { events } = require('../src/data/events.ts');
const { copy } = require('../src/content/invitation.ts');
const { sections, contentOrder } = require('../src/config/sections.ts');
const { gallery } = require('../src/data/gallery.ts');
const { calendarContent } = require('../src/helpers/presentation.ts');
const render = () => renderToStaticMarkup(React.createElement(Page));
let html = render();
assert(html.includes('Priya') && html.includes('Rahul'));
assert(html.includes('data-section="festivities"'));
const savedSections = { ...sections };
for (const key of Object.keys(sections)) {
  sections[key] = false;
  const output = render();
  if (contentOrder.includes(key))
    assert(!output.includes(`data-section="${key}"`), `${key} should be hidden`);
  sections[key] = savedSections[key];
}
for (const key of Object.keys(sections)) sections[key] = false;
assert(!render().includes('data-section='));
Object.assign(sections, savedSections);
const order = [...contentOrder];
contentOrder.reverse();
html = render();
assert(html.indexOf('data-section="rsvp"') < html.indexOf('data-section="date"'));
contentOrder.splice(0, contentOrder.length, ...order);
const oldBride = bride.firstName,
  oldGroom = groom.firstName,
  oldCopy = copy.welcome.heading;
const primary = events.find((e) => e.id === 'wedding'),
  oldStart = primary.startsAt,
  oldEnd = primary.endsAt;
bride.firstName = 'Ananya';
groom.firstName = 'Arjun';
copy.welcome.heading = 'Join our families';
primary.startsAt = '2027-01-10T18:30:00+05:30';
primary.endsAt = '2027-01-10T22:30:00+05:30';
html = render();
assert(html.includes('Ananya') && html.includes('Arjun'));
assert(html.includes('Join our families'));
assert(html.includes('10 January 2027'));
assert(html.includes('#ArjunWedsAnanya'));
const ics = calendarContent(new Date('2026-11-08T00:00:00Z'));
assert(ics.includes('DTSTART:20270110T130000Z'));
assert(ics.includes('SUMMARY:Arjun & Ananya Wedding'));
bride.firstName = oldBride;
groom.firstName = oldGroom;
copy.welcome.heading = oldCopy;
primary.startsAt = oldStart;
primary.endsAt = oldEnd;
const photos = [...gallery];
gallery.splice(0);
assert.doesNotThrow(render);
gallery.push(photos[0]);
assert.doesNotThrow(render);
gallery.splice(0, gallery.length, ...photos);
// Visible words must come from data/content, not JSX text or label attributes.
for (const file of fs
  .readdirSync(path.join(root, 'src/app'))
  .filter((f) => f.endsWith('.tsx'))) {
  const source = ts.createSourceFile(
    file,
    fs.readFileSync(path.join(root, 'src/app', file), 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  function visit(node) {
    if (ts.isJsxText(node))
      assert(
        !/[A-Za-z0-9]/.test(node.text),
        `${file}: hardcoded JSX copy: ${node.text.trim()}`,
      );
    if (
      ts.isJsxAttribute(node) &&
      ['alt', 'title', 'aria-label', 'placeholder'].includes(node.name.getText(source)) &&
      node.initializer &&
      ts.isStringLiteral(node.initializer)
    )
      assert.equal(node.initializer.text, '', `${file}: hardcoded accessible copy`);
    ts.forEachChild(node, visit);
  }
  visit(source);
}
console.log(
  'PASS: all section toggles, ordering, data/copy propagation, calendar dates, empty/single gallery, and TSX copy audit.',
);
