export const fetcher = async (
  url: string,
  fetchType: "POST" | "GET" | "DELETE" | "PUT",
  body?: unknown
) => {
  if (fetchType === "GET") {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error("An error occurred while fetching the data.")
    }
    return res.json()
  } else {
    const res = await fetch(url, {
      method: fetchType,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      throw new Error("An error occurred while fetching the data.")
    }
    return res
  }
}
