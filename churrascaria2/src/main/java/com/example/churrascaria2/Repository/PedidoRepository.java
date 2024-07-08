package com.example.churrascaria2.Repository;

import com.example.churrascaria2.rest.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}
