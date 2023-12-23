package com.taskbrick.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "CardsType")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CardsType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "nome", nullable = false, unique = false, length = 150)
    private String nome;


    public CardsType(String nome) {
        this.nome = nome;
    }
  
}
