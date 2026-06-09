package com.shopnegotiator.api.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recommendations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private Integer aiScore;

    private String bestBuyingTime;

    @Column(length = 1000)
    private String rationale;
}
