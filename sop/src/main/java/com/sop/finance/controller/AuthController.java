package com.sop.finance.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sop.finance.dto.UsuarioDTO;
import com.sop.finance.service.UsuarioService;
import com.sop.finance.utils.JwtUtil;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UsuarioService usuarioService;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthController(UsuarioService usuarioService, JwtUtil jwtUtil, BCryptPasswordEncoder passwordEncoder) {
        this.usuarioService = usuarioService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UsuarioDTO loginDTO) {
        System.out.println("Tentativa de login: username=" + loginDTO.getUserName());

        return usuarioService.findByUsername(loginDTO.getUserName())
            .map(user -> {
                boolean senhaValida = passwordEncoder.matches(loginDTO.getPassword(), user.getPassword());
                System.out.println("Senha válida? " + senhaValida);

                if (!senhaValida) {
                    Map<String, Object> errorResponse = new HashMap<>();
                    errorResponse.put("error", "Usuário ou senha inválidos");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
                }

                String token = jwtUtil.generateToken(user.getUserName());
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("user", user);
                return ResponseEntity.ok(response);
            })
            .orElseGet(() -> {
                System.out.println("Usuário não encontrado");
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Usuário ou senha inválidos");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
            });
    }


}
