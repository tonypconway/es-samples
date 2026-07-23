/**
 * ECMAScript 2024 (15th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/15.0/
 */

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
