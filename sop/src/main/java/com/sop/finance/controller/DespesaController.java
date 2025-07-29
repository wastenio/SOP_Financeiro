package com.sop.finance.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
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
import com.sop.finance.entity.Despesa;
import com.sop.finance.service.DespesaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/despesas")
@RequiredArgsConstructor
public class DespesaController {

	private final DespesaService despesaService;
	
	@GetMapping
	public ResponseEntity<List<Despesa>> listarTodas() {
		List<Despesa> despesas = despesaService.listarTodas();
		return ResponseEntity.ok(despesas);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Despesa>> buscarPorId(@PathVariable Long id) {
		return ResponseEntity.ok(despesaService.buscarPorId(id));
	}

	@PostMapping
	public ResponseEntity<Despesa> criar(@RequestBody DespesaDTO dto) {
		Despesa despesaSalva = despesaService.salvar(dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(despesaSalva);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Despesa> atualizar(@PathVariable Long id, @RequestBody DespesaDTO dto) {
		dto.setId(id);
		Despesa despesaAtualizada = despesaService.salvar(dto);
		return ResponseEntity.ok(despesaAtualizada);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletar(@PathVariable Long id) {
		despesaService.deletar(id);
		return ResponseEntity.noContent().build();
	}
}
