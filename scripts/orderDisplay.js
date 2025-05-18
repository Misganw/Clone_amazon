import { getProduct, products } from "../data/products.js";
import {
  order,
  getOrder,
  getQuantity,
  get_Product,
  addToCart,
} from "./order.js";
import { deliveryOption } from "../data/deliveryOptions.js";

let orderDataHTML1 = "";
// let orderData;

order.forEach((orderItem) => {
  let orderData = orderItem.cart_item;
  let productName;
  let productImage;
  let deliveryData;
  let deliOptionIncart;
  let productInfo;
  let quantity = 0;

  // console.log(orderData);
  // .......order detail Hearder .....
  function orderDetail(orderDate, totalPrice, Id) {
    orderDataHTML1 += `<div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>${totalPrice}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${Id}</div>
          </div>
        </div>`;
    return orderDataHTML1;
  }
  // .......order detail Hearder .....

  orderDetail(orderItem.orderDate, orderItem.totalPrice, orderItem.Id);

  // .......Product data in each order  .....
  orderData.forEach((cartinOrder) => {
    quantity = cartinOrder.quantity;
    products.forEach((productItem) => {
      if (productItem.id === cartinOrder.productId) {
        productName = productItem.name;
        productImage = productItem.image;
        deliOptionIncart = cartinOrder.deliveryOptionId;
        productInfo = productItem.id;
        //console.log(productName);
      }
    });
    // console.log(quantity);

    deliveryOption.forEach((deliveryItem) => {
      if (
        deliveryItem.id === cartinOrder.deliveryOptionId &&
        deliveryItem.id === deliOptionIncart
      ) {
        deliveryData = deliveryItem.deliveryTime;
      }
    });
    // console.log(deliveryData);
    const today_js = dayjs();
    const Date = today_js.add(deliveryData, "days");
    const dateFormat_js = Date.format("ddd-MMM-D");
    orderDataHTML1 += `
    <!-- ====== order detail gride======= -->
    <div class="order-details-grid js_trackDetail" data-product-name="${productName}" data-products-image="${productImage}" data-order-id=${orderItem.Id} data-quantity=${quantity} data-option-id=${dateFormat_js}>
          <div class="product-image-container">
            <img src="../${productImage}">
          </div>

          <div class="product-details">
            <div class="product-name">${productName}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${dateFormat_js}
            </div>
            <div class="product-quantity">
              Quantity: ${quantity}
            </div>
            <button class="buy-again-button button-primary js_byAgain" data-product-id=${productInfo} data-quantity=${quantity}>
              <img class="buy-again-icon" src="../images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
           <a href="tracking.html">
              <button class="track-package-button button-secondary js_track">
                Track package
              </button>
              </a>

          </div>
        </div>
        <!-- ====== order detail gride======= -->
      </div>
      `;
    // console.log(productInfo);
  });
  // .......Product data in each order  .....

  `<hr>`;
});

document.querySelector(".js_orderContainer").innerHTML = orderDataHTML1;

//fucntion to truck ordered Items when clicking Track Package Button
document.querySelectorAll(".js_track").forEach((trackItem) => {
  trackItem.addEventListener("click", function () {
    window.location.href = "tracking.html";
    const productDiv = this.closest(".js_trackDetail");
    const trackProduct = {
      order_Id: productDiv.dataset.orderId,
      product_Name: productDiv.dataset.productName,
      product_Image: productDiv.dataset.productsImage,
      delivery_Date: productDiv.dataset.optionId,
      quantities: productDiv.dataset.quantity,
      status: "Shipped",
    };
    console.log(trackProduct.status);

    localStorage.setItem("trackingProduct", JSON.stringify(trackProduct));
  });
});

// the following code enable us trigger Buy it again button on tracking page
document.querySelectorAll(".js_byAgain").forEach((byAgain) => {
  byAgain.addEventListener("click", () => {
    const proID = byAgain.dataset.productId;
    const quant = byAgain.dataset.quantity;
    //product_Id = getProduct(proID);
    addToCart(proID, quant);
  });
});
