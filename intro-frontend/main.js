const products = getAvailableProducts();
const productList = document.querySelector("#product-list");
function renderProducts(products) {
  productList.innerHTML = ""; // clear old content if there is

  products.forEach((product) => {
    const li = document.createElement("li");

    // Stars for rating
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars += i <= Math.round(product.rating) ? "★" : "☆";
    }

    li.innerHTML = `
      <strong>${product.name}</strong>
      <span class="price">${product.price} DKK</span>
      <span class="rating">${stars}</span>
    `;

    productList.appendChild(li);
  });
}
renderProducts(products);
