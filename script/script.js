let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

let cart = [];

  addToCartButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      const product = button.parentNode;
      const title = product.querySelector(".Prod2").textContent;
      const price = parseFloat(product.querySelector(".Price").textContent.slice(1));

      // Check if the product is already in the cart
      const existingItem = cart.find(item => item.title === title);

      if (existingItem) {
        // Increment the quantity if the product is already in the cart
        existingItem.quantity++;
        existingItem.total += price;
      } else {
        // Add the product to the cart
        const item = {
          title: title,
          price: price,
          quantity: 1,
          total: price
        };
        cart.push(item);
      }

      updateCart();
    });
  });

  function updateCart() {
    cartItems.innerHTML = "";
    let cartTotal = 0;

    cart.forEach(function(item) {
      const cartItem = document.createElement("li");
      cartItem.textContent = ${item.title} (Quantity: ${item.quantity}) - ₱${item.total.toFixed(2)};
      
      const removeButton = document.createElement("button");
      removeButton.className = "remove-button";
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", function() {
        removeItemFromCart(item);
      });
      
      cartItem.appendChild(removeButton);
      cartItems.appendChild(cartItem);
      cartTotal += item.total;
    });

    totalElement.textContent = ₱${cartTotal.toFixed(2)};
  }

  function removeItemFromCart(item) {
    const itemIndex = cart.findIndex(cartItem => cartItem.title === item.title);
    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);
      updateCart();
    }
  }

  checkoutButton.addEventListener("click", function() {
    overlay.style.display = "flex";
  });

  checkoutForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const address = document.querySelector("#address").value;

    if (name && email && address) {
      // Perform checkout logic here, e.g., send order details to a server
      alert("Order placed successfully!");
      cart = [];
      updateCart();
      overlay.style.display = "none";
    } else {
      alert("Please fill in all the fields.");
    }
  });

  cancelButton.addEventListener("click", function() {
    overlay.style.display = "none";
  });