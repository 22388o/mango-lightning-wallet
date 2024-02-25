import axios from "axios";
//
// Shared axios wrapper funcs
//

export async function httpPost(path: string, data: Record<string, any> = {}) {
  const url = `${process.env.REACT_APP_API_BASE_URL}${path}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // add the token from localStorage into every request
      // 'X-Token': getToken(),
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  if (json.error) {
    throw new Error(json.error);
  }
  return json;
}

//
// Exported API functions
//

export async function connect(host: string, cert: string, macaroon: string) {
  const request = { host, cert, macaroon };
  const { token } = await httpPost("/connect", request);
  alert(`Connected - token: ${token}`);

  // save the token into the browser's storage
  // setToken(token);
}
