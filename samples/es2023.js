#!/usr/bin/env node
/**
 * ECMAScript 2023 (14th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/14.0/
 */

/*
 * Hashbang Grammar (#!)
 * Standardizes syntax stripping for executable scripts starting with `#!` (hashbang/shebang) on the very first line
 * of a source file, allowing JavaScript files to run directly in Unix-like CLI environments without syntax errors.
 * Note: Notice the `#!/usr/bin/env node` at line 1 of this file demonstrating this syntax!
 * Spec: https://262.ecma-international.org/14.0/#sec-hashbang
 */
export const hashbangDemo = "This file begins with a valid ES2023 hashbang comment on line 1.";

/*
 * Array.prototype.findLast()
 * Iterates through an array in reverse order to find the value of the first element satisfying the predicate.
 * Spec: https://262.ecma-international.org/14.0/#sec-array.prototype.findlast
 */
export function demoArrayFindLast() {
  const numbers = [5, 12, 50, 130, 44, 130];
  return numbers.findLast(n => n > 100); // 130
}

/*
 * Array.prototype.findLastIndex()
 * Iterates through an array in reverse order to find the index of the first element satisfying the predicate.
 * Spec: https://262.ecma-international.org/14.0/#sec-array.prototype.findlastindex
 */
export function demoArrayFindLastIndex() {
  const numbers = [5, 12, 50, 130, 44, 130];
  return numbers.findLastIndex(n => n > 100); // 5
}

/*
 * Symbols as WeakMap and WeakSet Keys
 * Expands `WeakMap` keys and `WeakSet` values to allow non-registered Symbol primitives (symbols created with `Symbol()`
 * rather than `Symbol.for()`) in addition to object references, since non-registered symbols have unique identities.
 * Spec: https://262.ecma-international.org/14.0/#sec-weakmap-objects
 */
export function demoSymbolsAsWeakKeys() {
  const weakMap = new WeakMap();
  const keySymbol = Symbol("weakKey");
  
  weakMap.set(keySymbol, "associated metadata");
  
  return {
    hasKey: weakMap.has(keySymbol),
    value: weakMap.get(keySymbol)
  };
}

/*
 * Change by Copy Methods (toReversed, toSorted, toSpliced, and with)
 * Introduces non-mutating equivalents to traditional Array/TypedArray mutators. Instead of modifying the array in place,
 * these methods return a new array copy with the transformations applied.
 * Spec (toReversed): https://262.ecma-international.org/14.0/#sec-array.prototype.toreversed
 * Spec (toSorted): https://262.ecma-international.org/14.0/#sec-array.prototype.tosorted
 * Spec (toSpliced): https://262.ecma-international.org/14.0/#sec-array.prototype.tospliced
 * Spec (with): https://262.ecma-international.org/14.0/#sec-array.prototype.with
 */
export function demoChangeByCopy() {
  const original = [3, 1, 4, 2];
  
  const reversed = original.toReversed();       // [2, 4, 1, 3]
  const sorted = original.toSorted((a, b) => a - b); // [1, 2, 3, 4]
  const spliced = original.toSpliced(1, 2, 9, 8);    // [3, 9, 8, 2]
  const replaced = original.with(2, 99);        // [3, 1, 99, 2] (replaces index 2 with 99)
  
  return { original, reversed, sorted, spliced, replaced };
}
