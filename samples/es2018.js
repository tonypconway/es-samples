/**
 * ECMAScript 2018 (9th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/9.0/
 */

/*
 * Asynchronous Iteration and Async Generators
 * Introduces `async function*` for generating asynchronous sequences of data, and the `for await...of` loop
 * to iterate over async iterables (objects implementing `Symbol.asyncIterator`).
 * Spec: https://262.ecma-international.org/9.0/#sec-async-generator-function-definitions
 * Spec (for await...of): https://262.ecma-international.org/9.0/#sec-for-in-and-for-of-statements
 */
export async function* demoAsyncGenerator() {
  const data = ["first", "second", "third"];
  for (const item of data) {
    await new Promise(resolve => setTimeout(resolve, 5));
    yield item.toUpperCase();
  }
}

export async function demoAsyncIteration() {
  const results = [];
  for await (const val of demoAsyncGenerator()) {
    results.push(val);
  }
  return results;
}

/*
 * Rest and Spread Properties for Objects
 * Extends the rest/spread syntax (`...`) to object literals. Rest properties collect remaining own enumerable
 * properties into a new object during destructuring. Spread properties copy own enumerable properties into an object literal.
 * Spec: https://262.ecma-international.org/9.0/#sec-object-initializer
 */
export function demoObjectRestSpread() {
  const defaults = { host: "localhost", port: 8080, secure: false };
  const userConfig = { port: 3000, secure: true };
  
  // Object spread
  const merged = { ...defaults, ...userConfig };
  
  // Object rest
  const { host, ...remainingConfig } = merged;
  return { merged, host, remainingConfig };
}

/*
 * Promise.prototype.finally()
 * Registers a callback to be invoked when a Promise settles (either fulfilled or rejected), enabling cleanup operations
 * without having to duplicate callbacks in both `.then()` and `.catch()`.
 * Spec: https://262.ecma-international.org/9.0/#sec-promise.prototype.finally
 */
export function demoPromiseFinally() {
  let cleanupRun = false;
  return new Promise((resolve) => {
    resolve("success");
  })
  .finally(() => {
    cleanupRun = true;
  })
  .then(res => ({ result: res, cleanupRun }));
}

/*
 * RegExp Named Capture Groups
 * Allows capturing groups in regular expressions to be assigned explicit names via `(?<name>...)`, which can then be
 * accessed on the `groups` property of the match object.
 * Spec: https://262.ecma-international.org/9.0/#sec-group-specifiers
 */
export function demoNamedCaptureGroups() {
  const regex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
  const match = regex.exec("2018-06-15");
  
  return {
    year: match.groups.year,
    month: match.groups.month,
    day: match.groups.day
  };
}

/*
 * RegExp Unicode Property Escapes
 * Enables matching characters based on Unicode character properties inside regular expressions using `\p{...}` and `\P{...}`
 * when the `u` flag is enabled.
 * Spec: https://262.ecma-international.org/9.0/#sec-unicode-match-property-p
 */
export function demoUnicodePropertyEscapes() {
  const greekRegex = /^\p{Script=Greek}+$/u;
  const emojiRegex = /\p{Emoji}/u;
  
  return {
    isGreek: greekRegex.test("Χαίρετε"),
    hasEmoji: emojiRegex.test("Hello 🌍")
  };
}

/*
 * RegExp Lookbehind Assertions
 * Enables positive `(?<=...)` and negative `(?<!...)` lookbehind assertions, matching a pattern only if it is (or is not)
 * preceded by a specific assertion.
 * Spec: https://262.ecma-international.org/9.0/#sec-assertions
 */
export function demoLookbehindAssertions() {
  const positiveLookbehind = /(?<=\$)\d+/; // matches numbers preceded by '$'
  const negativeLookbehind = /(?<!\$)\b\d+/; // matches numbers NOT preceded by '$'
  
  const price = positiveLookbehind.exec("Cost is $100");
  const quantity = negativeLookbehind.exec("Bought 50 items");
  
  return { price: price[0], quantity: quantity[0] };
}

/*
 * RegExp s (dotAll) Flag
 * Introduces the `s` flag for regular expressions, which alters the dot (`.`) metacharacter to match any character,
 * including line terminators (like `\n` and `\r`).
 * Spec: https://262.ecma-international.org/9.0/#sec-get-regexp.prototype.dotAll
 */
export function demoDotAllFlag() {
  const text = "first line\nsecond line";
  const withoutDotAll = /first line.second line/.test(text); // false
  const withDotAll = /first line.second line/s.test(text);   // true
  
  return { withoutDotAll, withDotAll };
}

/*
 * Template Literal Revision
 * Lifts restrictions on syntactic escape sequences within tagged template literals. Invalid escape sequences (e.g., `\unicode`)
 * result in `undefined` for string representation in `strings`, while `strings.raw` retains the raw text.
 * Spec: https://262.ecma-international.org/9.0/#sec-template-literal-lexical-components
 */
export function demoTemplateLiteralRevision() {
  function tag(strings) {
    return { cooked: strings[0], raw: strings.raw[0] };
  }
  // \unicode is an invalid hex escape sequence in standard strings, but valid inside tagged template raw arrays in ES2018+
  return tag`\unicode and \u{54}`;
}
