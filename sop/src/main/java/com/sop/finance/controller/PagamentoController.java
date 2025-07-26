package com.sop.finance.controller;

import com.sop.finance.dto.PagamentoDTO;
import com.sop.finance.service.PagamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pagamentos")
@RequiredArgsConstructor
public class PagamentoController {

    private final PagamentoService pagamentoService;

    @GetMapping
    public ResponseEntity<List<PagamentoDTO>> listarTodos() {
        return ResponseEntity.ok(pagamentoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PagamentoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(pagamentoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<PagamentoDTO> criar(@RequestBody PagamentoDTO dto) {
        PagamentoDTO salvo = pagamentoService.salvar(dto);
        return ResponseEntity.ok(salvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PagamentoDTO> atualizar(@PathVariable Long id, @RequestBody PagamentoDTO dto) {
        dto.setId(id);
        PagamentoDTO atualizado = pagamentoService.salvar(dto);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        pagamentoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
