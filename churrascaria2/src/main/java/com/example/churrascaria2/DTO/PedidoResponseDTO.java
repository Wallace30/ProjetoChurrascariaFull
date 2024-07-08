package com.example.churrascaria2.DTO;

import com.example.churrascaria2.rest.Pedido;

import java.util.List;

public record PedidoResponseDTO(Long id,String nome,List<Integer> carnes,List<Integer> bebidas,List<Integer>acompanhamentos){

    public PedidoResponseDTO(Pedido pedido) {
        this(pedido.getId(), pedido.getNome(), pedido.getCarnes(), pedido.getBebidas(), pedido.getAcompanhamentos());
    }
}
