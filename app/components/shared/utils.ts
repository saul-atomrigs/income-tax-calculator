import { KRW } from './constants';

export const formatToKoreanWon = (num: number): string => {
  const units = ['', '만', '억', '조'];
  let result = '';
  let index = 0;

  while (num > 0) {
    const digit = num % KRW['1만'];
    if (digit !== 0) {
      result = `${digit}${units[index]}${result ? ' ' : ''}${result}`;
    }
    num = Math.floor(num / KRW['1만']);
    index++;
  }

  return result || '0';
};

export const formatMoney = (value: string): string => {
  const number = parseInt(value) || 0;
  return `${formatToKoreanWon(number)}원`;
};
