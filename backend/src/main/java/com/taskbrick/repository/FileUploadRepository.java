package com.taskbrick.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.taskbrick.entity.FilesTask;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;

public interface FileUploadRepository extends JpaRepository<FilesTask, Integer> {
    List<FilesTask> findByTaskId(int taskId);

    @Modifying
    @Transactional
    @Query("DELETE FROM FilesTask ft WHERE ft.task.id = :taskId")
    void deleteByTaskId(int taskId);

}
