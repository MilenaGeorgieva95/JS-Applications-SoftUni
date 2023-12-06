export async function fetchGet(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(res.status);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
}

export async function fetchPost(url, body, authotization) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (authotization) {
    headers["X-Authorization"] = authotization;
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(res.status);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
}
