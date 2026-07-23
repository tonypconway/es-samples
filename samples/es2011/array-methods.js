/**
 * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
 * Standard Specification: https://262.ecma-international.org/5.1/
 */

/*
 * Array Iteration Methods (forEach, map, filter, reduce, reduceRight, some, every, indexOf, lastIndexOf, isArray)
 * Adds functional programming methods directly to the Array prototype for traversing, mapping, filtering, and reducing arrays,
 * along with the static `Array.isArray()` method to reliably differentiate arrays from other objects.
 * Spec: https://262.ecma-international.org/5.1/#sec-15.4.4.14
 * Spec (Array.isArray): https://262.ecma-international.org/5.1/#sec-15.4.3.2
 */
export function demoArrayMethods() {
  const numbers = [1, 2, 3, 4, 5];

  const doubled = numbers.map(n => n * 2);                // [2, 4, 6, 8, 10]
  const evens = numbers.filter(n => n % 2 === 0);         // [2, 4]
  const sum = numbers.reduce((acc, curr) => acc + curr, 0); // 15
  const hasEven = numbers.some(n => n % 2 === 0);         // true
  const allPositive = numbers.every(n => n > 0);          // true
  const indexOfThree = numbers.indexOf(3);                // 2
  const isArrayCheck = Array.isArray(numbers);            // true

  return { doubled, evens, sum, hasEven, allPositive, indexOfThree, isArrayCheck };
}
