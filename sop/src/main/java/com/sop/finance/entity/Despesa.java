package com.sop.finance.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "despesa")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Despesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "credor", nullable = false)
    private String credor;
    
    @Column(name = "data_protocolo", nullable = false)
    private LocalDateTime dataProtocolo;
    
    @Column(name = "data_vencimento", nullable = false)
    private LocalDate dataVencimento;
    
    @Column(name = "descricao", nullable = false)
    private String descricao;

    @Column(name = "numero_protocolo", nullable = false, unique = true)
    private String numeroProtocolo;
    
    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "tipo_despesa", nullable = false)
    private String tipoDespesa;

    @Column(name = "valor", nullable = false)
    private BigDecimal valor;
    
    // Inicializa a lista para evitar NullPointerException
    @OneToMany(mappedBy = "despesa", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Empenho> empenhos = new ArrayList<>();

    // Adiciona um empenho e mantém o relacionamento bidirecional
    public void addEmpenho(Empenho empenho) {
        empenhos.add(empenho);
        empenho.setDespesa(this);
    }

    // Remove um empenho e mantém o relacionamento bidirecional
    public void removeEmpenho(Empenho empenho) {
        empenhos.remove(empenho);
        empenho.setDespesa(null);
    }
}
