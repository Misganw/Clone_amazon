import "./dayjs.js";
//import { cart } from "../data/cart.js";
export let order = JSON.parse(localStorage.getItem("order"));

export let cart = JSON.parse(localStorage.getItem("cart"));

if (!order) {
  order = [
    {
      Id: "27cba69d",
      userId: 2,
      orderDate: new Date().toISOString().split("T")[0],
      totalPrice: 0,
      cart_item: [],
      orderStatus: "",
    },
  ];
}

//function to add product to order
function generateOredeId() {
  return "ORD" + String(order.length + 1).padStart(4, "0");
}
export function addToorder(UID, totp) {
  const today_js = dayjs();
  const dateFormat_js = today_js.format("ddd-MMM-D");

  let userId = UID;
  let Id = generateOredeId();
  let orderDate = new Date().toISOString().split("T")[0];
  let totalPrice = totp;
  let cart_item = [];
  let orderStatus = "Preparing";

  cart.forEach((cartItem) => {
    if (cartItem.userId === Number(UID)) {
      cart_item.push({
        userId: UID,
        productId: cartItem.productId,
        quantity: Number(cartItem.quantity),
        deliveryOptionId: cartItem.deliveryOptionId,
      });
    }
    // console.log(cart);
    console.log("cart item : " + cartItem.quantity);
  });

  order.push({
    Id,
    userId,
    orderDate,
    totalPrice,
    cart_item,
    orderStatus,
  });
  localStorage.setItem("order", JSON.stringify(order));
}

//function to delete the product from cart.js
export function removeProductFromCart(UID) {
  const newcart = [];
  cart.forEach((cartItem) => {
    if (cartItem.userId !== Number(UID)) {
      newcart.push(cartItem);
    }
  });
  cart = newcart;
  localStorage.setItem("cart", JSON.stringify(cart));
}

//function to get the product data from product.js
export function get_Product(pid_from_cart) {
  let productData;
  products.forEach((productItems) => {
    if (productItems.id === pid_from_cart) {
      productData = productItems;
    }
  });
  return productData;
}

//function to get the order data from order.js
export function getOrder(OID) {
  let newOrder;
  order.forEach((order_id) => {
    if (order_id.Id === OID) {
      newOrder = order_id;
    }
  });
  return newOrder;
}

//function to get the product quantity  from order
export function getQuantity(ID) {
  let newQuantity;
  order.forEach((anItem) => {
    let order_Data = anItem.cart_item;
    order_Data.forEach((option) => {
      if (option.quantity === Number(ID)) {
        newQuantity = option;
      }
    });
  });
  return newQuantity;
}

//function to add product to cart when user press Buy it again button on tracking page
export function addToCart(PID, Quant) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === PID) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += Number(Quant);
  } else {
    cart.push({
      userId: 2,
      productId: PID,
      quantity: Number(Quant),
      deliveryOptionId: "2",
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
