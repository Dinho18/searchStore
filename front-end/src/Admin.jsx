import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o recarregamento da página

    try {
      // Enviar a senha para validação no backend
      const response = await axios.get("http://localhost:8080/validate/admin", {
        headers: {
          Authorization: password, // Envia a senha no cabeçalho
        },
      });

      if (response.data.valid) {
        setError("");
        navigate("/generate"); // Redireciona para a página de geração se a senha for válida
      } else {
        setError("Senha incorreta. Tente novamente."); // Define a mensagem de erro
      }
    } catch (err) {
      setError("Erro ao validar a senha. Tente novamente."); // Erro na requisição
    }
  };

  return (
    <div className="flex justify-center items-center h-screen m-0 bg-[#f4f4f9]">
      <div className="text-center bg-[rgb(255,255,255)] p-5 rounded-s-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
        <h1 className="text-2xl mb-5">Admin</h1>
        <form id="searchForm" onSubmit={handleSubmit}>
          <input
            className="p-2.5 text-base border border-solid border-[#ccc] rounded w-full mb-2.5 -ml-1"
            type="password"
            id="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
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
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Exibe erro de senha */}
      </div>
    </div>
  );
}
