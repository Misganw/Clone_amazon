//combining all the strings together
import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { priceCalc } from "./utils/money.js";
//we can also import as
//import * as cartModule from '../data/cart.js';
// and use a function inside cart.js as cartModule.cart or cartModule.addto_Cart

let productsHTML = "";
products.forEach((product) => {
  productsHTML += `
 <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="../images/ratings/rating-${
            product.rating.stars * 10
          }.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${priceCalc(product.priceCents)}
        </div>


        <div class="product-quantity-container">
          <select class="quantity_options_${product.id}">
            <option selected value="1">1</option>
            <option value=2>2</option>
            <option value=3>3</option>
            <option value=4>4</option>
            <option value=5>5</option>
            <option value=6>6</option>
            <option value=7>7</option>
            <option value=8>8</option>
            <option value=9>9</option>
            <option value=10>10</option>
          </select>
        </div>
        

        <div class="product-spacer"></div>
        <div class="added-to-cart added-to-cart-${product.id}">
          <img src="../images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary add_to_cart" data-product-id="${
          product.id
        }">
          Add to Cart 
        </button>
      </div>
`;
});
document.querySelector(".js_products_grid").innerHTML = productsHTML;
const addtoCart = document.querySelectorAll(".add_to_cart");
addtoCart.forEach((addbtn) => {
  addbtn.addEventListener("click", () => {
    const productID = addbtn.dataset.productId;
    addToCart(productID);
    document
      .querySelector(`.added-to-cart-${productID}`)
      .classList.add("added_message");
    setTimeout(() => {
      document
        .querySelector(`.added-to-cart-${productID}`)
        .classList.remove("added_message");
    }, 2000);

    showCartQuantity();
  });
});
function showCartQuantity() {
  let cartQuanity = 0;
  cart.forEach((cartItem) => {
    cartQuanity += cartItem.quantity;
  });
  document.querySelector(".js_cart_quantity").innerHTML = cartQuanity;
}
showCartQuantity();

if (products.id === "aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f") {
  console.log(products.keywords);
}
