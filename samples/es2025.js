/**
 * ECMAScript 2025 (16th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/16.0/
 */

/*
 * New Set Methods (intersection, union, difference, symmetricDifference, isSubsetOf, isSupersetOf, isDisjointFrom)
 * Standardizes mathematical set operations natively on `Set` instances, returning new Set objects with the computed results
 * or boolean values for subset/superset/disjoint comparisons.
 * Spec (intersection): https://262.ecma-international.org/16.0/#sec-set.prototype.intersection
 * Spec (union): https://262.ecma-international.org/16.0/#sec-set.prototype.union
 * Spec (difference): https://262.ecma-international.org/16.0/#sec-set.prototype.difference
 * Spec (isSubsetOf): https://262.ecma-international.org/16.0/#sec-set.prototype.issubsetof
 */
export function demoSetMethods() {
  const setA = new Set([1, 2, 3, 4]);
  const setB = new Set([3, 4, 5, 6]);
  const setC = new Set([1, 2]);

  const intersection = setA.intersection(setB);             // Set { 3, 4 }
  const union = setA.union(setB);                           // Set { 1, 2, 3, 4, 5, 6 }
  const difference = setA.difference(setB);                 // Set { 1, 2 }
  const symmetricDiff = setA.symmetricDifference(setB);     // Set { 1, 2, 5, 6 }
  const isSubset = setC.isSubsetOf(setA);                   // true
  const isSuperset = setA.isSupersetOf(setC);               // true
  const isDisjoint = setA.isDisjointFrom(new Set([10, 20]));// true

  return {
    intersection: Array.from(intersection),
    union: Array.from(union),
    difference: Array.from(difference),
    symmetricDiff: Array.from(symmetricDiff),
    isSubset,
    isSuperset,
    isDisjoint
  };
}

/*
 * Iterator Helpers (Iterator.from, map, filter, take, drop, flatMap, reduce, toArray, some, every, find)
 * Extends iterator objects with functional programming methods similar to Array prototype methods, enabling lazy,
 * memory-efficient processing of potentially infinite sequences without intermediate array allocations.
 * Spec: https://262.ecma-international.org/16.0/#sec-iterator-objects
 * Spec (map): https://262.ecma-international.org/16.0/#sec-iterator.prototype.map
 * Spec (take): https://262.ecma-international.org/16.0/#sec-iterator.prototype.take
 */
export function demoIteratorHelpers() {
  function* infiniteNumbers() {
    let n = 1;
    while (true) yield n++;
  }

  // Create iterator and pipeline lazy transformations
  const result = infiniteNumbers()
    .filter(n => n % 2 === 0) // even numbers: 2, 4, 6, 8, 10...
    .map(n => n * 10)         // multiplied: 20, 40, 60, 80...
    .drop(1)                  // drop first: 40, 60, 80...
    .take(3)                  // take three: 40, 60, 80
    .toArray();               // [40, 60, 80]

  return result;
}

/*
 * Promise.try()
 * Wraps synchronous or asynchronous function execution inside a Promise, ensuring that any exceptions thrown synchronously
 * are caught and converted into a rejected Promise rather than terminating execution synchronously.
 * Spec: https://262.ecma-international.org/16.0/#sec-promise.try
 */
export async function demoPromiseTry(shouldThrowSync = false) {
  function possiblySyncOperation() {
    if (shouldThrowSync) {
      throw new Error("Synchronous failure");
    }
    return "Success value";
  }

  try {
    const res = await Promise.try(possiblySyncOperation);
    return { success: res };
  } catch (err) {
    return { error: err.message };
  }
}

/*
 * RegExp Duplicate Named Capture Groups
 * Allows multiple capture groups in different alternatives of a regular expression (separated by `|`) to share the exact
 * same group name (`(?<name>...)`), simplifying pattern matching across mutually exclusive branch formats.
 * Spec: https://262.ecma-international.org/16.0/#sec-group-specifiers
 */
export function demoDuplicateNamedCaptureGroups() {
  // Both branch options use the group name 'year'
  const regex = /(?<year>\d{4})-[a-z]+|[a-z]+-(?<year>\d{4})/i;
  
  const match1 = regex.exec("2025-june");
  const match2 = regex.exec("june-2025");

  return {
    firstFormatYear: match1.groups.year,  // "2025"
    secondFormatYear: match2.groups.year  // "2025"
  };
}

/*
 * Float16Array and Math.f16round()
 * Introduces 16-bit half-precision floating point number support via `Float16Array` typed arrays and `Math.f16round()`
 * rounding method, optimizing memory footprint and GPU interoperability for machine learning and graphics workflows.
 * Spec (Float16Array): https://262.ecma-international.org/16.0/#sec-float16array
 * Spec (Math.f16round): https://262.ecma-international.org/16.0/#sec-math.f16round
 */
export function demoFloat16() {
  const f16Array = new Float16Array([1.337, 3.14159]);
  const rounded = Math.f16round(1.337);

  return {
    element0: f16Array[0],
    element1: f16Array[1],
    roundedValue: rounded,
    bytesPerElement: Float16Array.BYTES_PER_ELEMENT // 2
  };
}

/*
 * Import Attributes (import ... with { type: 'json' })
 * Provides inline syntax for specifying module import assertions/attributes using the `with` keyword, informing runtime
 * module loaders how to interpret loaded resources (e.g., verifying a file is parsed as JSON rather than executed as code).
 * Spec: https://262.ecma-international.org/16.0/#sec-import-attributes
 */
export async function demoImportAttributes() {
  try {
    const pkg = await import("../package.json", { with: { type: "json" } });
    return pkg.default?.name ?? "es-samples";
  } catch {
    return "es-samples";
  }
}
