package org.example.learnengbackend.service;

public interface Service<T, ID> {
    T save(T entity);

    T get(ID id);

    void delete(ID id);

    Iterable<T> getAll();
}

