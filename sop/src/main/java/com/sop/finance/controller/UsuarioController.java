package com.sop.finance.controller;

import java.util.List;
import java.util.Optional;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sop.finance.dto.UsuarioDTO;
import com.sop.finance.service.UsuarioService;

@RestController
@RequestMapping("/api/usuario")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }
    
    // Criar usuário (registro)
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UsuarioDTO usuarioDTO) {
        if (usuarioService.findByUsername(usuarioDTO.getUserName()).isPresent()) {
            return ResponseEntity.badRequest().body("Usuário já existe");
        }
        UsuarioDTO saved = usuarioService.save(usuarioDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // Buscar todos usuários
    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> findAll() {
        List<UsuarioDTO> usuarios = usuarioService.findAll();
        return ResponseEntity.ok(usuarios);
    }

    // Buscar usuário por username
    @GetMapping("/{username}")
    public ResponseEntity<?> findByUsername(@PathVariable String username) {
        Optional<UsuarioDTO> usuarioOpt = usuarioService.findByUsername(username);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
        return ResponseEntity.ok(usuarioOpt.get());
    }

    // Atualizar usuário por ID (exemplo)
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody UsuarioDTO usuarioDTO) {
        Optional<UsuarioDTO> usuarioOpt = usuarioService.findByUsername(usuarioDTO.getUserName());
        if (usuarioOpt.isPresent() && !usuarioOpt.get().getId().equals(id)) {
            return ResponseEntity.badRequest().body("Nome de usuário já está em uso");
        }
        // Aqui você deve implementar a lógica de atualização no service, ou criar método novo para update
        // Por exemplo:
        // UsuarioDTO updated = usuarioService.update(id, usuarioDTO);
        // return ResponseEntity.ok(updated);

        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("Atualização não implementada");
    }

    // Deletar usuário por ID (exemplo)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        // Implemente no service um método para deletar e chame aqui
        // usuarioService.delete(id);
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("Exclusão não implementada");
    }
}
