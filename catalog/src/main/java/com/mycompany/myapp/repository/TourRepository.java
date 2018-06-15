package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Tour;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Tour entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TourRepository extends MongoRepository<Tour, String> {

}
