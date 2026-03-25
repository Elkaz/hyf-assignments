const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function getTeaDetails(id) {
  const [teaRes, inventoryRes] = await Promise.all([
    fetch(`${API_BASE}/teas/${id}`),
    fetch(`${API_BASE}/inventory`),
  ]);

  const tea = await teaRes.json();
  const inventory = await inventoryRes.json();

  // Fix: match teaId with tea.id and use stockCount
  const item = inventory.find((i) => i.teaId === tea.id);

  return {
    ...tea,
    stock: item ? item.stockCount : 0,
  };
}

getTeaDetails(2).then((tea) => {
  console.log(`${tea.name} (${tea.origin})`);
  console.log(`Price: ${tea.pricePerGram} DKK/gram`);
  console.log(`Stock: ${tea.stock} grams`);
  console.log(`Value: ${(tea.pricePerGram * tea.stock).toFixed(2)} DKK`);
});
