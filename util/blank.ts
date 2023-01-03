import { isArray, isEmpty } from "lodash";

export const isBlank = (value: any): boolean => {
  if (value === "") {
    return true;
  }

  if (isArray(value) && isEmpty(value)) {
    return true;
  }

  return false;
};

export const isNotBlank = (value: any): boolean => {
  return !isBlank(value);
};
