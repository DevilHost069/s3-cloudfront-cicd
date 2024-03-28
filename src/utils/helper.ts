import { server } from "./../mocks/server";
import moment from "moment";

export function isObjectEmpty(obj: any) {
  return Object.keys(obj).length === 0;
}

// check if object in not empty and check each key value contains 'Required'
export function isObjectContainsRequired(obj: any) {
  if (isObjectEmpty(obj)) {
    return false;
  }
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key].includes("Required")) {
        return true;
      }
    }
  }
  return false;
}

export const extractDateTimeToTime = (date: string) => {
  if (date) {
    const dateTime = moment(date)?.format("hh:mm A");
    return dateTime;
  }
  return "";
};

// check if object is empty or not
export const isObjectEmptyCheck = (obj: any) => {
  return Object.keys(obj).length === 0;
};

export const getStorage = (key: string) => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

export const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

// convert this {"fullName":"Emery Parrish","email":"wayder@mailinator.com","password":"Pa$$w0rd!"} to {
//   fullName: "Emery Parrish",
//   email: "wayder@mailinator",
//   password: "Pa$$w0rd!",
// }

export const convertObjectToFormData = (obj: any) => {
  const formData = new FormData();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      formData.append(key, obj[key]);
    }
  }
  return formData;
};

export function compareTimeFromExptoNow(date: string): boolean {
  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  // if date is 3:00pm and now is 4:00pm or date is 3:00pm and now is 3:00pm then it is expired
  return moment(now, "YYYY-MM-DD HH:mm:ss").isAfter(
    moment(date, "YYYY-MM-DD HH:mm:ss")
  );
}

export const makespace = (str: string) => {
  //   eg 22kg or 55mg make 22 kg or 55 mg
  const regex = /([0-9]+)([a-zA-Z]+)/g;
  const subst = `$1 $2`;
  const result = str.replace(regex, subst);
  return result;
};

export function extractContent(s: string) {
  var span = document.createElement("span");
  span.innerHTML = s;
  return span.textContent || span.innerText;
}

export function reverseArr(array) {
  return array.map((item, idx) => array[array.length - 1 - idx]);
}
export function parsePagePath(path) {
  return path.slice(1).replaceAll("-", " ").replaceAll("/", " ");
}

export const getNotificationDateFormatted = (dateStr: string) => {
  return moment.utc(dateStr).local().startOf("seconds").fromNow();
};

export const formatNotificationLabel = (label) => {
  return label.replaceAll("_", " ");
};
export const attr_format = (att) => {
  const attRemoved = att.replaceAll("_", " ");
  return attRemoved.charAt(0).toUpperCase() + attRemoved.slice(1) + ":";
};

export const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const getNameInitials = (name: string) => {
  const chunks = name.split(" ");
  if (chunks.length === 1) {
    return name[0].toUpperCase();
  } else if (chunks.length > 1) {
    const chunksInitials: any = chunks
      .map((chunk: string) => chunk[0])
      .toString();
    console.log(chunksInitials);
    return chunksInitials.replaceAll(",", ".").toUpperCase();
  }
};
