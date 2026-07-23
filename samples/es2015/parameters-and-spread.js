/**
 * ECMAScript 2015 (6th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/6.0/
 */

/*
 * Default Parameter Values, Rest Parameters, and Spread Syntax
 * Allows formal parameters to be initialized with default values if no value or `undefined` is passed.
 * Rest parameters (`...rest`) collect remaining arguments into an array. Spread syntax (`...iterable`) expands iterables.
 * Spec: https://262.ecma-international.org/6.0/#sec-parameter-lists
 * Spec (Spread): https://262.ecma-international.org/6.0/#sec-array-initializer
 */
export function demoParametersAndSpread(multiplier = 2, ...numbers) {
  const multiplied = numbers.map(n => n * multiplier);
  const combinedArray = [0, ...multiplied, 100];
  return combinedArray;
}
