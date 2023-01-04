import { isDate, isNil, isString } from "lodash";
import moment, { Moment } from "moment";

const dateFormat = (date: string | Date | Moment): string => {
  if (isNil(date)) {
    return "";
  }
  if (isString(date)) {
    return dateFormat(moment(date));
  }
  if (isDate(date)) {
    return dateFormat(moment(date));
  }

  return date.format("YYYY.MM.DD");
};

export default dateFormat;
