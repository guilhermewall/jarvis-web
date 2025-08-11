import "@testing-library/jest-dom/vitest";

// Polyfills para ambiente JSDOM
const HTMLElementCtor: typeof HTMLElement | undefined = (
  globalThis as unknown as { HTMLElement?: typeof HTMLElement }
).HTMLElement;
if (HTMLElementCtor) {
  HTMLElementCtor.prototype.scrollIntoView = function () {};
}
