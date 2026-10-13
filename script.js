
const products = [
    { id: 1, name: "T-Shirt", price: 80, icon: "👕" },
    { id: 2, name: "Shoes", price: 200, icon: "👟" },
    { id: 3, name: "Bag", price: 120, icon: "👜" }
];

const cart = [];

const productsContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");
const clearButton = document.getElementById("clear-cart");

function displayProducts() {
    productsContainer.innerHTML = "";

    products.forEach(function(product) {
        productsContainer.innerHTML += `
            <div class="product-card">
                <div class="product-icon">${product.icon}</div>
                <h3>${product.name}</h3>
                <p class="price">GH₵${product.price.toFixed(2)}</p>
                <button class="add-button" data-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

productsContainer.addEventListener("click", function(event) {
    const button = event.target.closest(".add-button");

    if (!button) return;

    const productId = Number(button.dataset.id);
    const product = products.find(function(item) {
        return item.id === productId;
    });

    if (product) {
        cart.push(product);
        displayCart();
    }
});

function displayCart() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';
    }

    let total = 0;

    cart.forEach(function(item, index) {
        total += item.price;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <span>${item.name} - GH₵${item.price.toFixed(2)}</span>
                <button data-remove="${index}">Remove</button>
            </div>
        `;
    });

    totalDisplay.textContent = "GH₵" + total.toFixed(2);
}

cartContainer.addEventListener("click", function(event) {
    const button = event.target.closest("[data-remove]");

    if (!button) return;

    const index = Number(button.dataset.remove);
    cart.splice(index, 1);
    displayCart();
});

clearButton.addEventListener("click", function() {
    cart.length = 0;
    displayCart();
});

displayProducts();
displayCart();
