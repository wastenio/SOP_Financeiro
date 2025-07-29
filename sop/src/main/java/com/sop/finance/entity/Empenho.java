package com.sop.finance.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "empenho")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
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
