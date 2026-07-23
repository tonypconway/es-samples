/**
 * ECMAScript 2021 (12th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/12.0/
 */

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
