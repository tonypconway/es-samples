import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { features } from 'web-features';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../');

const manifestPath = path.join(projectRoot, 'features.json');
const markdownPath = path.join(projectRoot, 'FEATURES.md');
const samplesDir = path.join(projectRoot, 'samples');

// Edition labels mapping for filenames
const EDITION_MAP = {
  'es2011.js': 'ES5.1 (2011)',
  'es2015.js': 'ES2015',
  'es2016.js': 'ES2016',
  'es2017.js': 'ES2017',
  'es2018.js': 'ES2018',
  'es2019.js': 'ES2019',
  'es2020.js': 'ES2020',
  'es2021.js': 'ES2021',
  'es2022.js': 'ES2022',
  'es2023.js': 'ES2023',
  'es2024.js': 'ES2024',
  'es2025.js': 'ES2025',
  'es2026.js': 'ES2026'
};

// Build reverse lookup map of BCD key -> { featId, status }
const bcdToWfMap = new Map();
for (const [featId, feat] of Object.entries(features)) {
  if (feat.compat_features) {
    for (const ck of feat.compat_features) {
      bcdToWfMap.set(ck, {
        featId,
        feature: feat,
        status: feat.status?.by_compat_key?.[ck] || feat.status
      });
    }
  }
}

// Function name to explicit { compatKey, webFeatureId } map
const FUNCTION_MAPPINGS = {
  'demoStrictMode': { compatKey: 'javascript.statements.strict_mode', webFeatureId: 'strict-mode' },
  'demoJSON': { compatKey: 'javascript.builtins.JSON', webFeatureId: 'json' },
  'demoArrayMethods': { compatKey: 'javascript.builtins.Array.filter', webFeatureId: 'array-iteration-methods' },
  'demoObjectPropertyDescriptors': { compatKey: 'javascript.builtins.Object.defineProperty', webFeatureId: 'object-object' },
  'demoGettersAndSetters': { compatKey: 'javascript.operators.object_initializer.getter', webFeatureId: 'object-object' },
  'demoFunctionBind': { compatKey: 'javascript.builtins.Function.bind', webFeatureId: 'functions' },
  'demoStringTrim': { compatKey: 'javascript.builtins.String.trim', webFeatureId: 'strings' },
  'demoStringIndexing': { compatKey: 'javascript.builtins.String.bracket_access', webFeatureId: 'strings' },
  'demoDateEnhancements': { compatKey: 'javascript.builtins.Date.now', webFeatureId: 'date' },
  'demoLet': { compatKey: 'javascript.statements.let', webFeatureId: 'let-const' },
  'demoConst': { compatKey: 'javascript.statements.const', webFeatureId: 'let-const' },
  'add': { compatKey: 'javascript.functions.arrow_functions', webFeatureId: 'functions' },
  'createPoint': { compatKey: 'javascript.functions.arrow_functions', webFeatureId: 'functions' },
  'lexicalThisDemo': { compatKey: 'javascript.functions.arrow_functions', webFeatureId: 'functions' },
  'Animal': { compatKey: 'javascript.statements.class', webFeatureId: 'class-syntax' },
  'Dog': { compatKey: 'javascript.statements.class', webFeatureId: 'class-syntax' },
  'demoTemplateLiterals': { compatKey: 'javascript.grammar.template_literals', webFeatureId: 'template-literals' },
  'demoEnhancedObjectLiterals': { compatKey: 'javascript.operators.object_initializer.shorthand_property_names', webFeatureId: 'object-object' },
  'demoDestructuring': { compatKey: 'javascript.operators.destructuring', webFeatureId: 'destructuring' },
  'demoParametersAndSpread': { compatKey: 'javascript.functions.default_parameters', webFeatureId: 'functions' },
  'demoForOfAndIterators': { compatKey: 'javascript.statements.for_of', webFeatureId: 'iterators' },
  'demoGenerator': { compatKey: 'javascript.statements.generator_function', webFeatureId: 'generators' },
  'demoPromise': { compatKey: 'javascript.builtins.Promise', webFeatureId: 'promise' },
  'demoCollections': { compatKey: 'javascript.builtins.Map', webFeatureId: 'map' },
  'demoSymbols': { compatKey: 'javascript.builtins.Symbol', webFeatureId: 'symbol' },
  'moduleFeatureDemo': { compatKey: 'javascript.statements.import', webFeatureId: 'js-modules' },
  'demoProxyAndReflect': { compatKey: 'javascript.builtins.Proxy', webFeatureId: 'proxy-reflect' },
  'demoNumericLiterals': { compatKey: 'javascript.grammar.binary_numeric_literals', webFeatureId: 'number' },
  'demoBuiltinExtensions': { compatKey: 'javascript.builtins.Object.assign', webFeatureId: 'object-object' },
  'demoExponentiationOperator': { compatKey: 'javascript.operators.exponentiation', webFeatureId: 'exponentiation' },
  'demoArrayIncludes': { compatKey: 'javascript.builtins.Array.includes', webFeatureId: 'array-includes' },
  'demoAsyncAwait': { compatKey: 'javascript.operators.async_function', webFeatureId: 'async-await' },
  'demoObjectValues': { compatKey: 'javascript.builtins.Object.values', webFeatureId: 'object-object' },
  'demoObjectEntries': { compatKey: 'javascript.builtins.Object.entries', webFeatureId: 'object-object' },
  'demoGetOwnPropertyDescriptors': { compatKey: 'javascript.builtins.Object.getOwnPropertyDescriptors', webFeatureId: 'object-object' },
  'demoStringPadStart': { compatKey: 'javascript.builtins.String.padStart', webFeatureId: 'string-pad' },
  'demoStringPadEnd': { compatKey: 'javascript.builtins.String.padEnd', webFeatureId: 'string-pad' },
  'demoTrailingCommas': { compatKey: 'javascript.grammar.trailing_commas.trailing_commas_in_functions', webFeatureId: 'functions' },
  'demoSharedMemoryAndAtomics': { compatKey: 'javascript.builtins.SharedArrayBuffer', webFeatureId: 'shared-memory' },
  'demoAsyncGenerator': { compatKey: 'javascript.statements.for_await_of', webFeatureId: 'async-iterators' },
  'demoAsyncIteration': { compatKey: 'javascript.statements.for_await_of', webFeatureId: 'async-iterators' },
  'demoObjectRestSpread': { compatKey: 'javascript.operators.object_initializer.spread_properties', webFeatureId: 'object-object' },
  'demoPromiseFinally': { compatKey: 'javascript.builtins.Promise.finally', webFeatureId: 'promise-finally' },
  'demoNamedCaptureGroups': { compatKey: 'javascript.regular_expressions.named_capturing_group', webFeatureId: 'regexp' },
  'demoUnicodePropertyEscapes': { compatKey: 'javascript.regular_expressions.unicode_character_class_escape', webFeatureId: 'regexp' },
  'demoLookbehindAssertions': { compatKey: 'javascript.regular_expressions.lookbehind_assertion', webFeatureId: 'regexp' },
  'demoDotAllFlag': { compatKey: 'javascript.builtins.RegExp.dotAll', webFeatureId: 'regexp' },
  'demoTemplateLiteralRevision': { compatKey: 'javascript.grammar.template_literals.template_literal_revision', webFeatureId: 'template-literals' },
  'demoArrayFlat': { compatKey: 'javascript.builtins.Array.flat', webFeatureId: 'array-flat' },
  'demoArrayFlatMap': { compatKey: 'javascript.builtins.Array.flatMap', webFeatureId: 'array-flat' },
  'demoObjectFromEntries': { compatKey: 'javascript.builtins.Object.fromEntries', webFeatureId: 'object-object' },
  'demoStringTrimStart': { compatKey: 'javascript.builtins.String.trimStart', webFeatureId: 'string-trim-startend' },
  'demoStringTrimEnd': { compatKey: 'javascript.builtins.String.trimEnd', webFeatureId: 'string-trim-startend' },
  'demoOptionalCatchBinding': { compatKey: 'javascript.statements.try.optional_catch_binding', webFeatureId: 'optional-catch-binding' },
  'demoSymbolDescription': { compatKey: 'javascript.builtins.Symbol.description', webFeatureId: 'symbol' },
  'demoWellFormedJSON': { compatKey: 'javascript.builtins.JSON.stringify.well_formed_stringify', webFeatureId: 'json' },
  'demoStableSort': { compatKey: 'javascript.builtins.Array.sort.stable_sorting', webFeatureId: 'stable-array-sort' },
  'demoFunctionToString': { compatKey: 'javascript.builtins.Function.toString.toString_revision', webFeatureId: 'functions' },
  'demoBigInt': { compatKey: 'javascript.builtins.BigInt', webFeatureId: 'bigint' },
  'demoNullishCoalescing': { compatKey: 'javascript.operators.nullish_coalescing', webFeatureId: 'nullish-coalescing' },
  'demoOptionalChaining': { compatKey: 'javascript.operators.optional_chaining', webFeatureId: 'object-object' },
  'demoPromiseAllSettled': { compatKey: 'javascript.builtins.Promise.allSettled', webFeatureId: 'promise-allsettled' },
  'demoGlobalThis': { compatKey: 'javascript.builtins.globalThis', webFeatureId: 'globalthis' },
  'demoMatchAll': { compatKey: 'javascript.builtins.String.matchAll', webFeatureId: 'string-matchall' },
  'demoDynamicImport': { compatKey: 'javascript.operators.import', webFeatureId: 'js-modules' },
  'es2015Namespace': { compatKey: 'javascript.statements.export.namespace', webFeatureId: 'js-modules' },
  'demoImportMeta': { compatKey: 'javascript.operators.import_meta', webFeatureId: 'js-modules' },
  'demoAggregateError': { compatKey: 'javascript.builtins.AggregateError', webFeatureId: 'promise-any' },
  'demoLogicalAssignment': { compatKey: 'javascript.operators.logical_or_assignment', webFeatureId: 'logical-assignments' },
  'demoReplaceAll': { compatKey: 'javascript.builtins.String.replaceAll', webFeatureId: 'string-replaceall' },
  'demoPromiseAny': { compatKey: 'javascript.builtins.Promise.any', webFeatureId: 'promise-any' },
  'demoWeakRefAndRegistry': { compatKey: 'javascript.builtins.WeakRef', webFeatureId: 'weak-references' },
  'demoNumericSeparators': { compatKey: 'javascript.grammar.numeric_separators', webFeatureId: 'numeric-separators' },
  'Counter': { compatKey: 'javascript.classes.public_class_fields', webFeatureId: 'class-syntax' },
  'ConfigManager': { compatKey: 'javascript.classes.static.initialization_blocks', webFeatureId: 'class-syntax' },
  'SecureBox': { compatKey: 'javascript.classes.private_class_fields_in', webFeatureId: 'class-syntax' },
  'topLevelAwaitDemo': { compatKey: 'javascript.operators.await.top_level', webFeatureId: 'async-await' },
  'demoAtMethod': { compatKey: 'javascript.builtins.Array.at', webFeatureId: 'array-at' },
  'demoObjectHasOwn': { compatKey: 'javascript.builtins.Object.hasOwn', webFeatureId: 'object-hasown' },
  'demoErrorCause': { compatKey: 'javascript.builtins.Error.cause', webFeatureId: 'error-cause' },
  'demoMatchIndices': { compatKey: 'javascript.builtins.RegExp.hasIndices', webFeatureId: 'regexp' },
  'hashbangDemo': { compatKey: 'javascript.grammar.hashbang_comments', webFeatureId: 'hashbang-comments' },
  'demoArrayFindLast': { compatKey: 'javascript.builtins.Array.findLast', webFeatureId: 'array-findlast' },
  'demoArrayFindLastIndex': { compatKey: 'javascript.builtins.Array.findLastIndex', webFeatureId: 'array-findlast' },
  'demoSymbolsAsWeakKeys': { compatKey: 'javascript.builtins.WeakMap.symbol_as_keys', webFeatureId: 'weakmap' },
  'demoChangeByCopy': { compatKey: 'javascript.builtins.Array.toSorted', webFeatureId: 'array-by-copy' },
  'demoObjectGroupBy': { compatKey: 'javascript.builtins.Object.groupBy', webFeatureId: 'array-group' },
  'demoMapGroupBy': { compatKey: 'javascript.builtins.Map.groupBy', webFeatureId: 'array-group' },
  'demoPromiseWithResolvers': { compatKey: 'javascript.builtins.Promise.withResolvers', webFeatureId: 'promise-withresolvers' },
  'demoArrayBufferResizeAndTransfer': { compatKey: 'javascript.builtins.ArrayBuffer.resizable', webFeatureId: 'resizable-buffers' },
  'demoStringWellFormedness': { compatKey: 'javascript.builtins.String.isWellFormed', webFeatureId: 'string-wellformed' },
  'demoRegExpVFlag': { compatKey: 'javascript.builtins.RegExp.unicodeSets', webFeatureId: 'regexp' },
  'demoAtomicsWaitAsync': { compatKey: 'javascript.builtins.Atomics.waitAsync', webFeatureId: 'atomics-wait-async' },
  'demoSetMethods': { compatKey: 'javascript.builtins.Set.intersection', webFeatureId: 'set-methods' },
  'demoIteratorHelpers': { compatKey: 'javascript.builtins.Iterator', webFeatureId: 'iterators' },
  'demoPromiseTry': { compatKey: 'javascript.builtins.Promise.try', webFeatureId: 'promise-try' },
  'demoDuplicateNamedCaptureGroups': { compatKey: 'javascript.regular_expressions.named_capturing_group.duplicate_named_capturing_groups', webFeatureId: 'regexp' },
  'demoFloat16': { compatKey: 'javascript.builtins.Float16Array', webFeatureId: 'float16array' },
  'demoImportAttributes': { compatKey: 'javascript.statements.import.import_attributes', webFeatureId: 'js-modules' },
  'demoRegExpEscape': { compatKey: 'javascript.builtins.RegExp.escape', webFeatureId: 'regexp-escape' },
  'demoUint8ArrayEncoding': { compatKey: 'javascript.builtins.Uint8Array.toBase64', webFeatureId: 'uint8array-base64-hex' },
  'demoAtomicsPause': { compatKey: 'javascript.builtins.Atomics.pause', webFeatureId: 'atomics-pause' },
  'demoErrorIsError': { compatKey: 'javascript.builtins.Error.isError', webFeatureId: 'is-error' },
  'demoMathSumPrecise': { compatKey: 'javascript.builtins.Math.sumPrecise', webFeatureId: 'math-sum-precise' }
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function getBcdGithubUrl(compatKey) {
  if (!compatKey || !compatKey.startsWith('javascript.')) return null;
  const parts = compatKey.split('.');
  let relPath;
  if (parts[1] === 'builtins' && parts[2]) {
    relPath = `javascript/builtins/${parts[2]}.json`;
  } else if (parts[1]) {
    relPath = `javascript/${parts[1]}.json`;
  } else {
    relPath = 'javascript.json';
  }
  return `https://github.com/mdn/browser-compat-data/blob/main/${relPath}`;
}

export function syncManifest() {
  let manifest = [];
  if (fs.existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch (e) {
      console.warn('Warning: Could not parse existing features.json, starting fresh.');
    }
  }

  const manifestMap = new Map();
  for (const entry of manifest) {
    if (entry.functionName) {
      manifestMap.set(entry.functionName, entry);
    } else if (entry.id) {
      manifestMap.set(entry.id, entry);
    }
  }

  const sampleFiles = fs.readdirSync(samplesDir)
    .filter(f => /^es\d{4}\.js$/.test(f))
    .sort();

  const activeFnNames = new Set();

  for (const file of sampleFiles) {
    const filePath = path.join(samplesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const esVersion = EDITION_MAP[file] || file.replace('.js', '').toUpperCase();

    // Regex to match comments followed by export declarations
    const blockRegex = /\/\*([^*]|\*(?!\/))*\*\/\s*export\s+(?:function\*?|class|const|async function\*?)\s+([a-zA-Z0-9_$]+)/g;
    let match;

    while ((match = blockRegex.exec(content)) !== null) {
      const commentText = match[0];
      const fnName = match[2];
      activeFnNames.add(fnName);

      // Extract title (first non-empty comment line)
      const lines = commentText.split('\n')
        .map(l => l.replace(/^\s*(\/\*\*?|\*\/|\*\s?)/, '').trim())
        .filter(l => l.length > 0 && !l.startsWith('Spec:') && !l.includes('Code Samples'));

      const rawTitle = lines[0] || fnName;
      const cleanTitle = rawTitle.replace(/\s*\([^)]*\)$/, '').trim();
      const description = lines[1] || cleanTitle;
      const mappings = FUNCTION_MAPPINGS[fnName] || {
        compatKey: `javascript.${fnName}`,
        webFeatureId: slugify(cleanTitle)
      };

      if (!manifestMap.has(fnName)) {
        const newEntry = {
          id: slugify(cleanTitle),
          name: cleanTitle,
          description: description,
          esVersion: esVersion,
          compatKey: mappings.compatKey,
          webFeatureId: mappings.webFeatureId,
          sampleFile: `samples/${file}`,
          functionName: fnName
        };
        manifest.push(newEntry);
        manifestMap.set(fnName, newEntry);
        console.log(`+ Added new feature to manifest: ${cleanTitle} (${fnName})`);
      } else {
        const existing = manifestMap.get(fnName);
        existing.name = cleanTitle;
        existing.description = description;
        existing.sampleFile = `samples/${file}`;
        existing.esVersion = esVersion;
        existing.compatKey = mappings.compatKey;
        existing.webFeatureId = mappings.webFeatureId;
      }
    }
  }

  // Filter out entries whose functions no longer exist in sample files
  manifest = manifest.filter(item => !item.functionName || activeFnNames.has(item.functionName));

  manifest.sort((a, b) => {
    const yearA = getEsYear(a.esVersion);
    const yearB = getEsYear(b.esVersion);
    if (yearA !== yearB) {
      return yearA - yearB;
    }
    return a.name.localeCompare(b.name);
  });

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  return manifest;
}

function escapeTableCell(text) {
  if (!text) return '';
  return String(text).replace(/\|/g, '\\|');
}

function getBaselineInfo(compatKey, webFeatureId) {
  let status = null;
  let resolvedWfId = webFeatureId;

  if (bcdToWfMap.has(compatKey)) {
    const bcd = bcdToWfMap.get(compatKey);
    status = bcd.status;
    if (bcd.featId) resolvedWfId = bcd.featId;
  } else if (features[webFeatureId] || features[`${webFeatureId}s` ]) {
    resolvedWfId = features[webFeatureId] ? webFeatureId : `${webFeatureId}s`;
    status = features[resolvedWfId]?.status;
  }

  if (!status || status.baseline === false || !status.baseline_low_date) {
    return {
      resolvedWfId,
      newlyAvailable: 'Limited availability',
      widelyAvailable: 'Limited availability'
    };
  }

  const newlyAvailable = status.baseline_low_date;
  const d = new Date(`${newlyAvailable}T00:00:00Z`);
  d.setUTCMonth(d.getUTCMonth() + 30);
  const widelyAvailable = d.toISOString().split('T')[0];

  return { resolvedWfId, newlyAvailable, widelyAvailable };
}

function getEsYear(esVer) {
  if (!esVer) return 9999;
  const match = esVer.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 9999;
}

export function generateMarkdown(manifest) {
  let md = `# ECMAScript Language Features Index\n\n`;
  md += `A comprehensive breakdown of ECMAScript language features showcased across the executable code samples in \`es-samples\` (ES2011/ES5.1 through ES2026), cross-referenced with MDN [browser-compat-data](https://github.com/mdn/browser-compat-data) and Baseline web feature identifiers on [webstatus.dev](https://webstatus.dev).\n\n`;
  md += `| Feature Name | Description | ES Edition | MDN Compat Key | web-features Identifier | Baseline Newly available | Baseline Widely available |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

  const sortedManifest = [...manifest].sort((a, b) => {
    const yearA = getEsYear(a.esVersion);
    const yearB = getEsYear(b.esVersion);
    if (yearA !== yearB) {
      return yearA - yearB;
    }
    return a.name.localeCompare(b.name);
  });

  for (const item of sortedManifest) {
    const { resolvedWfId, newlyAvailable, widelyAvailable } = getBaselineInfo(item.compatKey, item.webFeatureId);
    
    const escapedCompatKey = escapeTableCell(item.compatKey);
    const bcdUrl = getBcdGithubUrl(item.compatKey);
    const compatKeyLink = bcdUrl ? `[\`${escapedCompatKey}\`](${bcdUrl})` : `\`${escapedCompatKey}\``;

    const targetWfId = resolvedWfId || item.webFeatureId;
    const escapedWfId = escapeTableCell(targetWfId);
    const webLink = `[\`${escapedWfId}\`](https://webstatus.dev/features/${targetWfId})`;

    const rawName = escapeTableCell(item.name);
    const name = rawName.includes('*') || rawName.includes('`') ? rawName : `**${rawName}**`;
    const description = escapeTableCell(item.description);
    const esVersion = escapeTableCell(item.esVersion);
    const esVersionLink = item.sampleFile ? `[${esVersion}](${item.sampleFile})` : esVersion;

    md += `| ${name} | ${description} | ${esVersionLink} | ${compatKeyLink} | ${webLink} | ${newlyAvailable} | ${widelyAvailable} |\n`;
  }

  fs.writeFileSync(markdownPath, md, 'utf8');
  console.log(`✔ Generated FEATURES.md successfully (${manifest.length} features listed).`);
}

if (process.argv[1] && process.argv[1].endsWith('build-features.js')) {
  const manifest = syncManifest();
  generateMarkdown(manifest);
}
