import {
  cart,
  removeProductFromCart,
  calcCartQuantity,
  updateQuantity,
  updateDOid,
} from "../data/cart.js";
import { products, getProduct } from "../data/products.js";
import { priceCalc } from "./utils/money.js";
import { deliveryOption } from "../data/deliveryOptions.js";
import { renderPayment } from "./paymentSummary.js";

//render the products form the cart
let orderSummaryHTML = "";
let cartQuantity = 0;
cart.forEach((cartItem) => {
  cartQuantity += cartItem.quantity;
  const productIdInCart = cartItem.productId;
  let optionIdInCart = cartItem.deliveryOptionId;

  let ProductData = getProduct(productIdInCart);
  let deliveryOptionMatching;

  deliveryOption.forEach((option) => {
    if (option.id === optionIdInCart) {
      deliveryOptionMatching = option;
    }
  });
  let dateString_js;
  const today_js = dayjs();
  const weekendCheck = today_js.add(
    deliveryOptionMatching.deliveryTime,
    "days"
  );
  const weekend = weekendCheck.format("dddd");
  if (weekend === "Saterday") {
    dateString_js = today_js.add(
      deliveryOptionMatching.deliveryTime + 2,
      "days"
    );
  } else if (weekend === "Sunday") {
    dateString_js = today_js.add(
      deliveryOptionMatching.deliveryTime + 1,
      "days"
    );
  } else {
    dateString_js = today_js.add(deliveryOptionMatching.deliveryTime, "days");
  }

  const dateFormat_js = dateString_js.format("ddd-MMM-D");
  orderSummaryHTML += `
    <div class="cart-item-container js_cart_${cartItem.productId}">
          <div class="delivery-date js_delivery_date js_delivery_date_${
            cartItem.productId
          }">
            Delivery date: ${dateFormat_js}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${ProductData.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${ProductData.name}
              </div>
              <div class="product-price">
                $${priceCalc(ProductData.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label quant_${
                    cartItem.productId
                  }">${cartItem.quantity}</span>
                </span>

                <span class="update-quantity-link link-primary js_update_cart update_${
                  cartItem.productId
                }" data-product-id=${cartItem.productId}>
                  Update
                </span>

                <input class="quantity_${
                  cartItem.productId
                } link-primary quantity" data-product-id=${cartItem.productId}>
                <span class="saveQuantity_${
                  cartItem.productId
                } save" data-product-id=${cartItem.productId}>Save</span>
                
                <span class="delete-quantity-link link-primary js_deleteCart js_deleteCart_${
                  cartItem.productId
                }" data-product-id=${cartItem.productId}>
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
             ${getDeliveryOption(ProductData, cartItem)}
            </div>

          </div>
        </div>
    `;
});

document.querySelector(".js_order_summary").innerHTML = orderSummaryHTML;
calcCartQuantity();

//compute delivery date option for each product in the cart
function getDeliveryOption(ProductData, cartItem) {
  let deliveryOptionHTML = "";
  deliveryOption.forEach((daliveryDate) => {
    const today = dayjs();
    const dateString = today.add(daliveryDate.deliveryTime, "days");
    const dateFormat = dateString.format("ddd-MMM-D");

    const deliveryCost =
      daliveryDate.deliveryPrice === 0
        ? "FREE"
        : `$${priceCalc(daliveryDate.deliveryPrice)} - Shipping`;

    const ischecked = daliveryDate.id === cartItem.deliveryOptionId;
    deliveryOptionHTML += `
             <div class="delivery-option js_delivery_option" data-product-id="${
               ProductData.id
             }" data-option-id="${daliveryDate.id}">
                <input type="radio" ${
                  ischecked ? "checked" : ""
                } class="delivery-option-input" name="delivery-option-${
      ProductData.id
    }">
                <div>
                  <div class="delivery-option-date">
                    ${dateFormat}
                  </div>
                  <div class="delivery-option-price">
                    ${deliveryCost}
                  </div>
                </div>
              </div>`;
  });
  return deliveryOptionHTML;
}

//delete product from cart
const delete_btn = document.querySelectorAll(".js_deleteCart");
delete_btn.forEach((btnDelete) => {
  btnDelete.addEventListener("click", () => {
    let btn_delete = btnDelete.dataset.productId;
    removeProductFromCart(btn_delete);
    calcCartQuantity();
    //productInCart(); // this takes browsing time when there are huge dat in the cart.
    document.querySelector(`.js_cart_${btn_delete}`).remove();
    renderPayment();
  });
});

//Make update button Interactive
const uptoDate = document.querySelectorAll(".js_update_cart");
uptoDate.forEach((update_btn) => {
  update_btn.addEventListener("click", () => {
    let updateCart = update_btn.dataset.productId;

    let inputFeild = document.querySelector(`.quantity_${updateCart}`);
    inputFeild.classList.add("quantity_input");

    let saveQuantity = document.querySelector(`.saveQuantity_${updateCart}`);
    saveQuantity.classList.add("save_quantity");

    document
      .querySelector(`.js_deleteCart_${updateCart}`)
      .classList.add("js_hideDelete");
    update_btn.classList.add("js_updateHide");
  });
});
// Make the Save button interactive and update the quantity product
const saveBtn = document.querySelectorAll(".save");
saveBtn.forEach((save_btn) => {
  save_btn.addEventListener("click", () => {
    let savButtonID = save_btn.dataset.productId;
    updateQuantity(savButtonID, savButtonID);

    document
      .querySelector(`.js_deleteCart_${savButtonID}`)
      .classList.remove("js_hideDelete");
    document
      .querySelector(`.update_${savButtonID}`)
      .classList.remove("js_updateHide");
    document
      .querySelector(`.quantity_${savButtonID}`)
      .classList.remove("quantity_input");
    save_btn.classList.remove("save_quantity");
  });
});

// update delivary date when delivery option radio button is changed
const updatedeliveryOption = document.querySelectorAll(".js_delivery_option");
updatedeliveryOption.forEach((options) => {
  options.addEventListener("click", () => {
    const product = options.dataset.productId;
    const option = options.dataset.optionId;
    // updateDOid(product,option);

    let machingOption;
    let deliveryoptionincart;
    deliveryoptionincart = updateDOid(product, option);
    // console.log(deliveryoptionincart);
    deliveryOption.forEach((opt) => {
      if (opt.id === deliveryoptionincart) {
        machingOption = opt;
      }
    });
    const today_js = dayjs();
    const dateString_js = today_js.add(machingOption.deliveryTime, "days");
    const dateFormat_js = dateString_js.format("ddd-MMM-D");
    document.querySelector(`.js_delivery_date_${product}`).innerHTML =
      "Delivery Date: " + dateFormat_js;
    // console.log(dateFormat_js);
    renderPayment();
  });
});
