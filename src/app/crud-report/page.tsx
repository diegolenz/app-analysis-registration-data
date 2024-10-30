export default function crudReport() {
    return (
        <div className="flex flex-col lg:flex-row p-4 lg:p-8 gap-4">
      
        {/* Coluna Esquerda - Dados do Usuário */}
        <div className="w-full lg:w-1/5 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Dados da Pessoa</h2>
          <div className="flex flex-col gap-2">
            <p><strong>Nome completo:</strong> João Silva</p>
            <p><strong>Email:</strong> joao.silva@example.com</p>
            <p><strong>Endereço:</strong> Rua das Flores, 123</p>
            <p><strong>Data de atualização:</strong> 10/10/2024</p>
            <p><strong>Data de associação:</strong> 15/01/2023</p>
            <p><strong>SCR mensal:</strong> 5000</p>
            <p><strong>SCR anual:</strong> 60000</p>
            <p><strong>Restritivo interno:</strong> Não</p>
            <p><strong>Restritivo externo:</strong> Sim</p>
          </div>
        </div>
        
        {/* Coluna Direita - Tabela */}
        <div className="w-full lg:w-4/5 bg-white p-4 rounded-lg shadow-md overflow-auto">
          <h2 className="text-lg font-bold mb-4">Tabela de Dados</h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Coluna 1</th>
                <th className="p-2">Coluna 2</th>
                <th className="p-2">Coluna 3</th>
                <th className="p-2">Coluna 4</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Dado 1</td>
                <td className="p-2">Dado 2</td>
                <td className="p-2">Dado 3</td>
                <td className="p-2">Dado 4</td>
              </tr>
              {/* Exemplo de mais linhas */}
              <tr className="border-b">
                <td className="p-2">Dado 5</td>
                <td className="p-2">Dado 6</td>
                <td className="p-2">Dado 7</td>
                <td className="p-2">Dado 8</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    );
  }