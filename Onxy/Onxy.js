// Dynamic product data - can be updated or fetched from an API
const products = [
  {
    id: 40,
    name: "Bianco White",
    image: "Imported Marbles/1.Bianco White.png",
  }
];
 // Event listeners
 document.getElementById("cart-icon").addEventListener("click", openCartModal);
 document.getElementById("close-cart-btn").addEventListener("click", closeCartModal);
 document.getElementById("send-request-btn").addEventListener("click", openUserDetailsModal);

  
  // Initialize the cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Render products dynamically based on the products array
  function renderProducts() {
    const productsContainer = document.getElementById("products");
  
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card border p-4 rounded-lg  bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100"
      ;
  
      productCard.innerHTML = `
        <img
          src="${product.image}"
          alt="${product.name}"
          class="w-full h-52 object-cover rounded mb-4"
        />
        <h2 class="text-lg font-bold">${product.name}</h2>
        <button
          class="add-to-cart-btn mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          data-product-id="${product.id}"
          data-product-name="${product.name}"
          data-product-image="${product.image}"
        >
          Add to Cart
        </button>
        
      `;
      
  
      productsContainer.appendChild(productCard);
    });
  }
  
  // Function to add products to the cart
  function addToCart(productId, productName, productImage) {
    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.id === productId);
    if (!existingProduct) {
      cart.push({
        id: productId,
        name: productName,
        image: productImage,
      });
      // Update localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    // Update the cart UI
    updateCartUI();
  }
  
  // Function to remove a product from the cart
  function removeFromCart(productId) {
    // Filter out the product from the cart array
    cart = cart.filter(item => item.id !== productId);
  
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // Update the cart UI
    updateCartUI();
  }
  
  // Update the cart icon and display
  function updateCartUI() {
    const cartIconCount = document.getElementById("cart-icon-count");
    const cartContainer = document.getElementById("cart-container");
    const sendRequestBtn = document.getElementById("send-request-btn");
  
    // Display the number of items in the cart
    cartIconCount.textContent = cart.length;
  
    // Display "Send Request" button if there are items, otherwise disable it
    sendRequestBtn.disabled = cart.length === 0;
  
    // Clear the cart display
    cartContainer.innerHTML = "";
  
    // Display the cart items
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item flex items-center space-x-4 p-2 border-b";
  
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded object-cover">
        <span>${item.name}</span>
        <button
          class="remove-btn text-red-500 hover:text-red-700"
          data-product-id="${item.id}"
        >
          Remove
        </button>
      `;
  
      // Add event listener to remove button
      cartItem.querySelector('.remove-btn').addEventListener('click', (e) => {
        const productId = e.target.dataset.productId;
        removeFromCart(Number(productId));
      });
  
      cartContainer.appendChild(cartItem);
    });
  }
  
  // Open the cart modal when the cart icon is clicked
  function openCartModal() {
    document.getElementById("cart-modal").classList.remove("hidden");
  }
  
  // Close the cart modal
  function closeCartModal() {
    document.getElementById("cart-modal").classList.add("hidden");
  }
  
  // Open the modal to collect user details before sending the request
  function openUserDetailsModal() {
    document.getElementById("user-details-modal").classList.remove("hidden");
  }
  
  // Close the modal
  function closeUserDetailsModal() {
    document.getElementById("user-details-modal").classList.add("hidden");
  }
  
  // Handle the form submission for user details
  document.getElementById("user-details-form").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const name = document.getElementById("user-name").value;
    const phone = document.getElementById("user-phone").value;
  
    const cartItems = cart.map(item => `${item.name} (${item.id})`);
  
    // Send a WhatsApp message with the order details
    const message = `Hi, I want to order: ${cartItems.join(", ")}. Name: ${name}, Phone: ${phone}.`;
    const phoneNumber = "9560158551";  // Replace with your phone number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
    window.open(url, "_blank");
  
    // Clear the cart
    cart = [];
    localStorage.removeItem('cart');
    updateCartUI();
  
    closeUserDetailsModal();
  });
  
 
  
  // Add event listener to all Add to Cart buttons
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart-btn")) {
      const productId = Number(event.target.dataset.productId);
      const productName = event.target.dataset.productName;
      const productImage = event.target.dataset.productImage;
  
      addToCart(productId, productName, productImage);
    }
  });
  
  // Initial render of products
  renderProducts();
  
  // Update the cart UI on page load
  updateCartUI();
  
  // Hide both modals on page load if cart is empty
  if (cart.length === 0) {
    document.getElementById("cart-modal").classList.add("hidden");
    document.getElementById("user-details-modal").classList.add("hidden");
  }
  
  
 // Event listener for the search input
document.getElementById("search-input").addEventListener("input", filterProducts);

// Function to filter products based on the search input
function filterProducts(event) {
  const query = event.target.value.toLowerCase();

  // Filter products that match the search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query)
  );

  // Render the filtered products
  renderProducts(filteredProducts);
}

// Modified renderProducts function to accept a filtered list of products
function renderProducts(productsToRender = products) {
  const productsContainer = document.getElementById("products");

  // Clear existing products
  productsContainer.innerHTML = "";

  productsToRender.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card  border p-3  rounded-lg shadow-2xl bg-gradient-to-bl from-[#ffe4e6]  to-[#ccfbf1]";

    productCard.innerHTML = `
      <img
        src="${product.image}"
        alt="${product.name}"
        class="w-full h-64 object-cover rounded-2xl mb-2
        "
      />
      <h2 class="text-lg font-bold font-mono underline ">${product.name}</h2>
      <button
        class="add-to-cart-btn mt-4 bg-blue-500 text-white ring-2 ring-slate-700 px-4 py-2 rounded hover:bg-blue-600 "
        data-product-id="${product.id}"
        data-product-name="${product.name}"
        data-product-image="${product.image}"
      >
        Add to Cart
      </button>
    `;

    productsContainer.appendChild(productCard);
  });
}
 