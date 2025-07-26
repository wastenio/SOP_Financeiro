package com.sop.finance.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "pagamento")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_pagamento", nullable = false, unique = true)
    private String numeroPagamento;

    @Column(nullable = false)
    private LocalDate dataPagamento;

    @Column(nullable = false)
    private BigDecimal valorPago;

    @Column(nullable = false)
    private String formaPagamento;

    // Relação: muitos pagamentos para um empenho
    @ManyToOne
    @JoinColumn(name = "empenho_id", nullable = false)
    private Empenho empenho;
}
