import axios from "axios";

const router = axios.create({
  baseURL: "https://www.google.com/earth/rpc",
});

export async function getXMLContent(q = "", start = 0) {
  try {
    const response = await router.get(
      `/search?q=${encodeURIComponent(q)}&start=${start}&ie=utf-8&hl=pt-BR&gl=br`,
    );

    return response.data;
  } catch (err) {
    return err;
  }
}
