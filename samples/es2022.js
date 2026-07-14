/**
 * ECMAScript 2022 (13th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/13.0/
 */

/*
 * Class Fields (Public/Private Instance & Static Fields, Private Methods)
 * Extends classes with declarative instance and static fields without requiring constructor initialization, along with
 * truly private members (fields and methods) prefixed with `#` that cannot be accessed outside the class body.
 * Spec: https://262.ecma-international.org/13.0/#sec-class-definitions
 * Spec (Private Identifiers): https://262.ecma-international.org/13.0/#sec-private-bound-identifiers
 */
export class Counter {
  // Public instance field
  name = "Default Counter";
  
  // Private instance field
  #count = 0;
  
  // Public static field
  static totalCounters = 0;
  
  constructor(name) {
    if (name) this.name = name;
    Counter.totalCounters++;
  }

  increment() {
    this.#count++;
    this.#log();
  }

  getCount() {
    return this.#count;
  }

  // Private method
  #log() {
    // Internal logging
  }
}

/*
 * Class Static Initialization Blocks
 * Introduces `static { ... }` blocks within class bodies to evaluate complex static initialization logic with access
 * to private static/instance fields of the class.
 * Spec: https://262.ecma-international.org/13.0/#sec-class-static-initialization-blocks
 */
export class ConfigManager {
  static #secretKey;
  static isInitialized = false;
  
  static {
    try {
      this.#secretKey = "INIT_KEY_" + Math.random().toString(36).slice(2, 6);
      this.isInitialized = true;
    } catch {
      this.isInitialized = false;
    }
  }

  static getSecretLength() {
    return this.#secretKey?.length ?? 0;
  }
}

/*
 * Private Field Check Syntax (#field in object)
 * Allows checking whether a specific private field or method is present on an object using the `in` operator,
 * without throwing a TypeError when checking arbitrary objects.
 * Spec: https://262.ecma-international.org/13.0/#sec-relational-operators
 */
export class SecureBox {
  #token = "secret";

  static hasToken(obj) {
    return #token in obj;
  }
}

/*
 * Top-Level Await
 * Enables the use of `await` directly at the top level of an ES module outside of any async function, pausing module evaluation
 * and dependency graph resolution until the awaited Promise settles.
 * Spec: https://262.ecma-international.org/13.0/#sec-module-evaluation
 */
export const topLevelAwaitDemo = Promise.resolve("Resolved at top level in ES module");

/*
 * .at() Method on Indexable Objects (Array, String, TypedArray)
 * Takes an integer value and returns the item at that index, allowing positive integers for indexing from the start
 * and negative integers for relative indexing from the end (e.g., `-1` for the last element).
 * Spec (Array): https://262.ecma-international.org/13.0/#sec-array.prototype.at
 * Spec (String): https://262.ecma-international.org/13.0/#sec-string.prototype.at
 */
export function demoAtMethod() {
  const letters = ["A", "B", "C", "D"];
  const word = "ECMAScript";

  return {
    lastLetter: letters.at(-1),      // "D"
    secondToLast: letters.at(-2),    // "C"
    firstChar: word.at(0),           // "E"
    lastChar: word.at(-1)            // "t"
  };
}

/*
 * Object.hasOwn()
 * A static method that returns true if the specified object has the indicated property as its own property.
 * Serves as a safer, more concise alternative to `Object.prototype.hasOwnProperty.call(obj, prop)`.
 * Spec: https://262.ecma-international.org/13.0/#sec-object.hasown
 */
export function demoObjectHasOwn() {
  const obj = Object.create({ inheritedProp: "parent" });
  obj.ownProp = "child";

  return {
    hasOwnProp: Object.hasOwn(obj, "ownProp"),          // true
    hasInheritedProp: Object.hasOwn(obj, "inheritedProp"), // false
    hasToString: Object.hasOwn(obj, "toString")         // false
  };
}

/*
 * Error Cause (Error.prototype.cause)
 * Allows specifying an underlying error cause via the `{ cause: err }` options object passed to Error constructors,
 * aiding error chaining and debugging across async architectural layers.
 * Spec: https://262.ecma-international.org/13.0/#sec-error-message-options
 */
export function demoErrorCause() {
  try {
    throw new TypeError("Database timeout");
  } catch (originalError) {
    const wrappedError = new Error("Failed to load user profile", { cause: originalError });
    return {
      message: wrappedError.message,
      causeMessage: wrappedError.cause.message
    };
  }
}

/*
 * RegExp Match Indices (d flag)
 * Introduces the `/.../d` regex flag, which instructs regex execution methods (`exec`, `matchAll`) to include an `indices`
 * array property on the match object detailing the start and end character positions of each matched group.
 * Spec: https://262.ecma-international.org/13.0/#sec-get-regexp.prototype.hasindices
 */
export function demoMatchIndices() {
  const regex = /foo(?<bar>bar)?/d;
  const match = regex.exec("foo bar foobar");

  return {
    fullMatchBounds: match.indices[0],       // [8, 14] for "foobar"
    groupBounds: match.indices[1],           // [11, 14] for "bar"
    namedGroupBounds: match.indices.groups.bar // [11, 14]
  };
}
