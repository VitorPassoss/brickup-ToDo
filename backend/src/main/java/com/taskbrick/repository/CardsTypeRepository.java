package com.taskbrick.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.taskbrick.entity.CardsType;

public interface CardsTypeRepository extends JpaRepository<CardsType, Integer> {

    public List<CardsType> findByNome(String nome);

}