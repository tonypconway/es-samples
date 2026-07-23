/**
 * ECMAScript 2024 (15th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/15.0/
 */

/*
 * Resizable and Transferable ArrayBuffers
 * Introduces `maxByteLength` option for creating resizable ArrayBuffers, along with `.resize()` to change size in place
 * and `.transfer()` to detach buffer ownership and move memory to a new ArrayBuffer without copying when possible.
 * Spec (resize): https://262.ecma-international.org/15.0/#sec-arraybuffer.prototype.resize
 * Spec (transfer): https://262.ecma-international.org/15.0/#sec-arraybuffer.prototype.transfer
 */
export function demoArrayBufferResizeAndTransfer() {
  const buffer = new ArrayBuffer(8, { maxByteLength: 32 });
  
  const initialLength = buffer.byteLength; // 8
  buffer.resize(16);
  const resizedLength = buffer.byteLength; // 16
  
  // Transfer ownership to a new buffer
  const newBuffer = buffer.transfer(32);
  const isDetached = buffer.detached;      // true
  const transferredLength = newBuffer.byteLength; // 32
  
  return { initialLength, resizedLength, isDetached, transferredLength };
}
