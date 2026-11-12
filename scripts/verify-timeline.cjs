const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, file) =>
  module._compile(
    ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
    }).outputText,
    file,
  );
const { advanceTimelineSpring } = require('../src/helpers/timelineSpring.ts');
function run(rate, target, state = { position: 0, velocity: 0 }) {
  for (let i = 0; i < rate * 2; i++) {
    state = advanceTimelineSpring(state.position, state.velocity, target, 1 / rate);
    assert(Number.isFinite(state.position));
    assert(state.position >= -0.001 && state.position <= 1.001);
  }
  return state;
}
const slow = run(30, 1),
  fast = run(120, 1);
assert(Math.abs(slow.position - fast.position) < 1e-9, 'Frame-rate independent motion');
assert(Math.abs(fast.position - 1) < 0.001, 'Settles at destination');
assert(run(60, 0, fast).position < 0.001, 'Reverses and settles');
console.log(
  'PASS: spring at 30/120 FPS, finite bounded motion, settling and reverse travel.',
);
