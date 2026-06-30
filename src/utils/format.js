export function formatSize(sizeInGB) {
  if (sizeInGB >= 1000) {
    let tb = sizeInGB / 1000;

    return tb.toFixed(1).replace(/\.0$/, '') + 'TB';
  } else {
    return sizeInGB + 'GB';
  }
}

export function formattedAmount(amount) {
  return amount.toLocaleString('en-PH', {
      style: 'currency',
      currency: 'PHP',
  });
}
