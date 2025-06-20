export type ValueType =
  | string
  | number
  | string[]
  | number[]
  | null
  | undefined;

export type ISet<T = string> = (key: T, value: string | number | null) => void;
export type ISetGroup<T = string[]> = (
  key: T,
  value: Array<string | string[] | number | number[] | null> | null
) => void;
export type IDebounceSet<T = string> = (
  key: T,
  value: string | number | null,
  debounce: number
) => void;

export type IGet<T = string | string[]> = (
  key: T
) => Record<string, string | null>;

export type ISetGroupWithDebounce = (
  keys: string[],
  values: Array<string | number | null>,
  debounce: number
) => void;
