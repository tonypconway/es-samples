/**
 * ECMAScript 2015 (6th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/6.0/
 */

/*
 * Built-in Collections: Map, Set, WeakMap, and WeakSet
 * New collection types: Map (key-value pairs with arbitrary key types), Set (unique values),
 * WeakMap (key-value pairs with weakly-held object keys), and WeakSet (weakly-held unique objects).
 * Spec (Map): https://262.ecma-international.org/6.0/#sec-map-objects
 * Spec (Set): https://262.ecma-international.org/6.0/#sec-set-objects
 * Spec (WeakMap): https://262.ecma-international.org/6.0/#sec-weakmap-objects
 * Spec (WeakSet): https://262.ecma-international.org/6.0/#sec-weakset-objects
 */
export function demoCollections() {
  const map = new Map();
  const keyObj = { id: 1 };
  map.set(keyObj, "metadata");
  map.set("stringKey", 123);

  const set = new Set([1, 2, 2, 3, 3, 3]);

  const weakMap = new WeakMap();
  let weakKey = { name: "temp" };
  weakMap.set(weakKey, "weak data");

  const weakSet = new WeakSet();
  weakSet.add(weakKey);

  return {
    mapHasKey: map.has(keyObj),
    setSize: set.size,
    weakMapHas: weakMap.has(weakKey),
    weakSetHas: weakSet.has(weakKey)
  };
}
