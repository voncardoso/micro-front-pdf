import { ECurrency } from '../enums/currency.enum';
import { ELocale } from '../enums/locale.enum';

export function formatterCurrency(
  number: number,
  currency = ECurrency.BRL,
  module: boolean = false
) {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
  };

  const formatted = new Intl.NumberFormat(ELocale.PT_BR, options).format(
    number
  );

  if (module) {
    return formatted.replace('-', '');
  }
  return formatted;
}
