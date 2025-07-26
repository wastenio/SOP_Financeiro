package com.sop.finance.controller;

import com.sop.finance.dto.EmpenhoDTO;
import com.sop.finance.service.EmpenhoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empenhos")
@RequiredArgsConstructor
public class EmpenhoController {

    private final EmpenhoService empenhoService;

    @GetMapping
    public ResponseEntity<List<EmpenhoDTO>> listarTodos() {
        return ResponseEntity.ok(empenhoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmpenhoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(empenhoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<EmpenhoDTO> criar(@RequestBody EmpenhoDTO dto) {
        EmpenhoDTO salvo = empenhoService.salvar(dto);
        return ResponseEntity.ok(salvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmpenhoDTO> atualizar(@PathVariable Long id, @RequestBody EmpenhoDTO dto) {
        dto.setId(id);
        EmpenhoDTO atualizado = empenhoService.salvar(dto);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        empenhoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
