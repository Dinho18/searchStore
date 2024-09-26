import axios from "axios";
import { useState } from "react";

export default function Generate() {
  const [resultado, setResultado] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const days = document.getElementById("query").value;

    try {
      const response = await axios.post(
        "http://localhost:8080/generate",
        {
          days: parseInt(days),
        },
        {
          headers: {
            Authorization: "123", // Insira a chave do administrador aqui
          },
        }
      );

      setResultado(response.data.license); // Armazenar apenas a licença
    } catch (error) {
      if (error.response) {
        setResultado(`Erro ao gerar licença: ${error.response.data.error}`);
      } else {
        setResultado("Erro ao gerar licença.");
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resultado).then(() => {
      alert("Licença copiada para a área de transferência!");
    });
  };

  return (
    <div className="flex justify-center items-center h-screen m-0 bg-[#f4f4f9]">
      <div className="text-center bg-[rgb(255,255,255)] p-5 rounded-s-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)] w-1/5">
        <h1 className="text-2xl mb-5">Gerar Licença</h1>
        <form id="searchForm" onSubmit={handleSubmit}>
          <input
            className="p-2.5 text-base border border-solid border-[#ccc] rounded w-full mb-2.5 -ml-1"
            type="text"
            id="query"
            placeholder="Digite a quantidade de dias da licença"
            required
          />
          <button
            className="px-3 py-3 text-base bg-[#28a745] rounded text-white w-1/5"
            type="submit"
          >
            Gerar
          </button>
        </form>
        {resultado && (
          <div className="mt-4">
            <div className="text-sm font-semibold">Licença gerada:</div>
            <div className="text-sm font-semibold break-all">{resultado}</div>
            <button
              className="mt-4 px-3 py-2 bg-blue-500 text-white rounded"
              onClick={handleCopy}
            >
              Copiar Licença
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
