import { teas } from "./teas.js";
import {
  validateOrder,
  calculateTotal,
  checkStock,
  order,
} from "./exercise2.js";

function processOrder(order) {
  console.log("Processing order", order.id);

  validateOrder(order, (validation) => {
    if (!validation.valid) {
      console.log("Validation failed:", validation.errors);
      return;
    }
    console.log("Validation passed");

    calculateTotal(order, (pricing) => {
      console.log("Total:", pricing.total, "DKK");

      checkStock(order, (stockResult) => {
        if (!stockResult.inStock) {
          console.log("Stock check failed:", stockResult.shortages);
          console.log(
            "Final result: Oops! Order cannot be processed due to a stock shortage",
          );
          return;
        }
        console.log("Stock check passed");
        console.log(
          `Final result: Order ${order.id} processed successfully. Total: ${pricing.total} DKK`,
        );
      });
    });
  });
}

processOrder(order);
