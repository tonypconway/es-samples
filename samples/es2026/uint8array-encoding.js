/**
 * ECMAScript 2026 (17th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/17.0/
 */

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
