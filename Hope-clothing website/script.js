const products = [
  {
    id: 1,
    name: "Star Hope Oversized Tee",
    price: 39.99,
    image: "images/star-hope-tee.png"
  },
  {
    id: 2,
    name: "Angel Faith Graphic Tee",
    price: 42.99,
    image: "images/angel-love-tee.png"
  },
  {
    id: 3,
    name: "Universal Hope Hoodie",
    price: 65.99,
    image: "images/universal-hoodie.png"
  }
];

const productsGrid = document.getElementById('products-grid');

function renderProducts() {
  productsGrid.innerHTML = '';
  
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="price">$${product.price}</p>
        <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Bag</button>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

// Render products
renderProducts();

function addToCart(id) {
  alert(`✅ ${products.find(p => p.id === id).name} added to bag!`);
}