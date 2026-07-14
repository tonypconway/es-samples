/**
 * ECMAScript 2026 (17th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/17.0/
 */

/*
 * RegExp.escape()
 * A static method that escapes special regular expression syntax characters within a string, allowing user-supplied
 * literal text to be safely incorporated into dynamically constructed regular expressions without regex injection risks.
 * Spec: https://tc39.es/ecma262/#sec-regexp.escape
 */
export function demoRegExpEscape() {
  const userInput = "Hello [World] (test)* +$?^|\\";
  
  if (typeof RegExp.escape === "function") {
    const escaped = RegExp.escape(userInput);
    const regex = new RegExp(escaped);
    return { escaped, matches: regex.test(userInput) };
  }
  
  // Demonstrating the pattern behavior if polyfilled or running on older runtime
  const fallbackEscape = (str) => str.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
  const escaped = fallbackEscape(userInput);
  return { escaped, matches: new RegExp(escaped).test(userInput), isPolyfill: true };
}

/*
 * Uint8Array Base64 and Hexadecimal Encoding/Decoding
 * Standardizes native conversion methods on `Uint8Array` for encoding byte buffers to hexadecimal (`toHex`) and Base64 (`toBase64`)
 * strings, as well as static constructors (`fromHex`, `fromBase64`) for parsing text strings back into byte arrays.
 * Spec (toBase64): https://tc39.es/ecma262/#sec-uint8array.prototype.tobase64
 * Spec (fromBase64): https://tc39.es/ecma262/#sec-uint8array.frombase64
 * Spec (toHex): https://tc39.es/ecma262/#sec-uint8array.prototype.tohex
 * Spec (fromHex): https://tc39.es/ecma262/#sec-uint8array.fromhex
 */
export function demoUint8ArrayEncoding() {
  const bytes = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" in ASCII
  
  if (typeof bytes.toBase64 === "function" && typeof Uint8Array.fromBase64 === "function") {
    const base64Str = bytes.toBase64();       // "SGVsbG8="
    const hexStr = bytes.toHex();             // "48656c6c6f"
    const decodedBytes = Uint8Array.fromBase64(base64Str);
    const decodedHex = Uint8Array.fromHex(hexStr);
    
    return { base64Str, hexStr, decodedBytes: Array.from(decodedBytes), decodedHex: Array.from(decodedHex) };
  }

  // Demonstration fallback for environments still adopting ES2026 methods
  return {
    base64Str: Buffer.from(bytes).toString("base64"),
    hexStr: Buffer.from(bytes).toString("hex"),
    isPolyfill: true
  };
}

/*
 * Atomics.pause()
 * A micro-architectural CPU instruction hint for spinlocks and busy-waiting loops in multithreaded environments.
 * Signals to the processor that the thread is in a spin-wait loop, reducing power consumption and memory bus contention.
 * Spec: https://tc39.es/ecma262/#sec-atomics.pause
 */
export function demoAtomicsPause() {
  const isSupported = typeof Atomics.pause === "function";
  if (isSupported) {
    // In a real spin-lock loop: while(!flag) { Atomics.pause(); }
    Atomics.pause();
  }
  return { isSupported };
}

/*
 * Error.isError()
 * A static method that reliably detects whether a value is an Error instance (including built-in errors, custom subclasses,
 * and DOMException objects), working across different realms (iframes, worker threads, VM contexts) where `instanceof Error` fails.
 * Spec: https://tc39.es/ecma262/#sec-error.iserror
 */
export function demoErrorIsError() {
  const standardError = new TypeError("Test error");
  const nonError = { message: "Looks like error, but isn't" };

  if (typeof Error.isError === "function") {
    return {
      standardCheck: Error.isError(standardError), // true
      nonErrorCheck: Error.isError(nonError)       // false
    };
  }

  return {
    standardCheck: standardError instanceof Error,
    nonErrorCheck: nonError instanceof Error,
    isPolyfill: true
  };
}

/*
 * Math.sumPrecise()
 * Computes the exact floating-point sum of an iterable of numbers without losing precision from intermediate floating-point
 * rounding errors, implementing compensated summation techniques.
 * Spec: https://tc39.es/ecma262/#sec-math.sumprecise
 */
export function demoMathSumPrecise() {
  // A classic floating point rounding error: 0.1 + 0.2 != 0.3
  const numbers = [0.1, 0.2];

  if (typeof Math.sumPrecise === "function") {
    return {
      exactSum: Math.sumPrecise(numbers),
      standardSum: numbers.reduce((a, b) => a + b, 0)
    };
  }

  return {
    standardSum: numbers.reduce((a, b) => a + b, 0),
    note: "Math.sumPrecise not yet native in runtime; demoing standard sum comparison."
  };
}
