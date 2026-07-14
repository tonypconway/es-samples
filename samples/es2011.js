/**
 * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
 * Standard Specification: https://262.ecma-international.org/5.1/
 */

/*
 * Strict Mode ("use strict")
 * Introduces a restricted variant of JavaScript that eliminates silent errors by throwing exceptions, disables features
 * that are confusing or poorly thought out, and simplifies variable resolution (e.g., forbidding implicit global creation).
 * Spec: https://262.ecma-international.org/5.1/#sec-10.1.1
 */
export function demoStrictMode() {
  "use strict";
  try {
    // In strict mode, assigning to an undeclared variable throws a ReferenceError instead of creating a global
    eval("undeclaredGlobalVar = 42;");
    return false;
  } catch (error) {
    return error instanceof ReferenceError;
  }
}

/*
 * Native JSON Parsing and Serialization (JSON.parse and JSON.stringify)
 * Standardizes a built-in `JSON` object for parsing JSON text strings into JavaScript objects and serializing
 * values into JSON formatted strings without relying on `eval()`.
 * Spec: https://262.ecma-international.org/5.1/#sec-15.12
 */
export function demoJSON() {
  const data = { name: "ES5.1", year: 2011, features: ["JSON", "Strict Mode"] };
  const serialized = JSON.stringify(data);
  const parsed = JSON.parse(serialized);

  return { serialized, year: parsed.year };
}

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

/*
 * Object Literal Getters and Setters
 * Introduces syntax for binding an object property to a function that will be invoked when that property is looked up (`get`)
 * or assigned to (`set`).
 * Spec: https://262.ecma-international.org/5.1/#sec-11.1.5
 */
export function demoGettersAndSetters() {
  const user = {
    firstName: "John",
    lastName: "Doe",
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    set fullName(name) {
      const parts = name.split(" ");
      this.firstName = parts[0];
      this.lastName = parts[1] || "";
    }
  };

  const initial = user.fullName; // "John Doe"
  user.fullName = "Jane Smith";
  
  return { initial, updated: user.fullName, firstName: user.firstName };
}

/*
 * Function.prototype.bind()
 * Creates a new function that, when called, has its `this` keyword set to the provided value, with a given sequence
 * of arguments preceding any provided when the new function is called.
 * Spec: https://262.ecma-international.org/5.1/#sec-15.3.4.5
 */
export function demoFunctionBind() {
  const moduleObj = {
    x: 42,
    getX: function() {
      return this.x;
    }
  };

  const unboundGetX = moduleObj.getX;
  // unboundGetX() in global scope would fail or return undefined; bind ties `this` to moduleObj
  const boundGetX = unboundGetX.bind(moduleObj);

  return { boundResult: boundGetX() };
}

/*
 * String.prototype.trim()
 * Strips leading and trailing whitespace from strings.
 * Spec: https://262.ecma-international.org/5.1/#sec-15.5.4.20
 */
export function demoStringTrim() {
  const raw = "   ES5.1 String   ";
  return raw.trim(); // "ES5.1 String"
}

/*
 * String Property Access (Bracket Notation)
 * Standardizes character access via square bracket notation (str[index]) as an alternative to charAt(index).
 * Spec: https://262.ecma-international.org/5.1/#sec-15.5.5.2
 */
export function demoStringIndexing() {
  const str = "ES5.1";
  return str[0]; // "E"
}

/*
 * Date.now() and Date ISO/JSON Formatting
 * Introduces `Date.now()` to get the current timestamp in milliseconds without instantiating a Date object,
 * along with standard `.toISOString()` and `.toJSON()` serialization methods.
 * Spec: https://262.ecma-international.org/5.1/#sec-15.9.4.4
 */
export function demoDateEnhancements() {
  const timestamp = Date.now();
  const dateObj = new Date(timestamp);
  
  return {
    isNumber: typeof timestamp === "number",
    isoString: dateObj.toISOString(),
    jsonString: dateObj.toJSON()
  };
}
