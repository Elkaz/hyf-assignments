const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

export async function calculateOrderTotal(items) {
  const response = await fetch(`${API_BASE}/teas`);
  const teas = await response.json();

  const total = items.reduce((sum, item) => {
    const tea = teas.find((t) => t.id === item.teaId);

    if (!tea) {
      throw new Error(`Tea with id ${item.teaId} not found`);
    }

    return sum + tea.pricePerGram * item.grams;
  }, 0);

  return total;
}

const order = [
  { teaId: 1, grams: 100 },
  { teaId: 3, grams: 50 },
  { teaId: 8, grams: 200 },
];

calculateOrderTotal(order)
  .then((total) => console.log(`Order total: ${total.toFixed(2)} DKK`))
  .catch((err) => console.error("Error:", err.message));
