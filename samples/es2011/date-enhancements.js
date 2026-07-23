/**
 * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
 * Standard Specification: https://262.ecma-international.org/5.1/
 */

/*
 * Date.now() and Date ISO/JSON Formatting
 * Introduces `Date.now()` to get the current timestamp in milliseconds without instantiating a Date object,
 * along with standard `.toISOString()` and `.toJSON()` serialization methods.
 * Spec: https://262.ecma-international.org/5.1/#sec-15.9.4.4
 */
export function demoDateEnhancements() {
  const timestamp = Date.now();
  const dateObj = new Date(timestamp);
  
  return {
    isNumber: typeof timestamp === "number",
    isoString: dateObj.toISOString(),
    jsonString: dateObj.toJSON()
  };
}
