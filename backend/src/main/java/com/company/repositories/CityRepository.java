package com.company.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.company.entities.City;

@Repository
public interface CityRepository extends JpaRepository<City, Long>{

	Page<City> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
