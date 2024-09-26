import { useState } from "react";
import axios from "axios";

export default function App() {
  const [query, setQuery] = useState("");
  const [resultCount, setResultCount] = useState(1);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault(); // Previne o recarregamento da página

    try {
      const response = await axios.get("http://localhost:8080/search", {
        params: {
          q: query,
          count: resultCount,
        },
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXlzIjoxMCwiaWF0IjoxNzI3MzE3NDYxLCJleHAiOjE3MjgxODE0NjF9.469NjYDIxPmvcE1U6ixLNSUZhuY-cZRcNmIJcXFgj5Y",
        },
      });

      setError(""); // Limpa erros anteriores
      downloadCSV(response.data); // Chama a função para baixar o CSV
    } catch (err) {
      setError("Erro ao buscar dados."); // Define mensagem de erro
    }
  };

  const downloadCSV = (data) => {
    // Cria um Blob a partir dos dados e cria uma URL
    const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); // Cria um elemento <a>
    a.href = url;
    a.target = "_blank";
    a.download = `${query}.csv`; // Nome do arquivo a ser baixado, baseado na pesquisa
    a.click(); // Simula um clique para iniciar o download
    URL.revokeObjectURL(url); // Libera a URL
  };

  return (
    <div className="flex justify-center items-center h-screen m-0 bg-[#f4f4f9]">
      <div className="text-center bg-[#fff] p-5 rounded-s-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
        <h1 className="text-2xl mb-5">Buscar Loja</h1>
        <form id="searchForm" onSubmit={handleSearch}>
          <input
            className="p-2.5 text-base border border-solid border-[#ccc] rounded w-full mb-2.5 -ml-1"
            type="text"
            id="query"
            placeholder="Digite algo..."
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Atualiza o estado do query
            required
          />
          <input
            className="p-2.5 text-base border border-solid border-[#ccc] rounded w-full mb-2.5 -ml-1"
            type="number"
            id="resultCount"
            placeholder="Número de resultados"
            min="1"
            value={resultCount}
            onChange={(e) => setResultCount(e.target.value)} // Atualiza o estado do resultCount
            required
          />
          <br></br>
          <button
            className="px-2.5 py-5 text-base bg-[#28a745] rounded text-white"
            type="submit"
          >
            Confirmar
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>} {/* Exibe erros */}
      </div>
    </div>
  );
}
