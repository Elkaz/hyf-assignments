import { teas } from "./teas.js";

function searchTeas(teas, query) {
  return teas
    .filter((tea) => tea.name.toLowerCase().includes(query.toLowerCase()))
    .map((tea) => tea.name)
    .sort();
  return;
}

console.log(searchTeas(teas, "earl"));
// Returns: ["Earl Grey"]

console.log(searchTeas(teas, "dragon"));
// Returns: ["Dragon Well"]

console.log(searchTeas(teas, "ch"));
// Returns: ["English Breakfast", "Genmaicha", "Lapsang Souchong"]
