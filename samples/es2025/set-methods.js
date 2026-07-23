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
