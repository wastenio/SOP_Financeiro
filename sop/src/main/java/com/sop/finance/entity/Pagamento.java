package com.sop.finance.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "pagamento")
@NoArgsConstructor
@Data
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