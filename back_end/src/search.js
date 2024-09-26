import { xmlToCsv } from "./convert.js";
import { getXMLContent } from "./request.js";

export async function Search(q = "", countResults = 0) {
  let currentResults = 0;
  const resultsPerPage = 10; // Número hipotético de resultados por página (depende da API)

  const headers = [
    "Address Line",
    "Phone Number",
    "Rating",
    "Review Count",
    "Title",
    "CEP",
    "Extended Address",
    "URL",
  ];

  const rows = [headers.join(";")];

  while (currentResults <= countResults) {
    const xmlContent = await getXMLContent(q, currentResults);
    //Converter os resultados desta página para CSV
    const pageCSV = xmlToCsv(xmlContent);

    if (pageCSV) {
      rows.push(pageCSV);
      currentResults += resultsPerPage;
    } else {
      break; // Se não houver mais resultados, sair do laço
    }
  }

  return rows.join("\n");
}
