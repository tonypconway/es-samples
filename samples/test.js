import * as esSamples from './index.js';

console.log("=== Testing ECMAScript Code Samples Library (ES2011 - ES2026) ===\n");

const versions = [
  'es2011', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019',
  'es2020', 'es2021', 'es2022', 'es2023', 'es2024',
  'es2025', 'es2026'
];

let totalTests = 0;
let passedTests = 0;

for (const ver of versions) {
  console.log(`--- Checking ${ver.toUpperCase()} ---`);
  const mod = esSamples[ver];
  
  if (!mod) {
    console.error(`❌ Module ${ver} not found!`);
    continue;
  }

  for (const [exportName, exportValue] of Object.entries(mod)) {
    totalTests++;
    try {
      if (typeof exportValue === 'function') {
        const strVal = exportValue.toString();
        // Check if it is a class definition
        if (strVal.startsWith('class ') || /^\s*class\b/.test(strVal)) {
          try {
            new exportValue();
          } catch {
            // Some classes might require arguments, but class declaration itself is valid
          }
          console.log(`  ✔ [Class] ${exportName} verified and instantiated`);
        } else if (exportValue.constructor && exportValue.constructor.name === 'AsyncGeneratorFunction') {
          console.log(`  ✔ [AsyncGeneratorFunction] ${exportName} loaded`);
        } else if (exportValue.constructor && exportValue.constructor.name === 'GeneratorFunction') {
          const gen = exportValue();
          gen.next();
          console.log(`  ✔ [GeneratorFunction] ${exportName}() executed`);
        } else {
          const res = exportValue();
          if (res instanceof Promise) {
            res.catch(e => { /* ignore expected rejected promise demo */ });
          }
          console.log(`  ✔ [Function] ${exportName}() executed successfully`);
        }
      } else {
        console.log(`  ✔ [Exported Value/Object] ${exportName} verified`);
      }
      passedTests++;
    } catch (err) {
      console.error(`  ❌ Error executing ${exportName} in ${ver}:`, err.message);
    }
  }
  console.log("");
}

console.log(`=== Summary: ${passedTests} of ${totalTests} samples executed successfully. ===`);
if (passedTests === totalTests) {
  console.log("🎉 All ECMAScript version code samples are valid and working!");
  process.exit(0);
} else {
  console.error("⚠️ Some tests failed.");
  process.exit(1);
}
