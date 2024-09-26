import { JSDOM } from "jsdom";

export function xmlToCsv(data) {
  const content = new JSDOM(data, {
    contentType: "text/xml",
  });

  const places = content.window.document.querySelectorAll("place_card");

  let rows = []; // Usaremos um array para armazenar as linhas

  places.forEach((place) => {
    const adress_lines = place.querySelectorAll("address_line");
    const addressLine = place.querySelector("address_line")?.textContent || "";
    const phoneNumber = place.querySelector("phone_number")?.textContent || "";
    const rating =
      place.querySelector("rating")?.getAttribute("num_rating_stars") || "";
    const review_count =
      place.querySelector("review_count > anchor_text")?.textContent || "";
    const title = place.querySelector("title")?.textContent || "";
    const cep = adress_lines[adress_lines.length - 1]?.textContent || "";
    const extended_adress =
      place.querySelector("name_and_address")?.textContent ||
      place.querySelector("single_line_address")?.textContent ||
      "";
    const url =
      place
        .querySelector("authority_page_link > url")
        ?.textContent.replace("/url?q=", "") || "";

    // Adiciona a linha ao array, com quebras de linha no final
    rows.push([
      addressLine,
      phoneNumber,
      rating,
      review_count,
      title,
      cep,
      extended_adress,
      url,
    ].join(";"));
  });

  // Retorna todas as linhas unidas com quebras de linha
  return rows.join("\n") + "\n"; // Adiciona uma quebra de linha ao final
}
