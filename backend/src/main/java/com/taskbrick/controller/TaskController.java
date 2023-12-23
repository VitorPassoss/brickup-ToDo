package com.taskbrick.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskbrick.entity.CardsType;
import com.taskbrick.entity.Task;
import com.taskbrick.service.TaskService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    TaskService taskService;

    @GetMapping("/all")
    public List<Task> listTask() {
        return taskService.allTasksService();
    }

    @GetMapping("/filter/{status}")
    public List<Task> getTasksByStatus(@PathVariable String status) {
        return taskService.getTasksByStatusName(status);
    }
    
    @PostMapping("/create")
    public ResponseEntity<Integer> createTask(@RequestBody Task task) {
        Integer taskId = taskService.createTaskService(task.getNome(), task.getDescricao(), task.getStatus().getId());
        return ResponseEntity.ok(taskId);
    }
    
    @PutMapping("/update/move/{taskId}/to/{cardId}")
    public ResponseEntity<String> MoveTask(@PathVariable int taskId, @PathVariable int cardId) {
        taskService.MoveTaskService(taskId, cardId);
        return ResponseEntity.ok("Tarefa movida com sucesso para o cartão com ID: " + cardId);
    }
    
    @PutMapping("/update/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable int taskId, @RequestBody Task task) {
        Task updatedTask = taskService.updateTaskService(taskId, task);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteTask(@PathVariable int id) {
        taskService.deleteTaskService(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/state/all")
    public List<CardsType> retrieveCards() {
        return taskService.allStateService();
    }

    @PostMapping("/state/create")
    public ResponseEntity<CardsType> createCard(@RequestBody CardsType cardType) {
        CardsType createdState = taskService.createStateService(cardType.getNome());
        return new ResponseEntity<>(createdState, HttpStatus.CREATED);
    }
    
    @PutMapping("/state/update/{stateId}")
    public ResponseEntity<CardsType> updateCard(@PathVariable int stateId, @RequestBody CardsType cardsType) {
        CardsType ObjectUpdated = taskService.updateStateService(stateId, cardsType);
        return new ResponseEntity<>(ObjectUpdated, HttpStatus.OK);
    }
    
    @DeleteMapping("/state/delete/{id}")
    public ResponseEntity<Object> deleteCard(@PathVariable int id) {
        taskService.deleteStateService(id);
        return ResponseEntity.ok().build();
    }


}