import type { ValueType } from './_types';

export const isEmptyValue = (value: ValueType): boolean => {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === 'string' && value === '') {
    return true;
  }
  return Array.isArray(value) && value.length === 0;
};
