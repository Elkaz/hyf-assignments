import { teas } from "./teas.js";
import fs from "fs";

const order = {
  id: 1001,
  customerId: 42,
  items: [
    { teaId: 1, grams: 100 },
    { teaId: 8, grams: 50 },
    { teaId: 3, grams: 200 },
  ],
};

function validateOrder(order, callback) {
  setTimeout(() => {
    const errors = order.items
      .filter((item) => !teas.some((tea) => tea.id === item.teaId))
      .map((item) => "Tea with id " + item.teaId + " not found");

    callback({ valid: errors.length === 0, errors: errors });
  }, 200);
}

function calculateTotal(order, callback) {
  setTimeout(function () {
    const totalValue = order.items.reduce((sum, item) => {
      const teaChecked = teas.find((tea) => tea.id === item.teaId);
      return teaChecked ? sum + teaChecked.pricePerGram * item.grams : sum;
    }, 0);

    callback({ orderId: order.id, total: totalValue });
  }, 300);
}

function checkStock(order, callback) {
  setTimeout(() => {
    const shortages = order.items
      .map((item) => teas.find((tea) => tea.id === item.teaId))
      .filter(
        (tea) =>
          tea &&
          tea.stockCount < order.items.find((i) => i.teaId === tea.id).grams,
      )
      .map((tea) => `${tea.name} has only ${tea.stockCount} grams`);
    callback({
      orderId: order.id,
      inStock: shortages.length === 0,
      shortages: shortages,
    });
  }, 400);
}

validateOrder(order, (result) => {
  console.log("Validation result:", result);
});

calculateTotal(order, (result) => {
  console.log("Calculate total result:", result);
});

checkStock(order, (result) => {
  console.log("Check stock result:", result);
});

// Export functions for use in other exercises
export { validateOrder, calculateTotal, checkStock, order };
