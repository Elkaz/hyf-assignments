const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

export async function checkOrderStock(items) {
  const response = await fetch(`${API_BASE}/inventory`);
  const inventory = await response.json();

  const stockMap = Object.fromEntries(
    inventory.map((item) => [item.teaId, item]),
  );

  const shortages = items
    .map((item) => {
      const stockItem = stockMap[item.teaId];

      if (!stockItem || stockItem.stockCount < item.grams) {
        return {
          name: stockItem ? stockItem.teaName : `Tea ${item.teaId}`,
          needed: item.grams,
          available: stockItem ? stockItem.stockCount : 0,
        };
      }

      return null;
    })
    .filter(Boolean);

  return {
    inStock: shortages.length === 0,
    shortages,
  };
}

const largeOrder = [
  { teaId: 1, grams: 100 },
  { teaId: 2, grams: 500 }, // might be out of stock
  { teaId: 3, grams: 9999 }, // definitely out of stock
];

checkOrderStock(largeOrder).then((result) => {
  if (result.inStock) {
    console.log("All items in stock!");
  } else {
    console.log("Shortages:");
    result.shortages.forEach((s) => {
      console.log(`- ${s.name}: need ${s.needed}, have ${s.available}`);
    });
  }
});
