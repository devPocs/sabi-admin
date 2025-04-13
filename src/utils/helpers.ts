export const asyncGetItem = async (title: string, parsed: boolean = false) => {
  return parsed
    ? localStorage.getItem(title)
      ? JSON.parse(localStorage.getItem(title)!)
      : null
    : localStorage.getItem(title)
    ? localStorage.getItem(title)
    : null;
};

export const asyncSetItem = async (title: string, value: any) => {
  const item = typeof value === "string" ? value : JSON.stringify(value);
  localStorage.setItem(title, item);
};

export const parseJwt = (token: string) => {
  if (!token) return null;
  const base64Url = token.split(".")[1];
  if (!base64Url) return null;

  // Correctly decode base64url to base64
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  // Decode the base64 string to a JSON string
  const jsonPayload = atob(base64);

  const parsedPayload = JSON.parse(jsonPayload);
  if (parsedPayload.exp) {
    // Convert exp from seconds to milliseconds
    parsedPayload.exp = parsedPayload.exp * 1000;
  }

  return parsedPayload;
};

export function convertObjectToQueryString(params: {
  [key: string]: string | number | boolean | undefined;
}): string {
  if (typeof params !== "object" || params === null) {
    return "";
  }

  return Object.keys(params)
    .filter((key) => params[key] !== undefined)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`
    )
    .join("&");
}
export function formatCurrency(amount: number | null | undefined): string {
  if (amount == null || isNaN(amount)) {
    return "N0";
  }

  return "N" + Number(amount).toLocaleString("en-NG");
}
