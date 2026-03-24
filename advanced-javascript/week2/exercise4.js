import { teas } from "./teas.js";
import fs from "fs";

function generateInventoryReport(callback) {
  fs.readFile("./inventory-updates.json", "utf8", (error, data) => {
    if (error) {
      callback(error, null);
      return;
    }

    // Parse the JSON data
    const inventoryUpdates = JSON.parse(data);

    const changes = inventoryUpdates.reduce((acc, inventoryUpdates) => {
      acc[inventoryUpdates.teaId] =
        (acc[inventoryUpdates.teaId] || 0) + inventoryUpdates.change;
      return acc;
    }, {});

    const report = [];
    const teaIds = Object.keys(changes);

    for (let i = 0; i < teaIds.length; i++) {
      const teaId = Number(teaIds[i]);
      const teaChecked = teas.find(function (tea) {
        return tea.id === teaId;
      });

      const change = changes[teaId];
      const newStock = teaChecked.stockCount + change;

      let diffString;
      if (change >= 0) {
        diffString = "+" + change;
      } else {
        diffString = "" + change;
      }

      let string =
        "- " +
        teaChecked.name +
        ": was " +
        teaChecked.stockCount +
        ", change " +
        diffString +
        ", now " +
        newStock;

      if (newStock < 0) string = string + " (Negative!)";

      report.push(string);
    }

    callback(null, report);
  });
}

generateInventoryReport((error, report) => {
  if (error) {
    console.error("Failed:", error.message);
    return;
  }

  console.log("Inventory Report:");
  report.forEach((line) => console.log(line));
});
