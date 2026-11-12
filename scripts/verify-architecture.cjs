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
for (const file of walk('src/components').filter((f) => f.endsWith('.tsx'))) {
  const ast = ts.createSourceFile(
    file,
    fs.readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  assert.equal(
    ast.statements.filter(
      (n) => ts.isFunctionDeclaration(n) && /^[A-Z]/.test(n.name?.text || ''),
    ).length,
    1,
    file,
  );
}
console.log('PASS: one component per file.');
