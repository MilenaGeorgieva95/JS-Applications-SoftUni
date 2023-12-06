const host = "http://localhost:3030/jsonstore/advanced/dropdown";

async function request(method, body) {
  const token = localStorage.getItem("accessToken");
  const options = {
    method,
    headers: {},
  };

  if (token !== null) {
    options.headers["X-Authorization"] = token;
  }
  if (body != undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(host, options);
    let data;
    if (res.status !== 204) {
      data = await res.json();
    }

    if (res.ok == false) {
      if (res.status === 403) {
        localStorage.removeItem("accessToken");
      }
      const error = data;
      throw error;
    }
    return data;
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

export const get = request.bind(null, "GET");
export const post = request.bind(null, "POST");
export const put = request.bind(null, "PUT");
export const del = request.bind(null, "DELETE");
