package com.example.churrascaria2.rest;

import com.example.churrascaria2.DTO.PedidoRequestDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "pedidos")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of="id")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @ElementCollection
    private List<Integer> carnes;

    @ElementCollection
    private List<Integer> bebidas;

    @ElementCollection
    private List<Integer> acompanhamentos;

    public Pedido(PedidoRequestDTO data) {
        this.nome = data.nome();
        this.carnes = data.carnes();
        this.bebidas = data.bebidas();
        this.acompanhamentos = data.acompanhamentos();
    }
}
