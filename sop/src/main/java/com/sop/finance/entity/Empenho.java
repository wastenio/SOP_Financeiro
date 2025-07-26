package com.sop.finance.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "empenho")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Empenho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_empenho", nullable = false, unique = true)
    private String numeroEmpenho;

    @Column(nullable = false)
    private LocalDate dataEmpenho;

    @Column(nullable = false)
    private BigDecimal valorEmpenhado;

    // Relação: muitos empenhos para uma despesa
    @ManyToOne
    @JoinColumn(name = "despesa_id", nullable = false)
    private Despesa despesa;

    // Um empenho pode ter vários pagamentos
    @OneToMany(mappedBy = "empenho", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Pagamento> pagamentos;
}
