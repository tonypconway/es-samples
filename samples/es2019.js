/**
 * ECMAScript 2019 (10th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/10.0/
 */

/*
 * Array.prototype.flat()
 * Creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
 * Spec: https://262.ecma-international.org/10.0/#sec-array.prototype.flat
 */
export function demoArrayFlat() {
  const nested = [1, [2, [3, [4]]]];
  return nested.flat(2); // [1, 2, 3, [4]]
}

/*
 * Array.prototype.flatMap()
 * Maps each element using a mapping function, then flattens the result into a new array by depth 1.
 * Spec: https://262.ecma-international.org/10.0/#sec-array.prototype.flatmap
 */
export function demoArrayFlatMap() {
  const sentences = ["hello world", "ECMAScript 2019"];
  return sentences.flatMap(s => s.split(" ")); // ["hello", "world", "ECMAScript", "2019"]
}

/*
 * Object.fromEntries()
 * Transforms a list of key-value pairs (such as a Map or an array of `[key, value]` arrays) into an object.
 * Acts as the inverse of `Object.entries()`.
 * Spec: https://262.ecma-international.org/10.0/#sec-object.fromentries
 */
export function demoObjectFromEntries() {
  const entries = [["name", "Alice"], ["age", 28], ["city", "Seattle"]];
  const obj = Object.fromEntries(entries);
  
  // Filtering an object using Object.entries and Object.fromEntries
  const scores = { math: 95, history: 80, science: 92 };
  const highScores = Object.fromEntries(
    Object.entries(scores).filter((entry) => entry[1] >= 90)
  );
  
  return { obj, highScores };
}

/*
 * String.prototype.trimStart()
 * Removes whitespace from the beginning (start) of a string.
 * Spec: https://262.ecma-international.org/10.0/#sec-string.prototype.trimstart
 */
export function demoStringTrimStart() {
  const padded = "   ECMAScript 2019   ";
  return padded.trimStart();
}

/*
 * String.prototype.trimEnd()
 * Removes whitespace from the end of a string.
 * Spec: https://262.ecma-international.org/10.0/#sec-string.prototype.trimend
 */
export function demoStringTrimEnd() {
  const padded = "   ECMAScript 2019   ";
  return padded.trimEnd();
}

/*
 * Optional Catch Binding
 * Allows omitting the exception binding variable in `catch` blocks when the thrown error object is not needed.
 * Spec: https://262.ecma-international.org/10.0/#sec-try-statement
 */
export function demoOptionalCatchBinding(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch { // No error parameter required
    return { error: "Invalid JSON format" };
  }
}

/*
 * Symbol.prototype.description
 * A read-only property returning the optional string description specified when creating a Symbol object, directly
 * without requiring `.toString()` conversion.
 * Spec: https://262.ecma-international.org/10.0/#sec-symbol.prototype.description
 */
export function demoSymbolDescription() {
  const sym = Symbol("custom identifier");
  return sym.description; // "custom identifier"
}

/*
 * Well-Formed JSON.stringify()
 * Prevents `JSON.stringify` from returning ill-formed UTF-16 strings when encountering lone surrogate code points (U+D800 to U+DFFF),
 * representing them instead as JSON escape sequences (e.g., `\ud800`).
 * Spec: https://262.ecma-international.org/10.0/#sec-json.stringify
 */
export function demoWellFormedJSON() {
  // Lone surrogate \uD800
  const serialized = JSON.stringify("\uD800");
  return serialized; // '"\\ud800"'
}

/*
 * Stable Array.prototype.sort()
 * Mandates that `Array.prototype.sort()` be stable, ensuring that array elements comparing equal retain their original order.
 * Spec: https://262.ecma-international.org/10.0/#sec-array.prototype.sort
 */
export function demoStableSort() {
  const items = [
    { name: "First", val: 5 },
    { name: "Second", val: 2 },
    { name: "Third", val: 5 },
    { name: "Fourth", val: 2 }
  ];
  
  items.sort((a, b) => a.val - b.val);
  // "Second" always precedes "Fourth", and "First" always precedes "Third"
  return items.map(i => i.name);
}

/*
 * Function.prototype.toString() Revision
 * Requires `Function.prototype.toString()` to return the exact source code text slice used to define the function,
 * preserving whitespace, comments, and syntax.
 * Spec: https://262.ecma-international.org/10.0/#sec-function.prototype.tostring
 */
export function demoFunctionToString() {
  function /* comment inside */ sample() { return 1; }
  return sample.toString();
}
