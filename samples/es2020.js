/**
 * ECMAScript 2020 (11th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/11.0/
 */

/*
 * BigInt Arbitrary-Precision Integers
 * Introduces a new numeric primitive type `BigInt` for representing integers of arbitrary magnitude,
 * bypassing Number.MAX_SAFE_INTEGER limitations. Created via `n` suffix or `BigInt()` function.
 * Spec: https://262.ecma-international.org/11.0/#sec-bigint-objects
 * Spec (Literals): https://262.ecma-international.org/11.0/#sec-numeric-literals
 */
export function demoBigInt() {
  const maxSafe = BigInt(Number.MAX_SAFE_INTEGER);
  const largeInteger = 9007199254740991n + 10n;
  const product = largeInteger * 2n;
  
  return {
    largeIntegerString: largeInteger.toString(),
    productString: product.toString(),
    isBigInt: typeof largeInteger === "bigint"
  };
}

/*
 * Nullish Coalescing Operator (??)
 * A logical operator returning its right-hand operand when its left-hand operand is `null` or `undefined`,
 * and otherwise returning its left-hand operand. Avoids overriding valid falsy values like `0` or `""`.
 * Spec: https://262.ecma-international.org/11.0/#sec-nullish-coalescing-operator
 */
export function demoNullishCoalescing() {
  const count = 0;
  const text = "";
  const missing = null;

  return {
    countResult: count ?? 10,       // 0 (whereas count || 10 is 10)
    textResult: text ?? "default",  // "" (whereas text || "default" is "default")
    missingResult: missing ?? "N/A" // "N/A"
  };
}

/*
 * Optional Chaining Operator (?.)
 * Allows reading the value of a property located deep within a chain of connected objects without having to
 * expressly validate that each reference in the chain is valid. If a reference is nullish, expression short-circuits to `undefined`.
 * Spec: https://262.ecma-international.org/11.0/#sec-optional-chaining-operator
 */
export function demoOptionalChaining(user) {
  const street = user?.address?.street;
  const zipCode = user?.address?.getZipCode?.();
  const firstItem = user?.orders?.[0];

  return { street, zipCode, firstItem };
}

/*
 * Promise.allSettled()
 * Returns a promise that resolves after all of the given promises have either fulfilled or rejected, with an array of objects
 * describing the outcome (`status: "fulfilled" | "rejected"`) of each promise.
 * Spec: https://262.ecma-international.org/11.0/#sec-promise.allsettled
 */
export async function demoPromiseAllSettled() {
  const promises = [
    Promise.resolve("Success 1"),
    Promise.reject("Error 1"),
    Promise.resolve("Success 2")
  ];

  const results = await Promise.allSettled(promises);
  return results;
}

/*
 * globalThis
 * Provides a universal standard mechanism to access the global `this` value across different JavaScript environments
 * (e.g., `window` in browser, `global` in Node.js, `self` in Web Workers).
 * Spec: https://262.ecma-international.org/11.0/#sec-globalthis
 */
export function demoGlobalThis() {
  return typeof globalThis !== "undefined" && globalThis === Object(globalThis);
}

/*
 * String.prototype.matchAll()
 * Returns an iterator of all results matching a string against a regular expression (which must have the `g` flag),
 * including capturing groups for each match.
 * Spec: https://262.ecma-international.org/11.0/#sec-string.prototype.matchall
 */
export function demoMatchAll() {
  const regex = /test(\d+)/g;
  const str = "test1 and test2 and test3";
  
  const matches = [...str.matchAll(regex)];
  return matches.map(m => ({ fullMatch: m[0], group: m[1], index: m.index }));
}

/*
 * Dynamic Import (import())
 * Function-like syntax allowing asynchronous, on-demand module loading at runtime, returning a Promise that resolves
 * to the module namespace object.
 * Spec: https://262.ecma-international.org/11.0/#sec-import-calls
 */
export async function demoDynamicImport() {
  // Dynamically importing ES2015 sample module
  const es2015Module = await import("./es2015.js");
  return typeof es2015Module.add === "function";
}

/*
 * Namespace Exports (export * as ns from 'module')
 * Convenient syntax to re-export all exported properties of another module as a single named namespace object.
 * Spec: https://262.ecma-international.org/11.0/#sec-exports
 */
export * as es2015Namespace from "./es2015.js";

/*
 * import.meta Meta-Property
 * An object exposing context-specific metadata to a JavaScript module, such as the URL of the current module (`import.meta.url`).
 * Spec: https://262.ecma-international.org/11.0/#sec-meta-properties
 */
export function demoImportMeta() {
  return typeof import.meta === "object" && typeof import.meta.url === "string";
}
