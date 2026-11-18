export function calculateTotalCost(item) {
  return (item.shippingCost === '' ? 0 : item.shippingCost) + (item.costOfGoods === '' ? 0 : item.costOfGoods);
}

export function calculateProfit(item) {
  const totalCost = calculateTotalCost(item);
  return (item.salesPrice || item.subPrice + item.shippingCollected) - totalCost;
}