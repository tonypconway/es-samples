/**
 * ECMAScript 2015 (6th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/6.0/
 */

/*
 * Proxy and Reflect Objects
 * `Proxy` allows intercepting and defining custom behavior for fundamental object operations (property lookup, assignment, enumeration, etc.).
 * `Reflect` provides built-in static methods for interceptable JavaScript operations, mirroring Proxy traps.
 * Spec (Proxy): https://262.ecma-international.org/6.0/#sec-proxy-objects
 * Spec (Reflect): https://262.ecma-international.org/6.0/#sec-reflect-object
 */
export function demoProxyAndReflect() {
  const target = { message: "hello" };
  const handler = {
    get(obj, prop, receiver) {
      if (prop === "message") {
        return Reflect.get(obj, prop, receiver).toUpperCase();
      }
      return Reflect.get(obj, prop, receiver);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy.message;
}
