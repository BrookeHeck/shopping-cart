/* global Cart */
"use strict";

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById("cart");
table.addEventListener("click", removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cart = new Cart(cartItems);
  return cart;
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// DONE: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  // TODO: Find the table body
  let tableBody = document.querySelector("tbody");
  // console.log(cart.items.items);
  // DONE: Iterate over the items in the cart
  // DONE: Create a TR
  // DONE: Create a TD for the delete link, quantity,  and the item
  // DONE: Add the TR to the TBODY and each of the TD's to the TR
  if (cart.items.items.length > 0) {
    for (let cartItem of cart.items.items) {
      let row = document.createElement("tr");
      let remove = document.createElement("td");
      remove.innerHTML = "X";
      remove.id = cartItem.product;
      remove.addEventListener("click", () => {
        removeItemFromCart(cartItem);
      });
      row.appendChild(remove);
      let quantity = document.createElement("td");
      quantity.innerHTML = cartItem.quantity;
      row.appendChild(quantity);
      let item = document.createElement("td");
      item.innerHTML = cartItem.product;
      row.appendChild(item);
      tableBody.appendChild(row);
    }
  }
}

function removeItemFromCart(cartItem) {
  // done: When a delete link is clicked, use cart.removeItem to remove the correct item
  // console.log(cartItem);
  cart.removeItem(cartItem);
  // console.log(cart);
  // done: Save the cart back to local storage
  cart.saveToLocalStorage();

  // done: Re-draw the cart table
  clearCart();
  showCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
