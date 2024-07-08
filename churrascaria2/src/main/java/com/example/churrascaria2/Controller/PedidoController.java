package com.example.churrascaria2.Controller;

import com.example.churrascaria2.DTO.PedidoRequestDTO;
import com.example.churrascaria2.DTO.PedidoResponseDTO;
import com.example.churrascaria2.Repository.PedidoRepository;
import com.example.churrascaria2.rest.Pedido;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("pedido")
public class PedidoController {
    @Autowired
    private PedidoRepository repository;
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping()
    public ResponseEntity<?> getAllPedidos() {
        try {
            List<PedidoResponseDTO> pedidoList = repository.findAll().stream()
                    .map(PedidoResponseDTO::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(pedidoList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao buscar os pedidos: " + e.getMessage());
        }
    }
    @CrossOrigin(origins = "*",allowedHeaders = "*")
    @PostMapping()
    public ResponseEntity<String> registerCoffee(@RequestBody Pedido pedido) {
        try {
            Pedido savedCoffee = repository.save(pedido);
            return new ResponseEntity<>("Pedido registrado com sucesso!", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao registrar o pedido ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePedido(@PathVariable Long id) {
        try {
            repository.deleteById(id);
            return ResponseEntity.ok("Pedido excluído com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir o pedido: " + e.getMessage());
        }
    }

}