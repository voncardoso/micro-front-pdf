import { ELocale } from '../enums/locale.enum';

export function formatterNumber(number?: number, locale = ELocale.PT_BR) {
  if (!number) return '-';
  const options: Intl.NumberFormatOptions = {
    style: 'decimal',
  };

  const formatted = new Intl.NumberFormat(locale, options).format(number);

  return formatted;
}
