import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Tela1.css";
function Tela1() {
  const [pedidos, setPedidos] = useState([]);

  const carregarPedidos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/pedido');
      setPedidos(response.data);
    } catch (error) {
      console.error('Erro ao carregar os pedidos:', error);
      setPedidos([]);
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  return (
    <div>
      <h1>Lista de Pedidos</h1>

      {pedidos.length > 0 ? (
        <div>
          <h2>Pedidos:</h2>
          <ul>
            {pedidos.map(pedido => (
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

export default Tela1;

