import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Tela2.css";
function Tela2() {
  const [pedidos, setPedidos] = useState([]);
  const [idPedidoExcluir, setIdPedidoExcluir] = useState('');
  
  const excluirPedido = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/pedido/${idPedidoExcluir}`);
      alert(response.data); // Exibir mensagem de sucesso ao usuário
      // Atualizar a lista de pedidos após a exclusão
      setPedidos(pedidos.filter(pedido => pedido.id !== idPedidoExcluir));
      setIdPedidoExcluir(''); // Limpar o campo após a exclusão
    } catch (error) {
      console.error('Erro ao excluir o pedido:', error);
      alert('Erro ao excluir o pedido'); // Exibir mensagem de erro ao usuário
    }
  };
  

  // Função para carregar os pedidos (pode ser ajustada conforme necessidade)
  const carregarPedidos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/pedido');
      setPedidos(response.data);
    } catch (error) {
      console.error('Erro ao carregar os pedidos:', error);
      setPedidos([]);
    }
  };

  // Carregar os pedidos ao montar o componente
  useEffect(() => {
    carregarPedidos();
  }, []);

  return (
    <div>
      <h1>Excluir pedido pelo ID:</h1>

      {/* Formulário para inserir o ID do pedido a ser excluído */}
      <form onSubmit={(e) => { e.preventDefault(); excluirPedido(); }}>
        <label>
          ID do Pedido:
          <input
            type="text"
            value={idPedidoExcluir}
            onChange={(e) => setIdPedidoExcluir(e.target.value)}
          />
        </label>
        <button type="submit">Excluir</button>
      </form>

      {/* Lista de pedidos */}
      {pedidos.length > 0 ? (
        <div>
          <h2>Pedidos:</h2>
          <ul>
            {pedidos.map((pedido) => (
              <li key={pedido.id}>
                <strong>ID:</strong> {pedido.id}<br />
                <strong>Nome:</strong> {pedido.nome}<br />
                <strong>Carnes:</strong> {pedido.carnes.join(', ')}<br />
                <strong>Bebidas:</strong> {pedido.bebidas.join(', ')}<br />
                <strong>Acompanhamentos:</strong> {pedido.acompanhamentos.join(', ')}<br />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Carregando pedidos...</p>
      )}
    </div>
  );
}

export default Tela2;

    



