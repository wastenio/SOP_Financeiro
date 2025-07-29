package com.sop.finance.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sop.finance.dto.EmpenhoDTO;
import com.sop.finance.entity.Empenho;
import com.sop.finance.service.EmpenhoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/empenhos")
@RequiredArgsConstructor
public class EmpenhoController {

    private final EmpenhoService empenhoService;

    @GetMapping
    public ResponseEntity<List<Empenho>> listarTodos() {
    	List<Empenho> empenho = empenhoService.listarTodos();
        return ResponseEntity.ok(empenho);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Empenho>> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(empenhoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Empenho> criar(@RequestBody EmpenhoDTO dto) {
        Empenho salvo = empenhoService.salvar(dto);
        return ResponseEntity.ok(salvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empenho> atualizar(@PathVariable Long id, @RequestBody EmpenhoDTO dto) {
        dto.setId(id);
        Empenho atualizado = empenhoService.salvar(dto);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        empenhoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
