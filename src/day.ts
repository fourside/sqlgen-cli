import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const today = dayjs().utc();
export const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";
