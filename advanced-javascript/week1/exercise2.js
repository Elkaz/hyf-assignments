import { teas } from "./teas.js";

function inventoryReport(teas) {
  return {
    totalTeas: teas.length,
    inStock: teas.filter((tea) => tea.inStock).length,
    outOfStock: teas.filter((tea) => !tea.inStock).length,
    totalInventoryValue: teas.reduce(
      (sum, tea) => sum + tea.pricePerGram * tea.stockCount,
      0,
    ),
    averagePrice:
      teas.reduce((sum, tea) => sum + tea.pricePerGram, 0) / teas.length,
  };
}

console.log(inventoryReport(teas));
