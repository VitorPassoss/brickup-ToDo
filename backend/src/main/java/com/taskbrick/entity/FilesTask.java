package com.taskbrick.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.taskbrick.entity.Task;

@Entity
@Table(name = "FilesTask")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FilesTask {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "nome", nullable = false, unique = false, length = 150)
    private String nome;

    @Column(name = "path", nullable = false, unique = false, length = 250)
    private String path;

    @ManyToOne
    @JoinColumn(name = "task_id", referencedColumnName = "id")
    private Task task;

    public FilesTask(String nome, String path, Task task) {
        this.nome = nome;
        this.path = path;
        this.task = task;
    }
}
