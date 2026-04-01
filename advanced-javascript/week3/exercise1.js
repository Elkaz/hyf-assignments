const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function searchTeas(query) {

  const response = await fetch(`${API_BASE}/teas`);

  const teas = await response.json();

  const result = teas.filter((tea) =>
    tea.name.toLowerCase().includes(query.toLowerCase())
  );

  return result;
}

// Test
searchTeas("pearl").then((teas) => {
  console.log("Search results for 'pearl':");
  teas.forEach((tea) => console.log(`- ${tea.name}`));
});