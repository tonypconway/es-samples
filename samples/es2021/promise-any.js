/**
 * ECMAScript 2021 (12th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/12.0/
 */

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
