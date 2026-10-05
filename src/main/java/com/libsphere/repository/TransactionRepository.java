package com.libsphere.repository;

import com.libsphere.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // Find the latest active ("BORROWED") transaction for a specific book
    Optional<Transaction> findFirstByBookIdAndStatusOrderByIdDesc(Long bookId, String status);

    // Get all transactions in reverse chronological order (newest first)
    List<Transaction> findAllByOrderByIdDesc();
}
