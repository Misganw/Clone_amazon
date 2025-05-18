import { deliveryOption } from "./deliveryOptions.js";
import { products } from "./products.js";
export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    {
      userId: 2,
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: "1",
    },
  ];
}

//function to add product to cart
export function addToCart(PID) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === PID) {
      matchingItem = cartItem;
    }
  });
  const quantityOption = document.querySelector(
    `.quantity_options_${PID}`
  ).value;
  if (matchingItem) {
    matchingItem.quantity += Number(quantityOption);
  } else {
    cart.push({
      userId: 2,
      productId: PID,
      quantity: Number(quantityOption),
      deliveryOptionId: "2",
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

//function to delete the product from cart
export function removeProductFromCart(PID) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== PID) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  localStorage.setItem("cart", JSON.stringify(cart));
}
//function to calculater cart quanititys
export function calcCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(".return-to-home-link").innerHTML =
    cartQuantity + " items";
  return cartQuantity;
}

//function to update product data in cart
export function updateQuantity(PID, id) {
  let quantity = 0;
  const quantityValue = document.querySelector(`.quantity_${PID}`).value;
  cart.forEach((cartItem) => {
    if (cartItem.productId === PID) {
      cartItem.quantity += Number(quantityValue);
      quantity = cartItem.quantity;
      document.querySelector(`.quant_${id}`).innerHTML = quantity;
    }
  });
  calcCartQuantity();
  localStorage.setItem("cart", JSON.stringify(cart));
}
//update delivery option id of the product in the cart
export function updateDOid(product, d_optionId) {
  let machingProductId;
  cart.forEach((cartItem) => {
    if (cartItem.productId === product) {
      machingProductId = cartItem;
    }
  });
  machingProductId.deliveryOptionId = d_optionId;
  localStorage.setItem("cart", JSON.stringify(cart));
  return machingProductId.deliveryOptionId;
}
