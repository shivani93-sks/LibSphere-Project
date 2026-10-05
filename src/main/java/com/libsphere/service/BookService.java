package com.libsphere.service;

import com.libsphere.model.Book;
import com.libsphere.model.Transaction;
import com.libsphere.repository.BookRepository;
import com.libsphere.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(Long id) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        return optionalBook.orElse(null);
    }

    public Book borrowBook(Long id) {
        Book book = getBookById(id);
        if (book != null && !book.isBorrowed()) {
            book.setBorrowed(true);
            Book savedBook = bookRepository.save(book);

            // Record borrowing transaction
            Transaction transaction = new Transaction(
                    savedBook,
                    LocalDate.now(),
                    null,
                    "BORROWED"
            );
            transactionRepository.save(transaction);

            return savedBook;
        }
        return book;
    }

    public Book returnBook(Long id) {
        Book book = getBookById(id);
        if (book != null && book.isBorrowed()) {
            book.setBorrowed(false);
            Book savedBook = bookRepository.save(book);

            // Find and update the active borrowing transaction
            Optional<Transaction> activeTransaction =
                    transactionRepository.findFirstByBookIdAndStatusOrderByIdDesc(id, "BORROWED");

            if (activeTransaction.isPresent()) {
                Transaction transaction = activeTransaction.get();
                transaction.setReturnDate(LocalDate.now());
                transaction.setStatus("RETURNED");
                transactionRepository.save(transaction);
            }

            return savedBook;
        }
        return book;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAllByOrderByIdDesc();
    }
}
