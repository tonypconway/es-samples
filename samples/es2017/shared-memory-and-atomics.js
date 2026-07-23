/**
 * ECMAScript 2017 (8th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/8.0/
 */

/*
 * Shared Memory and Atomics
 * Introduces `SharedArrayBuffer` for sharing memory across worker threads, and the `Atomics` namespace object
 * providing atomic operations (load, store, add, sub, exchange, wait, notify) for predictable thread synchronization.
 * Spec (SharedArrayBuffer): https://262.ecma-international.org/8.0/#sec-sharedarraybuffer-objects
 * Spec (Atomics): https://262.ecma-international.org/8.0/#sec-atomics-object
 */
export function demoSharedMemoryAndAtomics() {
  const buffer = new SharedArrayBuffer(1024);
  const uint8 = new Uint8Array(buffer);
  
  // Perform an atomic operation
  Atomics.store(uint8, 0, 42);
  const added = Atomics.add(uint8, 0, 10); // returns old value 42, new value is 52
  const current = Atomics.load(uint8, 0);  // 52
  
  return { added, current };
}
