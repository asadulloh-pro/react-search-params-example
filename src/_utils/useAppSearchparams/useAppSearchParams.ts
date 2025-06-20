import { useCallback, useRef } from 'react';

import { useSearchParams as glSearchParams } from 'react-router-dom';
import type {
  IDebounceSet,
  IGet,
  ISet,
  ISetGroup,
  ISetGroupWithDebounce,
} from './_types';
import { isEmptyValue } from './_utils';

const useAppSearchParams = () => {
  const [searchParams, setSearchParams] = glSearchParams();
  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});
  const groupDebounceTimers = useRef<Record<string, NodeJS.Timeout>>({});

  const set: ISet = useCallback(
    (key, value) => {
      if (isEmptyValue(value) && typeof value !== 'number') {
        searchParams.delete(String(key));
      } else {
        searchParams.set(String(key), String(value));
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const setGroup: ISetGroup = useCallback(
    (keys, values) => {
      if (values === null) {
        if (Array.isArray(keys)) {
          keys.forEach((key) => {
            searchParams.delete(String(key));
          });
          setSearchParams(searchParams);
        }
      } else if (
        Array.isArray(keys) &&
        Array.isArray(values) &&
        keys.length === values.length
      ) {
        keys.forEach((key, index) => {
          const value = values[index];
          if (isEmptyValue(value) && typeof value !== 'number') {
            searchParams.delete(String(key));
          } else {
            searchParams.set(String(key), String(value));
          }
        });
        setSearchParams(searchParams);
      } else {
        console.error('Keys and values must be arrays of the same length');
      }
    },
    [searchParams, setSearchParams]
  );

  const get: IGet = useCallback(
    (key) => {
      const _values: Record<string, string | null> = {};
      if (typeof key === 'string') {
        _values[key] = searchParams.get(key);
      } else if (Array.isArray(key)) {
        key.forEach((k) => {
          _values[k] = searchParams.get(k);
        });
      }
      return _values;
    },
    [searchParams]
  );

  const setWithDebounce: IDebounceSet = useCallback(
    (key, value, debounce) => {
      if (debounceTimers.current[key]) {
        clearTimeout(debounceTimers.current[key]);
      }

      debounceTimers.current[key] = setTimeout(() => {
        if (isEmptyValue(value) && typeof value !== 'number') {
          searchParams.delete(String(key));
        } else {
          searchParams.set(String(key), String(value));
        }
        setSearchParams(searchParams);
        delete debounceTimers.current[key];
      }, debounce);
    },
    [searchParams, setSearchParams]
  );

  const setGroupWithDebounce: ISetGroupWithDebounce = useCallback(
    (
      keys: string[],
      values: Array<string | number | null>,
      debounce: number
    ) => {
      if (
        !Array.isArray(keys) ||
        !Array.isArray(values) ||
        keys.length !== values.length
      ) {
        console.error('Keys and values must be arrays of the same length');
        return;
      }

      const groupKey = [...keys].sort().join(',');

      if (groupDebounceTimers.current[groupKey]) {
        clearTimeout(groupDebounceTimers.current[groupKey]);
        delete groupDebounceTimers.current[groupKey];
      }

      groupDebounceTimers.current[groupKey] = setTimeout(() => {
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);

          keys.forEach((key, index) => {
            const value = values[index];
            if (isEmptyValue(value) && typeof value !== 'number') {
              newParams.delete(key);
            } else {
              newParams.set(key, String(value));
            }
          });

          return newParams;
        });

        delete groupDebounceTimers.current[groupKey];
      }, debounce);
    },
    [setSearchParams]
  );

  return {
    setSearchParams,
    searchParams,
    set,
    get,
    setWithDebounce,
    setGroup,
    setGroupWithDebounce,
  };
};

export default useAppSearchParams;
