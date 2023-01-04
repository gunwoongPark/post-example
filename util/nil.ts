import { isNil } from "lodash";

export const isNotNil = (value: any): boolean => {
  return !isNil(value);
};
