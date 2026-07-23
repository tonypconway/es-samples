/**
 * ECMAScript 2023 (14th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/14.0/
 */

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
