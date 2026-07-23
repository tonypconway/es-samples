/**
 * ECMAScript 2015 (6th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/6.0/
 */

/*
 * Enhanced Built-in Methods
 * Numerous method additions across Object (`Object.assign`, `Object.is`), Array (`Array.from`, `Array.of`, `find`, `findIndex`),
 * String (`includes`, `startsWith`, `endsWith`, `repeat`), Number (`Number.isNaN`, `Number.isInteger`), and Math (`Math.trunc`, `Math.sign`).
 * Spec (Object.assign): https://262.ecma-international.org/6.0/#sec-object.assign
 * Spec (Array.from): https://262.ecma-international.org/6.0/#sec-array.from
 * Spec (String.prototype.includes): https://262.ecma-international.org/6.0/#sec-string.prototype.includes
 * Spec (Number.isInteger): https://262.ecma-international.org/6.0/#sec-number.isinteger
 */
export function demoBuiltinExtensions() {
  const assignedObj = Object.assign({}, { a: 1 }, { b: 2 });
  const arrayFromStr = Array.from("ES6");
  const foundItem = [10, 20, 30, 40].find(val => val > 25);
  const strIncludes = "ECMAScript".includes("Script");
  const isInt = Number.isInteger(42.0);
  const truncatedMath = Math.trunc(42.99);

  return { assignedObj, arrayFromStr, foundItem, strIncludes, isInt, truncatedMath };
}
