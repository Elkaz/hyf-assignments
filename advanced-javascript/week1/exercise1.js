import { teas } from "./teas.js";

// Rewritten using filter and map with arrow functions
const result = teas
  .filter(tea => tea.caffeineLevel !== "none")
  .map(tea => tea.name.toUpperCase());

console.log(result);
