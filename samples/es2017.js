/**
 * ECMAScript 2017 (8th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/8.0/
 */

/*
 * Async Functions (async and await)
 * Provides syntactic sugar over Promises, allowing asynchronous operations to be written in a synchronous, procedural style.
 * Functions marked with `async` implicitly return a Promise, and `await` pauses execution until the Promise settles.
 * Spec: https://262.ecma-international.org/8.0/#sec-async-function-definitions
 */
export async function demoAsyncAwait(shouldSucceed = true) {
  function fetchData() {
    return new Promise((resolve) => setTimeout(() => resolve({ data: "ES2017 payload" }), 10));
  }

  try {
    const response = await fetchData();
    return response.data;
  } catch (error) {
    return "Failed to fetch";
  }
}

/*
 * Object.values()
 * Returns an array of a given object's own enumerable string-keyed property values.
 * Spec: https://262.ecma-international.org/8.0/#sec-object.values
 */
export function demoObjectValues() {
  const user = { name: "Bob", role: "Developer", experience: 5 };
  return Object.values(user); // ["Bob", "Developer", 5]
}

/*
 * Object.entries()
 * Returns an array of a given object's own enumerable string-keyed property [key, value] pairs.
 * Spec: https://262.ecma-international.org/8.0/#sec-object.entries
 */
export function demoObjectEntries() {
  const user = { name: "Bob", role: "Developer", experience: 5 };
  return Object.entries(user); // [["name", "Bob"], ["role", "Developer"], ["experience", 5]]
}

/*
 * Object.getOwnPropertyDescriptors()
 * Returns all own property descriptors of a given object, enabling accurate cloning of objects including getters, setters,
 * and non-enumerable properties without losing their attributes.
 * Spec: https://262.ecma-international.org/8.0/#sec-object.getownpropertydescriptors
 */
export function demoGetOwnPropertyDescriptors() {
  const source = {
    _val: 10,
    get val() { return this._val; },
    set val(v) { this._val = v; }
  };
  
  const descriptors = Object.getOwnPropertyDescriptors(source);
  const clone = Object.defineProperties({}, descriptors);
  
  clone.val = 25;
  return { sourceVal: source.val, cloneVal: clone.val, hasGetter: typeof descriptors.val.get === "function" };
}

/*
 * String.prototype.padStart()
 * Pads the current string from the start with another string until the target length is reached.
 * Spec: https://262.ecma-international.org/8.0/#sec-string.prototype.padstart
 */
export function demoStringPadStart() {
  const cardNumber = "1234";
  return cardNumber.padStart(16, "*"); // "*******1234"
}

/*
 * String.prototype.padEnd()
 * Pads the current string from the end with another string until the target length is reached.
 * Spec: https://262.ecma-international.org/8.0/#sec-string.prototype.padend
 */
export function demoStringPadEnd() {
  const tableCell = "Total";
  return tableCell.padEnd(10, "."); // "Total....."
}

/*
 * Trailing Commas in Function Parameter Lists and Calls
 * Allows trailing commas in function definitions and function calls, making git diffs cleaner when adding new parameters.
 * Spec: https://262.ecma-international.org/8.0/#sec-parameter-lists
 */
export function demoTrailingCommas(
  param1,
  param2,
  param3, // trailing comma in definition
) {
  return [
    param1,
    param2,
    param3, // trailing comma in array formatting/call argument
  ];
}

/*
 * Shared Memory and Atomics
 * Introduces `SharedArrayBuffer` for sharing memory across worker threads, and the `Atomics` namespace object
 * providing atomic operations (load, store, add, sub, exchange, wait, notify) for predictable thread synchronization.
 * Spec (SharedArrayBuffer): https://262.ecma-international.org/8.0/#sec-sharedarraybuffer-objects
 * Spec (Atomics): https://262.ecma-international.org/8.0/#sec-atomics-object
 */
export function demoSharedMemoryAndAtomics() {
  const buffer = new SharedArrayBuffer(1024);
  const uint8 = new Uint8Array(buffer);
  
  // Perform an atomic operation
  Atomics.store(uint8, 0, 42);
  const added = Atomics.add(uint8, 0, 10); // returns old value 42, new value is 52
  const current = Atomics.load(uint8, 0);  // 52
  
  return { added, current };
}
