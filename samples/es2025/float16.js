/**
 * ECMAScript 2025 (16th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/16.0/
 */

/*
 * Float16Array and Math.f16round()
 * Introduces 16-bit half-precision floating point number support via `Float16Array` typed arrays and `Math.f16round()`
 * rounding method, optimizing memory footprint and GPU interoperability for machine learning and graphics workflows.
 * Spec (Float16Array): https://262.ecma-international.org/16.0/#sec-float16array
 * Spec (Math.f16round): https://262.ecma-international.org/16.0/#sec-math.f16round
 */
export function demoFloat16() {
  const f16Array = new Float16Array([1.337, 3.14159]);
  const rounded = Math.f16round(1.337);

  return {
    element0: f16Array[0],
    element1: f16Array[1],
    roundedValue: rounded,
    bytesPerElement: Float16Array.BYTES_PER_ELEMENT // 2
  };
}
