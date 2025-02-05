import { DATE_PT_BR } from '../constants/Date';
import moment from 'moment';

export const formatterDate = (
  date: string | Date,
  format = DATE_PT_BR,
  formatDate?: string
): string => {
  moment.locale('pt-br');
  if (date) {
    return moment(date, formatDate).format(format);
  }
  return '';
};
