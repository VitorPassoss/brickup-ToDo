package com.taskbrick.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taskbrick.entity.Task;

import com.taskbrick.entity.CardsType;


public interface TaskRepository extends JpaRepository<Task, Integer> {

    List<Task> findByNome(String nome);

    List<Task> findByStatus(CardsType status);

    List<Task> findByStatusNome(String status);
}