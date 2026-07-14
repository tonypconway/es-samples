/**
 * ECMAScript 2024 (15th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/15.0/
 */

/*
 * Object.groupBy()
 * Groups elements of an iterable according to string/symbol keys returned by a callback function.
 * Spec: https://262.ecma-international.org/15.0/#sec-object.groupby
 */
export function demoObjectGroupBy() {
  const inventory = [
    { name: "Asparagus", type: "vegetable" },
    { name: "Banana", type: "fruit" }
  ];
  return Object.groupBy(inventory, (item) => item.type);
}

/*
 * Map.groupBy()
 * Groups elements of an iterable according to arbitrary keys returned by a callback function into a Map.
 * Spec: https://262.ecma-international.org/15.0/#sec-map.groupby
 */
export function demoMapGroupBy() {
  const inventory = [
    { name: "Banana", quantity: 0 },
    { name: "Cherries", quantity: 5 }
  ];
  return Map.groupBy(inventory, (item) => item.quantity === 0 ? "restock" : "ok");
}

/*
 * Promise.withResolvers()
 * A static method returning an object containing a new Promise along with its associated `resolve` and `reject`
 * functions, avoiding the boilerplate of extracting resolvers from within a `new Promise(...)` executor constructor callback.
 * Spec: https://262.ecma-international.org/15.0/#sec-promise.withresolvers
 */
export async function demoPromiseWithResolvers() {
  const { promise, resolve, reject } = Promise.withResolvers();
  
  // Resolve asynchronously outside constructor callback
  setTimeout(() => resolve("Resolved via withResolvers"), 10);
  
  const result = await promise;
  return result;
}

/*
 * Resizable and Transferable ArrayBuffers
 * Introduces `maxByteLength` option for creating resizable ArrayBuffers, along with `.resize()` to change size in place
 * and `.transfer()` to detach buffer ownership and move memory to a new ArrayBuffer without copying when possible.
 * Spec (resize): https://262.ecma-international.org/15.0/#sec-arraybuffer.prototype.resize
 * Spec (transfer): https://262.ecma-international.org/15.0/#sec-arraybuffer.prototype.transfer
 */
export function demoArrayBufferResizeAndTransfer() {
  const buffer = new ArrayBuffer(8, { maxByteLength: 32 });
  
  const initialLength = buffer.byteLength; // 8
  buffer.resize(16);
  const resizedLength = buffer.byteLength; // 16
  
  // Transfer ownership to a new buffer
  const newBuffer = buffer.transfer(32);
  const isDetached = buffer.detached;      // true
  const transferredLength = newBuffer.byteLength; // 32
  
  return { initialLength, resizedLength, isDetached, transferredLength };
}

/*
 * String Well-Formedness (isWellFormed and toWellFormed)
 * `.isWellFormed()` checks whether a string contains lone surrogate code points (which would make it ill-formed UTF-16).
 * `.toWellFormed()` returns a new string where any lone surrogates are replaced with the Unicode replacement character U+FFFD.
 * Spec (isWellFormed): https://262.ecma-international.org/15.0/#sec-string.prototype.iswellformed
 * Spec (toWellFormed): https://262.ecma-international.org/15.0/#sec-string.prototype.towellformed
 */
export function demoStringWellFormedness() {
  const wellFormed = "Hello World";
  const illFormed = "Hello \uD800 World"; // \uD800 is a lone leading surrogate
  
  return {
    wellFormedCheck: wellFormed.isWellFormed(),       // true
    illFormedCheck: illFormed.isWellFormed(),         // false
    sanitized: illFormed.toWellFormed()               // "Hello \uFFFD World"
  };
}

/*
 * RegExp v Flag (Unicode Sets)
 * An upgrade over the `u` flag (`/pattern/v`) that enables set notation and operations within character classes,
 * supporting string properties, difference (`--`), and intersection (`&&`) of Unicode sets.
 * Spec: https://262.ecma-international.org/15.0/#sec-get-regexp.prototype.unicodeSets
 */
export function demoRegExpVFlag() {
  // Matching Greek characters except for the letter alpha using set difference `--`
  const nonAlphaGreek = /^[\p{Script=Greek}--\u03B1]+$/v;
  
  // Matching string properties like RGI emoji flag sequences
  const emojiFlagRegex = /^\p{RGI_Emoji_Flag_Sequence}$/v;
  
  return {
    matchesBeta: nonAlphaGreek.test("\u03B2"),  // true (beta)
    matchesAlpha: nonAlphaGreek.test("\u03B1"), // false (alpha subtracted)
    matchesFlag: emojiFlagRegex.test("🇺🇸")      // true
  };
}

/*
 * Atomics.waitAsync()
 * Asynchronous version of `Atomics.wait()`, returning a Promise that resolves when a shared memory location is notified or times out.
 * Non-blocking, making it safe for use on the main browser UI thread where synchronous `Atomics.wait()` is disallowed.
 * Spec: https://262.ecma-international.org/15.0/#sec-atomics.waitasync
 */
export async function demoAtomicsWaitAsync() {
  const sab = new SharedArrayBuffer(1024);
  const int32 = new Int32Array(sab);
  
  // Non-blocking wait for index 0 to change from initial value 0
  const waitResult = Atomics.waitAsync(int32, 0, 0, 50); // 50ms timeout
  
  // We don't notify, so it should time out and resolve to "timed-out"
  const outcome = await waitResult.value;
  return outcome;
}
