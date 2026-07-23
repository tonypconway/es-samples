/**
 * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
 * Standard Specification: https://262.ecma-international.org/5.1/
 */

/*
 * Property Descriptors and Object Reflection (defineProperty, create, keys, freeze, seal, preventExtensions)
 * Enables precise control over object property attributes (`configurable`, `enumerable`, `writable`, `value`) via descriptors.
 * Also adds object meta-operations like `Object.keys()`, `Object.create()`, and immutability controls (`freeze`, `seal`).
 * Spec (defineProperty): https://262.ecma-international.org/5.1/#sec-15.2.3.6
 * Spec (create): https://262.ecma-international.org/5.1/#sec-15.2.3.5
 * Spec (freeze): https://262.ecma-international.org/5.1/#sec-15.2.3.9
 */
export function demoObjectPropertyDescriptors() {
  // Object.create with property descriptors
  const obj = Object.create(Object.prototype, {
    readOnlyProp: {
      value: "cannot change",
      writable: false,
      enumerable: true,
      configurable: false
    }
  });

  const keys = Object.keys(obj); // ["readOnlyProp"]

  // Freezing an object prevents new properties, deletions, and property modifications
  const frozenObj = Object.freeze({ status: "locked" });
  const isFrozen = Object.isFrozen(frozenObj); // true

  return { value: obj.readOnlyProp, keys, isFrozen };
}
