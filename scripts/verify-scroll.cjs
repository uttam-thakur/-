const fs = require('node:fs');
const assert = require('node:assert/strict');
const source = fs.readFileSync('src/animations/animateScrollCards.ts', 'utf8');
const body = source.match(
  /const renderRoll\s*=\s*\(progress:\s*number\)\s*=>\s*\{([\s\S]*?)\n\s*\};/,
)[1];
const results = new Map(),
  paper = {},
  roller = {},
  lettering = {};
const gsap = { set: (target, value) => results.set(target, value) };
const render = Function(
  'progress',
  'gsap',
  'paper',
  'roller',
  'lettering',
  'scroll',
  body,
);
for (const width of [280, 343, 375, 416]) {
  const sample = (progress) => {
    render(progress, gsap, paper, roller, lettering, { clientWidth: width });
    return results.get(roller).y;
  };
  assert.equal(sample(0), -width * 1.125);
  const midway = sample(0.5);
  assert(midway < 0 && midway > -width * 1.125);
  assert(Math.abs(sample(1)) < 0.001);
  assert(Math.abs(sample(1.5)) < 0.001, 'Must remain open beyond the opening interval');
  assert.equal(sample(0.5), midway, 'Reverse scroll must retrace the animation');
  assert.equal(sample(0), -width * 1.125);
  assert.equal(results.get(lettering).opacity, 0);
}
console.log('PASS: opens downward, stays open, reverses upward; four responsive widths.');
