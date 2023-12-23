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
import com.taskbrick.entity.CardsType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;

import com.taskbrick.entity.FilesTask;
import java.util.List; 

@Entity
@Table(name = "Task")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "nome", nullable = false, length = 150)
    private String nome;

    @Column(name = "descricao", nullable = false, length = 150)
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "status_id", referencedColumnName = "id")
    private CardsType status;

    public Task(String nome, String descricao, CardsType status) {
        this.nome = nome;
        this.descricao = descricao;
        this.status = status;
    }
}