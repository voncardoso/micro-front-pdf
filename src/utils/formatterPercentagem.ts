export function formatterPercentagem(
  parcial?: number,
  total?: number,
  decimals?: number
) {
  if (!parcial || !total) return 0;
  if (total === 0) {
    return total;
  }

  const percentage = (parcial / total) * 100;

  if (decimals) {
    return Number(percentage.toFixed(decimals));
  }
  return Math.round(percentage);
}
