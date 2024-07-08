import { useState } from "react";
import "./Tela.css";

// Importando as imagens das carnes, bebidas e acompanhamentos
import carne1 from "./assets/picanha.jpg";
import carne2 from "./assets/ancho.jpg";
import carne3 from "./assets/cupim.jpg";
import carne4 from "./assets/queijocoalho.jpg";
import carne5 from "./assets/fraldinha.jpg";
import carne6 from "./assets/contra.jpg";
import carne7 from "./assets/picanhas.jpg";

import bebida1 from "./assets/coca.jpg";
import bebida2 from "./assets/fanta.jpg";
import bebida3 from "./assets/kuat.jpg";
import bebida4 from "./assets/mineiro.jpg";
import bebida5 from "./assets/heineken1.jpg";
import bebida6 from "./assets/antartica.jpg";

import acompanhamento1 from "./assets/arroz.jpg";
import acompanhamento2 from "./assets/feijao.jpg";
import acompanhamento3 from "./assets/maionese.jpg";
import acompanhamento4 from "./assets/batata.jpg";
import acompanhamento5 from "./assets/bananafrita.jpg";
import acompanhamento6 from "./assets/tropeiro.jpg";

const Tela = () => {
    const [nome, setNome] = useState("");
    const [carnes, setCarnes] = useState([]);
    const [bebidas, setBebidas] = useState([]);
    const [acompanhamentos, setAcompanhamentos] = useState([]);


    const tiposCarnes = [
        { id: 1, nome: "Picanha", imagem: carne1 },
        { id: 2, nome: "Ancho", imagem: carne2 },
        { id: 3, nome: "Cupim", imagem: carne3 },
        { id: 4, nome: "Queijo", imagem: carne4 },
        { id: 5, nome: "Fraldinha", imagem: carne5 },
        { id: 6, nome: "Contra-Filé", imagem: carne6 },
        { id: 7, nome: "Picanha-Suína", imagem: carne7 }
    ];

    const tiposBebidas = [
        { id: 1, nome: "Coca-Cola", imagem: bebida1 },
        { id: 2, nome: "Fanta", imagem: bebida2 },
        { id: 3, nome: "Kuat", imagem: bebida3 },
        { id: 4, nome: "Guaraná Mineiro", imagem: bebida4 },
        { id: 5, nome: "Heineken", imagem: bebida5 },
        { id: 6, nome: "Antartica", imagem: bebida6 }
    ];

    const tiposAcompanhamentos = [
        { id: 1, nome: "Arroz", imagem: acompanhamento1 },
        { id: 2, nome: "Feijão", imagem: acompanhamento2 },
        { id: 3, nome: "Maionese", imagem: acompanhamento3 },
        { id: 4, nome: "Batata", imagem: acompanhamento4 },
        { id: 5, nome: "Banana", imagem: acompanhamento5 },
        { id: 6, nome: "Tropeiro", imagem: acompanhamento6 }
    ];



    const handleCarnesChange = (event) => {
        const id = parseInt(event.target.value);
        if (event.target.checked) {
            if (carnes.length < 3) {
                if (!carnes.includes(id)) {
                    setCarnes([...carnes, id]);
                }
            } else {
                event.target.checked = false;
            }
        } else {
            setCarnes(carnes.filter(item => item !== id));
        }
    };

    const handleBebidasChange = (event) => {
        const id = parseInt(event.target.value);
        if (event.target.checked) {
            if (!bebidas.includes(id)) {
                setBebidas([...bebidas, id]);
            }
        } else {
            setBebidas(bebidas.filter(item => item !== id));
        }
    };

    const handleAcompanhamentosChange = (event) => {
        const id = parseInt(event.target.value);
        if (event.target.checked) {
            if (acompanhamentos.length < 5) {
                if (!acompanhamentos.includes(id)) {
                    setAcompanhamentos([...acompanhamentos, id]);
                }
            } else {
                event.target.checked = false;
            }
        } else {
            setAcompanhamentos(acompanhamentos.filter(item => item !== id));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            nome: nome,
            carnes: carnes,
            bebidas: bebidas,
            acompanhamentos: acompanhamentos
        };

        try {
            const response = await fetch('http://localhost:8080/pedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Dados enviados com sucesso!");
            } else {
                alert("Erro ao enviar os dados.");
            }
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            alert("Erro ao enviar os dados.");
        }
    };
    return (
        <div className="tela-container">
            <h2>Churrascaria Mineira</h2>
            <h3>Serviço para pedido(s) de marmitex</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome Completo:
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </label>
                
                <div>
                    <p>Selecione até 3 opções de carnes:</p>
                    <div className="opcoes-container">
                        {tiposCarnes.map((tipo) => (
                            <label key={tipo.id} className="opcao-item">
                                <input
                                    type="checkbox"
                                    value={tipo.id}
                                    onChange={handleCarnesChange}
                                    checked={carnes.includes(tipo.id)}
                                    id={`checkbox-carnes-${tipo.id}`} // id único para carnes
                                />
                                <div className="opcao-content">
                                    <img src={tipo.imagem} alt={tipo.nome} className="imagem-item" />
                                    <p>{tipo.nome}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <p>Selecione até 5 opções de bebidas:</p>
                    <div className="opcoes-container">
                        {tiposBebidas.map((tipo) => (
                            <label key={tipo.id} className="opcao-item">
                                <input
                                    type="checkbox"
                                    value={tipo.id}
                                    onChange={handleBebidasChange}
                                    checked={bebidas.includes(tipo.id)}
                                    id={`checkbox-bebidas-${tipo.id}`} // id único para bebidas
                                />
                                <div className="opcao-content">
                                    <img src={tipo.imagem} alt={tipo.nome} className="imagem-item" />
                                    <p>{tipo.nome}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <p>Selecione até 5 opções de acompanhamentos:</p>
                    <div className="opcoes-container">
                        {tiposAcompanhamentos.map((tipo) => (
                            <label key={tipo.id} className="opcao-item">
                                <input
                                    type="checkbox"
                                    value={tipo.id}
                                    onChange={handleAcompanhamentosChange}
                                    checked={acompanhamentos.includes(tipo.id)}
                                    id={`checkbox-acompanhamentos-${tipo.id}`} // id único para acompanhamentos
                                />
                                <div className="opcao-content">
                                    <img src={tipo.imagem} alt={tipo.nome} className="imagem-item" />
                                    <p>{tipo.nome}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
                <button type="submit">Enviar</button>
            

            </form>
        </div>
    );
};

export default Tela;
