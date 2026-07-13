// Runs on every page that includes header.js and footer.js,
// so the shared layout pieces get injected as soon as the DOM is ready.
document.addEventListener("DOMContentLoaded", () => {
  if (typeof renderHeader === "function") renderHeader();
  if (typeof renderFooter === "function") renderFooter();
});
