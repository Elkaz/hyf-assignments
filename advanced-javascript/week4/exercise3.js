import { teas } from "./teas.js";
import { Tea } from "./exercise1.js";

class Inventory {
  constructor() {
    this.items = new Map();
  }

  add(tea, stockCount) {
    if (typeof stockCount !== "number" || stockCount < 0) {
      throw new Error("Stock count must be a positive number");
    }

    this.items.set(tea.name, {
      tea: tea,
      stockCount: stockCount,
    });
  }

  sell(teaName, grams) {
    const item = this.items.get(teaName);

    if (!item) {
      throw new Error(`Tea not found: ${teaName}`);
    }

    if (grams < 0) {
      throw new Error("Grams must be positive");
    }

    if (item.stockCount < grams) {
      throw new Error(
        `Not enough stock for ${teaName}. Only ${item.stockCount}g left`,
      );
    }

    item.stockCount -= grams;
  }

  restock(teaName, grams) {
    const item = this.items.get(teaName);

    if (!item) {
      throw new Error(`Tea not found: ${teaName}`);
    }

    if (grams < 0) {
      throw new Error("Grams must be positive");
    }

    item.stockCount += grams;
  }

  getStock(teaName) {
    const item = this.items.get(teaName);

    if (!item) {
      return 0;
    }

    return item.stockCount;
  }

  getLowStock(threshold) {
    return Array.from(this.items.values()).filter((item) => {
      return item.stockCount < threshold;
    });
  }

  getTotalValue() {
    return Array.from(this.items.values()).reduce((total, item) => {
      return total + item.tea.pricePerGram * item.stockCount;
    }, 0);
  }
}

// Export Inventory class
export { Inventory };

// Test:
const teaInstances = teas.map(Tea.fromObject);
const inventory = new Inventory();

teaInstances.forEach((tea) => {
  const data = teas.find((t) => t.name === tea.name);
  inventory.add(tea, data.stockCount);
});

console.log("Sencha stock:", inventory.getStock("Sencha")); // 150

inventory.sell("Sencha", 50);
console.log("After selling 50g:", inventory.getStock("Sencha")); // 100

console.log("Low stock (< 50):");
inventory.getLowStock(50).forEach((item) => {
  console.log(`- ${item.tea.name}: ${item.stockCount}g`);
});

console.log(
  "Total inventory value:",
  inventory.getTotalValue().toFixed(2),
  "DKK",
);
