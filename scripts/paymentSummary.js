import { cart, calcCartQuantity } from "../data/cart.js";
import { getdeliveryOptionId } from "../data/deliveryOptions.js";
import { getProduct } from "../data/products.js";
import { priceCalc } from "./utils/money.js";
import { order, addToorder, removeProductFromCart } from "./order.js";
export function renderPayment() {
  let productPrice = 0;
  let shipingPrice = 0;

  let getproductData;
  let getDeliveryOption;
  let cartData = 0;
  cart.forEach((cartItem) => {
    cartData = cartItem;
    getproductData = getProduct(cartItem.productId);
    getDeliveryOption = getdeliveryOptionId(cartItem.deliveryOptionId);
    productPrice += getproductData.priceCents * cartItem.quantity;
    shipingPrice += getDeliveryOption.deliveryPrice;
  });
  //console.log(cartData.userId);
  let grossPrice = productPrice + shipingPrice;
  let tax = grossPrice * 0.1;
  let total = grossPrice + tax;
  const paymentSummary = `
         <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div class="ItemQuantity">Items (3):</div>
          <div class="payment-summary-money">$${priceCalc(productPrice)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${priceCalc(shipingPrice)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${priceCalc(grossPrice)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${priceCalc(tax)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${priceCalc(total)}</div>
        </div>

        <button class="place-order-button button-primary js_placeOrder_${
          cartData.userId
        }" data-user-id=${cartData.userId}>
          Place your order
        </button>
`;
  let pSummary = document.querySelector(".js_paymentSummary");
  pSummary.innerHTML = paymentSummary;

  document.querySelector(".ItemQuantity").innerHTML =
    calcCartQuantity() + " Items";
  const Place_order = document.querySelector(
    `.js_placeOrder_${cartData.userId}`
  );
  Place_order.addEventListener("click", () => {
    //console.log(getproductData);
    const user_ID = Place_order.dataset.userId;
    addToorder(user_ID, priceCalc(total));
    removeProductFromCart(user_ID);
    //console.log(user_ID);
    console.log(order);
    renderPayment();
  });
}
