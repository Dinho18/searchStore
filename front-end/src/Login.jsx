import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para redirecionar
import axios from "axios";

export default function Login() {
  const [licenca, setLicenca] = useState(""); // Estado para armazenar a licença
  const [resultado, setResultado] = useState(""); // Estado para armazenar mensagens de resultado
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    try {
      // Verifica a licença antes de continuar
      const response = await axios.get("http://localhost:8080/validate", {
        headers: {
          Authorization: licenca,
        },
      });

      if (response.data.valid) {
        // Licença válida, redirecionar para a página de busca
        navigate("/buscar"); // Redireciona para a rota de busca
      } else {
        setResultado("Licença inválida ou expirada.");
      }
    } catch (error) {
      setResultado("Erro ao validar a licença.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen m-0 bg-[#f4f4f9]">
      <div className="text-center bg-[rgb(255,255,255)] p-5 rounded-s-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
        <h1 className="text-2xl mb-5">Faça Login</h1>
        <form id="searchForm" onSubmit={handleSubmit}>
          <input
            className="p-2.5 text-base border border-solid border-[#ccc] rounded w-full mb-2.5 -ml-1"
            type="text"
            id="licenca"
            placeholder="Digite sua licença"
            value={licenca}
            onChange={(e) => setLicenca(e.target.value)} // Atualiza o estado da licença
            required
          />
          <br />
          <button
            className="px-2.5 py-5 text-base bg-[#28a745] rounded text-white"
            type="submit"
          >
            Entrar
          </button>
        </form>
        <p id="resultado">{resultado}</p> {/* Exibe o resultado da validação */}
      </div>
    </div>
  );
}
