export let deliveryOption = [
  {
    id: "1",
    deliveryTime: 7,
    deliveryPrice: 0,
  },
  {
    id: "2",
    deliveryTime: "5",
    deliveryPrice: 499,
  },
  {
    id: "3",
    deliveryTime: "3",
    deliveryPrice: 999,
  },
];

export function getdeliveryOptionId(optionId) {
  let dom;
  deliveryOption.forEach((option) => {
    if (option.id === optionId) {
      dom = option;
    }
  });
  return dom;
}
