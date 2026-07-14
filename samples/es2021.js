/**
 * ECMAScript 2021 (12th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/12.0/
 */

/*
 * Logical Assignment Operators (||=, &&=, and ??=)
 * Combines logical operations with assignment. The assignment only occurs if the logical condition evaluates to
 * trigger evaluation of the right-hand side (short-circuiting assignment).
 * Spec: https://262.ecma-international.org/12.0/#sec-logical-assignment-operators
 */
export function demoLogicalAssignment() {
  let a = 0;
  a ||= 10; // Assigns 10 because 0 is falsy
  
  let b = "hello";
  b &&= b.toUpperCase(); // Assigns "HELLO" because b is truthy
  
  let c = null;
  c ??= "default"; // Assigns "default" because c is nullish
  
  return { a, b, c };
}

/*
 * String.prototype.replaceAll()
 * Returns a new string with all matches of a pattern (either a string or a RegExp with `g` flag) replaced by a replacement.
 * Eliminates the need for regular expressions when replacing literal string occurrences globally.
 * Spec: https://262.ecma-international.org/12.0/#sec-string.prototype.replaceall
 */
export function demoReplaceAll() {
  const quote = "To be or not to be, that is the question.";
  const replaced = quote.replaceAll("be", "code");
  
  return replaced; // "To code or not to code, that is the question."
}

/*
 * Promise.any() and AggregateError
 * `Promise.any()` takes an iterable of Promise objects and resolves as soon as any of the promises fulfills.
 * If all of the given promises are rejected, it rejects with an `AggregateError` grouping all individual errors.
 * Spec (Promise.any): https://262.ecma-international.org/12.0/#sec-promise.any
 * Spec (AggregateError): https://262.ecma-international.org/12.0/#sec-aggregate-error-objects
 */
export async function demoPromiseAny() {
  const promises = [
    Promise.reject("Error 1"),
    new Promise(resolve => setTimeout(() => resolve("Quickest success"), 10)),
    new Promise(resolve => setTimeout(() => resolve("Slower success"), 50))
  ];
  
  try {
    const winner = await Promise.any(promises);
    return { winner };
  } catch (err) {
    return { error: err };
  }
}

export async function demoAggregateError() {
  const allRejections = [
    Promise.reject(new Error("Fail A")),
    Promise.reject(new Error("Fail B"))
  ];

  try {
    await Promise.any(allRejections);
  } catch (err) {
    return {
      isAggregateError: err instanceof AggregateError,
      errorCount: err.errors.length,
      messages: err.errors.map(e => e.message)
    };
  }
}

/*
 * WeakRef and FinalizationRegistry
 * `WeakRef` holds a weak reference to an object, allowing it to be garbage collected without preventing reclamation.
 * `FinalizationRegistry` provides a way to register custom cleanup callbacks to be invoked after an object is garbage collected.
 * Spec (WeakRef): https://262.ecma-international.org/12.0/#sec-weak-ref-objects
 * Spec (FinalizationRegistry): https://262.ecma-international.org/12.0/#sec-finalization-registry-objects
 */
export function demoWeakRefAndRegistry() {
  let targetObject = { data: "valuable data" };
  const weakRef = new WeakRef(targetObject);
  
  let cleanedUp = false;
  const registry = new FinalizationRegistry((heldValue) => {
    cleanedUp = true;
  });
  
  registry.register(targetObject, "metadata token");
  
  // Accessing value before GC
  const retrieved = weakRef.deref();
  return { hasValue: retrieved !== undefined, data: retrieved?.data };
}

/*
 * Numeric Separators
 * Allows underscores (`_`) as visual separators within numeric literals (decimal, binary, hex, octal, BigInt)
 * to enhance readability of large numbers without affecting programmatic values.
 * Spec: https://262.ecma-international.org/12.0/#sec-literal-numeric-separators
 */
export function demoNumericSeparators() {
  const oneBillion = 1_000_000_000;
  const hexBytes = 0xFF_EC_DE_5E;
  const bigIntAmount = 9_000_000_000_000_000n;
  
  return { oneBillion, hexBytes, bigIntAmountString: bigIntAmount.toString() };
}
