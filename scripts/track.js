// Retrieve product info
const productData = JSON.parse(localStorage.getItem("trackingProduct"));

if (productData) {
  let trackHTML = `        
      <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${productData.delivery_Date}
        </div>

        <div class="product-info">
          ${productData.product_Name}
        </div>

        <div class="product-info">
          Quantity: ${productData.quantities}
        </div>

        <img class="product-image" src="../${productData.product_Image}">

        <div class="progress-labels-container js_deliveryProgress">
          <div class="progress-label1">
            Preparing
          </div>
          <div class="progress-label2">
            Shipped
          </div>
          <div class="progress-label3">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>`;
  document.querySelector(".js_orderTracking").innerHTML = trackHTML;

  switch (productData.status) {
    case "Preparing":
      document
        .querySelector(".progress-bar")
        .classList.remove("shipped_progress");
      document
        .querySelector(".progress-bar")
        .classList.remove("delivered_progress");
      document
        .querySelector(".progress-bar")
        .classList.add("preparing_progress");
      document
        .querySelector(".progress-label1")
        .classList.add("shipped_status1");
      break;
    case "Shipped":
      document
        .querySelector(".progress-bar")
        .classList.remove("preparing_progress");
      document
        .querySelector(".progress-bar")
        .classList.remove("delivered_progress");
      document.querySelector(".progress-bar").classList.add("shipped_progress");
      document
        .querySelector(".progress-label2")
        .classList.add("shipped_status2");
      break;
    case "Delivered":
      // progressHTML = `<div class="progress-label">
      //       Delivered
      //     </div>`;
      document
        .querySelector(".progress-bar")
        .classList.remove("shipped_progress");
      document
        .querySelector(".progress-bar")
        .classList.remove("preparing_progress");
      document
        .querySelector(".progress-bar")
        .classList.add("delivered_progress");
      document
        .querySelector(".progress-label3")
        .classList.add("shipped_status3");
      break;
    default:
      progressHTML = "Status not available.";
  }
} else {
  document.querySelector(".js_orderTracking").innerText =
    "Nothing Product is there";
}
