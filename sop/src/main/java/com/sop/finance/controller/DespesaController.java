package com.sop.finance.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sop.finance.dto.DespesaDTO;
import com.sop.finance.service.DespesaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/despesas")
@RequiredArgsConstructor
public class DespesaController {

    private final DespesaService despesaService;

    @GetMapping
    public ResponseEntity<List<DespesaDTO>> listarTodas() {
    	List<DespesaDTO> despesas = despesaService.listarTodas();
        return ResponseEntity.ok(despesas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DespesaDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(despesaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<DespesaDTO> criar(@RequestBody DespesaDTO dto) {
        DespesaDTO despesaSalva = despesaService.salvar(dto);
        return ResponseEntity.ok(despesaSalva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DespesaDTO> atualizar(@PathVariable Long id, @RequestBody DespesaDTO dto) {
        dto.setId(id);
        DespesaDTO despesaAtualizada = despesaService.salvar(dto);
        return ResponseEntity.ok(despesaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        despesaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
