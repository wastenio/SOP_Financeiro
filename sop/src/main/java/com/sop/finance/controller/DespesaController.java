package com.sop.finance.controller;

import com.sop.finance.dto.DespesaDTO;
import com.sop.finance.service.DespesaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/despesas")
@RequiredArgsConstructor
public class DespesaController {

    private final DespesaService despesaService;

    @GetMapping
    public ResponseEntity<List<DespesaDTO>> listarTodas() {
        return ResponseEntity.ok(despesaService.listarTodas());
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
