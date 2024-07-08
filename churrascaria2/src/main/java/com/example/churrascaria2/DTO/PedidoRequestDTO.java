package com.example.churrascaria2.DTO;


import java.util.List;

public record PedidoRequestDTO(String nome, List<Integer> carnes, List<Integer> bebidas, List<Integer> acompanhamentos) {

}
